"use strict";

import { Container } from "@pixi/display";
import Invader from "./invader";
import randomWords from "random-words";
import MessageBox from "./message_box";
import StaticBackground from "./static_background";
import Cloud from "./cloud";
import ScoreDisplay from "./score_display";
import { sound } from '@pixi/sound';
import WaveDisplay from "./wave_display";

class GameScene {
    app: any;
    scene: Container;
    background: StaticBackground;
    invaderList: Invader[] = [];
    currentWordEntry: string = "";
    skyColor = 0x6BC1D6;
    cloudList: Cloud[] = [];
    scoreDisplay: ScoreDisplay;
    score: number = 0;
    waveDisplay: WaveDisplay;
    currentWave: number = 1;
    
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
    cloudsLoopBinded = this.cloudsLoop.bind(this);

    constructor(app: any) {
        this.scene = new Container();
        this.app = app;
        this.background = new StaticBackground(this.app);
        this.scoreDisplay = new ScoreDisplay(this.app);
        this.waveDisplay = new WaveDisplay(this.app);
        this.acceptedChars = "abcdefghijklmnopqrstuvwxyz";
        this.acceptedChars =  this.acceptedChars + this.acceptedChars.toUpperCase();
        this.acceptedChars = this.acceptedChars + "1234567890!@#$%^&*()";
    }

    init () {
        this.app.stage.addChild(this.scene);
        this.app.renderer.backgroundColor = this.skyColor;

        this.background.sprite.y = this.app.screen.height - this.background.sprite.height;
        this.scene.addChild(this.background.sprite);
        this.scene.addChild(this.scoreDisplay.sprite);
        this.scene.addChild(this.waveDisplay.sprite);
        
        for (let x=0; x < 3; x++) {
            let cloud = new Cloud(this.app);
            cloud.speed = this.getRandomInt(1, 3)/6;
            this.cloudList.push(cloud);
        }

        this.cloudList[0].sprite.x = this.getRandomInt(100, 150);
        this.cloudList[0].sprite.y = this.getRandomInt(20, 50);
        this.cloudList[0].sprite.scale.x = 0.9;
        this.cloudList[0].sprite.scale.y = 0.9;
        this.cloudList[1].sprite.x = this.getRandomInt(250, 300);
        this.cloudList[1].sprite.y = this.getRandomInt(70, 100);
        this.cloudList[1].sprite.scale.x = -1;
        this.cloudList[2].sprite.x = this.getRandomInt(600, 650);
        this.cloudList[2].sprite.y = this.getRandomInt(20, 100);
        this.cloudList[2].sprite.scale.x = 0.8;
        this.cloudList[2].sprite.scale.y = 0.8;

        for (let x=0; x < this.cloudList.length; x++) {
            this.scene.addChild(this.cloudList[x].sprite);
        }

        for (let x=0; x < 3; x++) {
            let invader = new Invader(this.app);
            invader.sprite.y = -60;
            invader.sprite.x = this.getRandomInt(10, this.app.screen.width - (invader.sprite.width+10));
            invader.speed = this.getRandomInt(1,9)/10;
            invader.setWord(randomWords({exactly: 1, maxLength: 10})[0]);
            
            this.invaderList.push(invader);
        }
        
        for (let x=0; x < this.invaderList.length; x++) {
            this.scene.addChild(this.invaderList[x].sprite);
        }

        // game loop
        this.app.ticker.add(this.gameLoopBinded);
        this.app.ticker.add(this.cloudsLoopBinded);
        window.addEventListener("keydown", this.keysDownBinded);
    }

    private cloudsLoop(delta: number) {
        for (let x = 0; x < this.cloudList.length; x ++) {
            this.cloudList[x].sprite.x += this.cloudList[x].speed * delta;
            if (this.cloudList[x].sprite.x > 900) {
                this.cloudList[x].sprite.x = -130;
            }
        }
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
                    this.scoreDisplay.updateScore(this.score = this.score + 100)
                }
            }            
            this.currentWordEntry = "";
        }
    }

    private invaderLanded(): boolean {
        for (let x = 0; x < this.invaderList.length; x ++) {
            if (this.invaderList[x].sprite.y > (this.app.screen.height - 52) - this.invaderList[x].getHeight()) {
                return true
            } 
        }
        
        return false
    }

    private resetInvader(invader: Invader) {
        invader.sprite.y = -60;
        invader.sprite.x = this.getRandomInt(10, this.app.screen.width - (invader.sprite.width+10));
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
            invader.sprite.x = this.getRandomInt(10, this.app.screen.width - (invader.sprite.width+10));
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
        this.cloudList = [];
    }
}

export default GameScene;