"use strict";
import { Container } from "pixi.js";
import Button from "./button";

class StartScene {
    scene: Container;
    startBtn: Button;

    constructor(app: any) {
        this.scene = new Container();

        this.startBtn = new Button("START");
        this.startBtn.sprite.x = app.screen.width/2 - this.startBtn.getWidth()/2 ;
        this.startBtn.sprite.y = app.screen.height/2 - this.startBtn.getHeight()/2 ;
        this.startBtn.sprite.on("mousedown", this.onStartBtnClick);
        this.scene.addChild(this.startBtn.sprite);
    }

    private onStartBtnClick(event: MouseEvent) {
        // console.log(event);
    }

}

export default StartScene;