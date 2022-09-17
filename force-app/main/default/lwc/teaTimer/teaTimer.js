import { LightningElement } from 'lwc';

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
        this.intervalNumber++;
        this.intervalId=setInterval(() => {
            this.secondsLeft--;
            if (this.secondsLeft===0) {
                this.finishCountdown();
            }
        }, 1000);
    }

    finishCountdown(){
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.secondsLeft = parseInt(this.firstInterval) + this.intervalNumber * this.intervalIncrease;
    }

    get timerTitle(){
        return `Infusion ${this.intervalNumber}/${this.intervalCount}`
    }

    countdownColorClass(){
        if (this.intervalId===null){
            return 'dormant'
        }
        if (this.secondsLeft < 5){
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
}
