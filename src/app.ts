"use strict";

import * as PIXI from "pixi.js";

import GameScene from "./game_scene";
import StartScene from "./start_scene";



const app = new PIXI.Application({
    width: 400,
    height: 300
})

let mainGameElem: HTMLElement = document.getElementById("game")!;
mainGameElem.appendChild(app.view);

app.renderer.backgroundColor = 0x23395D;

let startScene = new StartScene();
app.stage.addChild(startScene.scene);
window.addEventListener("keydown", onEnterDown);

function onEnterDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
        app.stage.removeChild(startScene.scene);
        window.removeEventListener("keydown", onEnterDown);

        let gameScene = new GameScene(app);
        gameScene.init();
    }
}


