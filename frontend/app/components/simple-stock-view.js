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

        addToWatchlist(symbol) {

            const uid = this.get('session').get('uid');
            
            this.store.findRecord('user', uid).then((user) => {

                let userStocks = user.get('followed_stocks');

                for (let stock of userStocks) {
                    if (stock == symbol){
                        alert(symbol + " is already in your watchlist");
                        return;
                    }
                }
                user.get('followed_stocks').push(symbol);
                user.save();
            });
        }
    }
});
