"use strict";

import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Text, TextStyle } from "@pixi/text";


class ScoreDisplay {
    sprite: Container = new Container
    private graphic: Graphics;

    private textStyle: TextStyle;
    private scoreText: Text;

    constructor(app: any) {
        this.graphic = new Graphics();
        this.graphic.beginFill(0x000000).drawRect(0,0, 130, 30).endFill();
        let halfcircle = new Graphics().beginFill(0x000000).arc(0,0,15,0, 180).endFill();
        halfcircle.position.set(130, 15);
        this.sprite.addChild(this.graphic);
        this.sprite.addChild(halfcircle);
        this.sprite.y = 560;

        this.textStyle = new TextStyle({
            fontFamily: "Helvetica",
            fontSize: 14,
            fill: 0xFFFFFF,
            align: "center"
        });

        this.scoreText = new Text("SCORE: 0", this.textStyle);
        this.scoreText.x = 10
        this.scoreText.y = 6
        this.sprite.addChild(this.scoreText);

    }

    updateScore(score: number) {
        this.scoreText.text = "SCORE: " + score;
    }
}

export default ScoreDisplay;