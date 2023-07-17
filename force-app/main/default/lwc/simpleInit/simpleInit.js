import { LightningElement, api } from 'lwc';

export default class SimpleInit extends LightningElement {

    @api 
    firstInterval=20;
    @api 
    intervalIncrease=5;
    @api 
    intervalCount=9;

    @api
    getDurationForInterval(intervalNumber) {
        return parseInt(this.firstInterval, 10) + intervalNumber * this.intervalIncrease;
    }

    connectedCallback(){
        this.updateIntervalCount();
    }

    firstInfusionChanged(event) {
        this.firstInterval=event.target.value;
        this.updateFirstInfusion();
    }

    intervalIncreaseChanged(event) {
        this.intervalIncrease=event.target.value;
    }

    intervalCountChanged(event) {
        this.intervalCount=event.target.value;
        this.updateIntervalCount();
    }

    updateIntervalCount(){
        this.dispatchEvent(new CustomEvent('interval_count_changed', {
            detail: this.intervalCount
        }))
    }

    updateFirstInfusion(){
        this.dispatchEvent(new CustomEvent('first_interval_changed', {
            detail: this.firstInterval
        }))
    }

}
