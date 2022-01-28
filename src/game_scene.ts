"use strict";

import { Container } from "@pixi/display";
import Invader from "./invader";
import randomWords from "random-words";
import MessageBox from "./message_box";
import { sound } from '@pixi/sound';

class GameScene {
    app: any;
    invaderList: Invader[] = [];
    currentWordEntry: string = "";
    
    private acceptedChars: string = "";
    loseMessage = new MessageBox("YOU LOSE");

    constructor(app: any) {
        this.app = app;
        this.acceptedChars = "abcdefghijklmnopqrstuvwxyz";
        this.acceptedChars =  this.acceptedChars + this.acceptedChars.toUpperCase();
        this.acceptedChars = this.acceptedChars + "1234567890!@#$%^&*()";
    }

    init () {
        for (let x=0; x < 3; x++) {
            let invader = new Invader(this.app);
            invader.sprite.y = -60;
            invader.sprite.x = this.getRandomInt(10, this.app.screen.width);
            invader.speed = this.getRandomInt(1,9)/10;
            invader.setWord(randomWords({exactly: 1, maxLength: 10})[0]);
            
            this.invaderList.push(invader);
        }
        
        for (let x=0; x < this.invaderList.length; x++) {
            this.app.stage.addChild(this.invaderList[x].sprite);
        }

        // game loop
        this.app.ticker.add(this.gameLoop.bind(this))
        window.addEventListener("keydown", this.keysDown.bind(this));
    }


    private gameLoop(delta: number) {
        for (let x = 0; x < this.invaderList.length; x ++) {
            this.invaderList[x].sprite.y += this.invaderList[x].speed * delta;
        }
        
        if (this.invaderLanded()) {
            this.displayLoseGame()
        }
    }

    private keysDown(event: KeyboardEvent) {
        
        let charInputed: string = event.key;

        if (this.acceptedChars.includes(charInputed)) {
            this.currentWordEntry = this.currentWordEntry + charInputed;
        }

        if (event.key === "Enter") {
            for (let x=0; x < this.invaderList.length; x++) {
                if (this.currentWordEntry === this.invaderList[x].word) {
                    this.resetInvader(this.invaderList[x]);
                }
            }            
            this.currentWordEntry = "";
        }
    }

    private invaderLanded(): boolean {
        for (let x = 0; x < this.invaderList.length; x ++) {
            if (this.invaderList[x].sprite.y > this.app.screen.height - this.invaderList[x].getHeight()) {
                return true
            } 
        }
        
        return false
    }

    private resetInvader(invader: Invader) {
        invader.sprite.y = -60;
        invader.sprite.x = this.getRandomInt(10, 290);
        invader.speed = this.getRandomInt(1,9)/10;
        invader.die();
        invader.setWord(randomWords({exactly: 1, maxLength: 10})[0]);
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private displayLoseGame() {
        this.loseMessage.sprite.x = this.app.screen.width/2 - this.loseMessage.getWidth()/2;
        this.loseMessage.sprite.y = this.app.screen.height/2 - this.loseMessage.getHeight()/2;
        this.app.stage.addChild(this.loseMessage.sprite);
        this.app.ticker.stop();
        sound.play("youlose_snd");
    }


}

export default GameScene;