"use strict";

import * as PIXI from "pixi.js";

import GameScene from "./game_scene";
import StartScene from "./start_scene";

const app = new PIXI.Application({
    width: 800,
    height: 600
})

let mainGameElem: HTMLElement = document.getElementById("game")!;
mainGameElem.appendChild(app.view);

app.renderer.backgroundColor = 0x23395D;
app.loader.baseUrl = "assets";
app.loader
    .add("invader01", "invader_01.png")
    .add("clouds01", "cloud_01.png")
    .add("explosion_snd", "mixkit-arcade-game-explosion-2759.wav")
    .add("youlose_snd", "mixkit-8-bit-lose-2031.wav");
    
app.loader.onProgress.add(showProgress);
app.loader.onComplete.add(doneDownloading);
app.loader.onError.add(reportError);

app.loader.load();

function showProgress(e: any) {
    console.log(e.progress);
}

function reportError(e: any) {
    console.log(e.error);
}

function doneDownloading(e: any) {

    let startScene = new StartScene(app);
    let gameScene = new GameScene(app);

    app.stage.addChild(startScene.scene);

    window.addEventListener("keydown", onEnterStartGame);

    function onEnterStartGame(event: KeyboardEvent) {
        if (event.key === "Enter") {
            app.stage.removeChild(startScene.scene);
            window.removeEventListener("keydown", onEnterStartGame);
    
            gameScene.init();
            window.addEventListener("gameEnded", onGameSceneEnded);
        }
    }

    function onGameSceneEnded(e: Event) {
        gameScene.destroy();
        app.stage.addChild(startScene.scene);
        window.addEventListener("keydown", onEnterStartGame);
    }
}
