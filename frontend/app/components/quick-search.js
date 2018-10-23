import Component from '@ember/component';

export default Component.extend({

    actions: {
        submit() {
            this.sendAction('submit', { symbol: this.get('stockSymbol')});
        }
    }
});
