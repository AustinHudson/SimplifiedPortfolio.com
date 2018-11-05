import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';


export default Route.extend({

    actions: {
        removeFromWatchlist(symbol) {

            const uid = this.get('session').get('uid');
            
            this.store.findRecord('user', uid).then((user) => {
                user.get('followed_stocks').removeObject(symbol);
                user.save();
                this.refresh();
            });
        }
    }, 

    model() {

        
        return RSVP.hash({

            stockData: this.store.findRecord('user', this.get('session').get('uid')).then((user) => {

                let watchlistStocks = user.get('followed_stocks');
                let types = 'quote';
        
                const watchlistInfoURL = 'http://localhost:3000/api/getBatchInfo?symbols=' + watchlistStocks + '&types=' + types;
        
                return $.ajax({
                    url: watchlistInfoURL,
                    types: 'GET',
                    dataType: 'jsonp',    
                });
                }),

            followedStocks:  this.store.findRecord('user', this.get('session').get('uid')).then((user) => {

                return user.get('followed_stocks');
            })

        });
    }
});
