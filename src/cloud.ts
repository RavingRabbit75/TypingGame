"use strict";

import { Sprite, Container } from "pixi.js";


class Cloud {

    private bitmap: Sprite;
    sprite: Container;
    speed: number = 0;

    constructor(app: any) {
        this.sprite = new Container();
        this.bitmap = Sprite.from(app.loader.resources.cloud01.texture);
        this.bitmap.anchor.set(0.5, 0);
        this.sprite.addChild(this.bitmap);
    }

}

export default Cloud;