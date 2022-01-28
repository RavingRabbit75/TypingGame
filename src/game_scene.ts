"use strict";

import { Container } from "@pixi/display";
import Invader from "./invader";
import randomWords from "random-words";
import MessageBox from "./message_box";
import { sound } from '@pixi/sound';

class GameScene {
    app: any;
    scene: Container;
    invaderList: Invader[] = [];
    currentWordEntry: string = "";
    
    private acceptedChars: string = "";
    loseMessage = new MessageBox("YOU LOSE \n PLAY AGAIN? \n Y/N");

    gameEndedEvent = new CustomEvent("gameEnded", {
        detail: {
            gameFinished: true
        }
    })

    keysDownBinded = this.keysDown.bind(this);
    checkPlayAgainKeyBinded = this.checkPlayAgainKey.bind(this);
    gameLoopBinded = this.gameLoop.bind(this);

    constructor(app: any) {
        this.scene = new Container();
        this.app = app;
        this.acceptedChars = "abcdefghijklmnopqrstuvwxyz";
        this.acceptedChars =  this.acceptedChars + this.acceptedChars.toUpperCase();
        this.acceptedChars = this.acceptedChars + "1234567890!@#$%^&*()";
    }

    init () {
        this.app.stage.addChild(this.scene);

        for (let x=0; x < 3; x++) {
            let invader = new Invader(this.app);
            invader.sprite.y = -60;
            invader.sprite.x = this.getRandomInt(10, this.app.screen.width);
            invader.speed = this.getRandomInt(1,9)/10;
            invader.setWord(randomWords({exactly: 1, maxLength: 10})[0]);
            
            this.invaderList.push(invader);
        }
        
        for (let x=0; x < this.invaderList.length; x++) {
            this.scene.addChild(this.invaderList[x].sprite);
        }

        // game loop
        this.app.ticker.add(this.gameLoopBinded);
        window.addEventListener("keydown", this.keysDownBinded);
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
        console.log("GAME KEYS")
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
        this.scene.addChild(this.loseMessage.sprite);
        this.app.ticker.remove(this.gameLoopBinded);
        sound.play("youlose_snd");
        window.removeEventListener("keydown", this.keysDownBinded);
        window.addEventListener("keydown", this.checkPlayAgainKeyBinded);
    }

    private checkPlayAgainKey(event: KeyboardEvent) {
        let charInputed: string = event.key;

        if (charInputed.toLowerCase() === "y") {
            window.removeEventListener("keydown", this.checkPlayAgainKeyBinded);
            this.restartGame();
        } else if (charInputed.toLowerCase() === "n") {

            window.removeEventListener("keydown", this.checkPlayAgainKeyBinded);
            window.dispatchEvent(this.gameEndedEvent);
        }
    }

    private restartGame() {
        for (let x=0; x < 3; x++) {
            let invader = this.invaderList[x];
            invader.sprite.y = -60;
            invader.sprite.x = this.getRandomInt(10, this.app.screen.width);
            invader.speed = this.getRandomInt(1,9)/10;
            invader.setWord(randomWords({exactly: 1, maxLength: 10})[0]);
        }

        this.scene.removeChild(this.loseMessage.sprite);
        this.app.ticker.add(this.gameLoopBinded);
        window.addEventListener("keydown", this.keysDownBinded);
    }

    destroy() {
        this.scene.removeChildren();
        this.app.stage.removeChild(this.scene);
        this.invaderList = [];
    }
}

export default GameScene;