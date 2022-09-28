import { LightningElement } from 'lwc';
import BELL_AUDIO from '@salesforce/resourceUrl/bell_audio'
import { formatTime } from 'c/util';

export default class TeaTimer extends LightningElement {

    intervalNumber = 0;
    secondsLeft;
    intervalId = null;
    intervalCount;
    timerStarted = false;
    notificationSound = new Audio(BELL_AUDIO);

    intervalCountChanged(event){
        console.log(event);
        this.intervalCount = event.detail;
    }

    startCountdown() {
        this.hideInitSection();
        this.timerStarted = true;
        this.secondsLeft = this.template
            .querySelector('c-simple-init')
            .getDurationForInterval(this.intervalNumber);
        this.intervalNumber++;
        this.intervalId=setInterval(() => {
            this.secondsLeft--;
            if (this.secondsLeft===0) {
                this.finishCountdown();
            }
        }, 1000);
    }

    finishCountdown(){
        this.ringBell();
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    get timerTitle(){
        return `Infusion ${this.intervalNumber}/${this.intervalCount}`
    }

    timerIsNotRunning = () => this.intervalId === null;

    get showButton(){
        return this.timerIsNotRunning();
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

    _showInitSection = true;

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

    ringBell() {
        this.notificationSound.currentTime = 0;
        this.notificationSound.play();
    }
}
