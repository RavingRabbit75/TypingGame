"use strict";

import { Sprite, Graphics, Text, TextStyle, Container } from "pixi.js";

class Invader {
    
    sprite: Container;
    // private bitmap: Sprite;
    private grapahic: Graphics;
    private textStyle: TextStyle;
    private text: Text;
    word: string = "Hello";
    speed: number = 0;

    constructor() {
        this.sprite = new Container();
        this.grapahic = new Graphics();
        this.grapahic.beginFill(0x000000).lineStyle(1, 0xFFFFFF, 1).drawRect(0, 0, 100, 50).endFill();
        
        this.textStyle = new TextStyle({
            fontFamily: "Helvetica",
            fontSize: 16,
            fill: 0xFFFFFF
        });

        this.text = new Text(this.word, this.textStyle);
        this.text.anchor.set(0.5, 0.5)
        this.text.x = 50;
        this.text.y = 25;
        this.sprite.addChild(this.grapahic);
        this.sprite.addChild(this.text);
        
    }

    setWord(word: string) {
        this.word = word;
        this.text.text = this.word;
    }



}

export default Invader;