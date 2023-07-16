import { LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';
import BELL_AUDIO from '@salesforce/resourceUrl/bell_audio'
import { formatTime } from 'c/util';

export default class TeaTimer extends LightningElement {

    intervalNumber = 0;
    secondsLeft;
    intervalId = null;
    intervalCount;
    timerStarted = false;
    notificationSound = new Audio(BELL_AUDIO);
    defaultFirstInterval = 20;
    defaultIntervalCount = 9;
    defaultIntervalIncrease = 5;
    manuallyAddedTime = 0;

    connectedCallback() {
        this.disablePullToRefresh();
    }

    // Fire the event to disable pull-to-refresh on this page
    // This has an effect only in the Salesforce Mobile and 
    // Mobile Publisher apps
    disablePullToRefresh () {
        // CustomEvent is standard JavaScript. See:
        // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
        const disable_ptr_event = new CustomEvent("updateScrollSettings", {
            detail: {
                isPullToRefreshEnabled: false
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(disable_ptr_event);
    }

    setDefaults(){
        const simpleInitComponent = this.template.querySelector('c-simple-init');
        console.log(simpleInitComponent);
        simpleInitComponent.firstInterval=this.defaultFirstInterval;
        simpleInitComponent.intervalCount=this.defaultIntervalCount;
        simpleInitComponent.intervalIncrease=this.defaultIntervalIncrease;
    }

    intervalCountChanged(event){
        this.intervalCount = event.detail;
    }

    startCountdown() {
        this.hideInitSection();
        this.timerStarted = true;
        this.secondsLeft = this.template
            .querySelector('c-simple-init')
            .getDurationForInterval(this.intervalNumber) + this.manuallyAddedTime;
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

    abortCountdown(){
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.intervalNumber--;
        this.timerStarted = false;
    }

    get timerTitle(){
        return `Infusion ${this.intervalNumber}/${this.intervalCount}`
    }

    timerIsNotRunning = () => this.intervalId === null;

    get showNextInfusionButton(){
        return this.timerIsNotRunning();
    }

    get showResetButton(){
        return !this._showInitSection && this.timerIsNotRunning();
    }

    get showStopButton() {
        return !this.timerIsNotRunning() && this.timerStarted;
    }

    get buttonLabel(){
        return `Start infusion ${this.intervalNumber + 1}`;
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

    promptForReset(){
        LightningConfirm.open({
            label: 'Reset Timer?',
            message: 'Click "OK" to reset everything'
        }).then(result => result && this.resetTimer());
    }

    promptForChanges(){
        LightningPrompt.open({
            label: 'Add Time',
            message:  'Add seconds to next infusion',
            defaultValue: '30',
        }).then((result) => {
            const parsed = parseInt(result, 10);
            if (isNaN(parsed)) { return 0; }
            this.manuallyAddedTime += parsed;
        });
    }

    resetTimer() {
        this.timerStarted = false;
        this.intervalNumber = 0;
        this.setDefaults();
        this.showInitSection();
    }
}
