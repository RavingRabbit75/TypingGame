"use strict";

import { Sprite, Container } from "pixi.js";


class StaticBackground {

    private bitmap: Sprite;
    sprite: Container;

    constructor(app: any) {
        this.sprite = new Container();
        this.bitmap = Sprite.from(app.loader.resources.ground01.texture);
        this.sprite.addChild(this.bitmap);
    }

}

export default StaticBackground;