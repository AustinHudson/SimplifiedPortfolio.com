import Component from '@ember/component';
import service from 'ember-service/inject';

export default Component.extend({

    router: service(),
    store: service(),
    session: service(),
    
    actions: {
        goToOpenPosition (symbol){
            this.get('router').transitionTo('dashboard.portfolio.open-position', {queryParams: {'symbol':symbol}});
        },
        goToClosePosition (symbol) {

            return this.store.findRecord('user', this.get('session').get('uid')).then((user) => {
                return user.get('positions').toArray();
            }).then((positionArray) => {
                for(let i = 0; i < positionArray.length; i++){
                    if (positionArray[i].symbol == symbol){
                        return positionArray[i].id;
                    }
                }
            }).then((id) => {
                this.get('router').transitionTo('dashboard.portfolio.close-position', {queryParams: {'position':id, 'symbol':symbol}});
            })
        },
        goToResearch(symbol) {
            this.get('router').transitionTo('/dashboard/research?symbol=' + symbol);
        },
    }
});
