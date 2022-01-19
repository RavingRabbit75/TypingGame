"use strict";
import { Container } from "pixi.js";
import Button from "./button";

class StartScene {
    scene: Container;
    startBtn: Button;

    constructor() {
        this.scene = new Container();

        this.startBtn = new Button("START");
        this.startBtn.sprite.x = 150;
        this.startBtn.sprite.y = 120;
        this.startBtn.sprite.on("mousedown", this.onStartBtnClick);
        this.scene.addChild(this.startBtn.sprite);
    }

    private onStartBtnClick(event: MouseEvent) {
        console.log(event);
    }

}

export default StartScene;