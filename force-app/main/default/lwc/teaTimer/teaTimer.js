import { LightningElement } from 'lwc';
import BELL_AUDIO from '@salesforce/resourceUrl/bell_audio'
import { formatTime } from 'c/util';

export default class TeaTimer extends LightningElement {

    intervalNumber = 0;
    requestIntervalNumber = this.intervalNumber;
    secondsLeft = this.firstInterval;
    intervalId = null;
    intervalCount;
    timerStarted = false;
    _showInitSection = true;

    intervalDurationChanged(event){
        console.log(event);
        this.secondsLeft = event.detail;
    }

    intervalCountChanged(event){
        console.log(event);
        this.intervalCount = event.detail;
    }

    startCountdown() {
        this.hideInitSection();
        this.requestIntervalNumber = this.intervalNumber;
        this.timerStarted = true;
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

    get initSectionClass() {
        return this._showInitSection
        ? 'slds-show'
        : 'slds-hide';
    }

    hideInitSection(){
        this._showInitSection = false;
    }

    showInitSection(){
        this._showInitSection = true;
    }

    playAudio() {
        let audio = new Audio();
        audio.src = BELL_AUDIO;
        audio.load();
        audio.play();
    }
}
