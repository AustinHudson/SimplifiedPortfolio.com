import Component from '@ember/component';
import service from 'ember-service/inject';

export default Component.extend({

    router: service(),
    store: service(),
    session: service(),

    actions: {

        goToResearch(symbol) {
            this.get('router').transitionTo('/dashboard/research?symbol=' + symbol);
        },

        goToOpenPosition(symbol) {
            this.get('router').transitionTo('/dashboard/portfolio');
            this.get('router').transitionTo('/dashboard/portfolio/open-position?symbol=' + symbol);
        }

        
    }
});
