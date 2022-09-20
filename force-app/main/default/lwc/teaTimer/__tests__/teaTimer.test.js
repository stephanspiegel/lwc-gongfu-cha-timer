import { createElement } from 'lwc';
import TeaTimer from 'c/teaTimer';

describe('c-tea-timer', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows information about the current infusion in the title', async () => {
        const element = createElement('c-tea-timer', {
            is: TeaTimer
        });
        document.body.appendChild(element);
        const intervalCountInputEl = element.shadowRoot.querySelector('.intervalCount');
        intervalCountInputEl.value = 5;
        intervalCountInputEl.dispatchEvent(new CustomEvent('change'));
        return Promise.resolve().then(() => {
            const card = element.shadowRoot.querySelector('lightning-card');
            expect(card.title).toBe('Infusion 0/5');
        });
    });
});
