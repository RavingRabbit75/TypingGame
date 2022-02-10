"use strict";

import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Text, TextStyle } from "@pixi/text";


class WaveDisplay {
    sprite: Container = new Container
    private graphic: Graphics;

    private textStyle: TextStyle;
    private waveText: Text;

    constructor(app: any) {
        this.graphic = new Graphics();
        this.graphic.beginFill(0x000000).drawRect(0,0, 130, 30).endFill();
        let halfcircle = new Graphics().beginFill(0x000000).arc(0,0,15,0, 180).endFill();
        halfcircle.position.set(0, 15);
        this.sprite.addChild(this.graphic);
        this.sprite.addChild(halfcircle);
        this.sprite.y = 560;
        this.sprite.x = 670;

        this.textStyle = new TextStyle({
            fontFamily: "Helvetica",
            fontSize: 14,
            fill: 0xFFFFFF,
            align: "center"
        });

        this.waveText = new Text("WAVE: 1", this.textStyle);
        this.waveText.x = 10;
        this.waveText.y = 6;
        this.sprite.addChild(this.waveText);

    }

    updateWave(wave: number) {
        this.waveText.text = "WAVE: " + wave;
    }
}

export default WaveDisplay;