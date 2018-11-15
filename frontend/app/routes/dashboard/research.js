import Route from '@ember/routing/route';

export default Route.extend({

    beforeModel(){
        this.transitionTo('dashboard.research.profile');
    },
    actions:{
        goToOpenPosition (symbol){
            this.transitionTo('dashboard.portfolio.open-position', {queryParams: {'symbol':symbol}});
        },

        addToWatchlist(symbol) {

            const uid = this.get('session').get('uid');

            this.store.findRecord('user', uid).then((user) => {

                let userStocks = user.get('followed_stocks');

                for (let stock of userStocks) {
                    if (stock == symbol.toUpperCase()){
                        alert(symbol.toUpperCase() + " is already in your watchlist");
                        return;
                    }
                }
                user.get('followed_stocks').pushObject(symbol);
                user.save();
            });
        }
    }   
       
});
