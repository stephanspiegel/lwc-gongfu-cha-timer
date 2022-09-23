import { LightningElement, api } from 'lwc';

export default class SimpleInit extends LightningElement {

    _intervalNumber;
    @api 
    get intervalNumber(){
        return this._intervalNumber;
    }
    set intervalNumber(value){
        this._intervalNumber = value;
        this.sendUpUpdates();
    }

    firstInterval = 20;
    intervalIncrease = 5;
    intervalCount = 9;

    sendUpUpdates(){
        this.updateNextInterval();
        this.updateIntervalCount();
    }

    calculateNextIntervalDuration(){
        return parseInt(this.firstInterval, 10) + this.intervalNumber * this.intervalIncrease;
    }

    updateNextInterval(){
        const intervalDuration = this.calculateNextIntervalDuration();
        this.dispatchEvent(new CustomEvent('update_interval', {
            detail: intervalDuration
        }));
    }

    updateIntervalCount(){
        this.dispatchEvent(new CustomEvent('update_interval_count', {
            detail: this.intervalCount
        }))
    }

    firstInfusionChanged(event) {
        this.firstInterval=event.target.value;
        this.updateNextInterval();
    }

    intervalIncreaseChanged(event) {
        this.intervalIncrease=event.target.value;
        this.updateNextInterval();
    }

    intervalCountChanged(event) {
        this.intervalCount=event.target.value;
        this.updateIntervalCount();
    }
}
