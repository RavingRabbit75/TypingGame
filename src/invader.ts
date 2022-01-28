"use strict";

import { Sprite, Graphics, Text, TextStyle, Container } from "pixi.js";
import * as PIXI from "pixi.js";
import { sound } from '@pixi/sound';

class Invader {
    
    sprite: Container;
    private bitmap: Sprite;
    // private grapahic: Graphics;
    private textStyle: TextStyle;
    private text: Text;
    word: string = "Hello";
    speed: number = 0;

    constructor(app: any) {
        this.sprite = new Container();
        
        this.bitmap = PIXI.Sprite.from(app.loader.resources.invader01.texture)
        // this.grapahic = new Graphics();
        // this.grapahic.beginFill(0x000000).lineStyle(1, 0xFFFFFF, 1).drawRect(0, 0, 100, 50).endFill();
        
        this.textStyle = new TextStyle({
            fontFamily: "Helvetica",
            fontSize: 16,
            fill: 0xFFFFFF
        });

        this.text = new Text(this.word, this.textStyle);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = 50;
        this.text.y = 25;
        // this.sprite.addChild(this.grapahic);
        this.sprite.addChild(this.bitmap);
        this.sprite.addChild(this.text);
        
    }

    die() {
        sound.play("explosion_snd");
    }

    setWord(word: string) {
        this.word = word;
        this.text.text = this.word;
    }

    getHeight(): number {
        return this.sprite.height;
    }


}

export default Invader;