"use strict";

import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Text, TextStyle } from "@pixi/text";

class MessageBox {
    sprite: Container = new Container();
    private graphic: Graphics;
    private textStyle: TextStyle;
    private text: Text;
    
    constructor(displayText: string) {
        this.graphic = new Graphics();
        this.graphic.beginFill(0x000000).lineStyle(2, 0xFF0000, 1).drawRoundedRect(0, 0, 99, 32, 16).endFill();
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.sprite.addChild(this.graphic);
        
        this.textStyle = new TextStyle({
            fontFamily: "Helvetica",
            fontSize: 12,
            fill: 0xFF0000
        });

        this.text = new Text(displayText, this.textStyle);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = Math.floor(this.graphic.width/2);
        this.text.y = Math.floor(this.graphic.height/2);
        this.sprite.addChild(this.text);
    }

}

export default MessageBox;