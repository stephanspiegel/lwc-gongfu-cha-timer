import { LightningElement } from 'lwc';
import BELL_AUDIO from '@salesforce/resourceUrl/bell_audio'
import { formatTime } from 'c/util';

export default class GetterCountdown extends LightningElement {

    firstInterval = 20;
    intervalIncrease = 5;
    intervalCount = 9;
    intervalNumber = 0;
    secondsLeft = this.firstInterval;
    intervalId = null;
    timerStarted = false;

    startCountdown() {
        this.timerStarted = true;
        this.secondsLeft = parseInt(this.firstInterval) + this.intervalNumber * this.intervalIncrease;
        this.intervalNumber++;
        this.intervalId=setInterval(() => {
            this.secondsLeft--;
            if (this.secondsLeft===0) {
                this.finishCountdown();
            }
        }, 1000);
    }

    finishCountdown(){
        this.playAudio();
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    get timerTitle(){
        return `Infusion ${this.intervalNumber}/${this.intervalCount}`
    }

    timerIsRunning(){
        return this.intervalId !== null;
    }

    get hideButton(){
        return this.timerIsRunning();
    }

    get buttonLabel(){
        return `Start infusion ${this.intervalNumber + 1}`
    }

    get timeLeft(){
        return formatTime(this.secondsLeft);
    }

    countdownColorClass(){
        if (this.intervalId===null){
            return 'dormant'
        }
        if (this.secondsLeft <= 3){
            return 'imminent';
        }
        return 'ticking';
    }

    get countdownClass() {
        return this.countdownColorClass() + ' countDown';
    }

    firstInfusionChanged(event) {
        this.firstInterval=event.detail.value;
        this.secondsLeft=event.detail.value;
    }

    intervalIncreaseChanged(event) {
        this.intervalIncrease=event.detail.value;
    }

    intervalCountChanged(event) {
        this.intervalCount=event.detail.value;
    }


    playAudio() {
        let audio = new Audio();
        audio.src = BELL_AUDIO;
        audio.load();
        audio.play();
    }
}
