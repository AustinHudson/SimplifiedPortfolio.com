import Route from '@ember/routing/route';

export default Route.extend({

    beforeModel(symbol) {

        if (symbol) {
           return
        }else {
            this.transitionTo('dashboard.portfolio.watchlist');
        }
    },

    actions: {
        researchSymbol(company){
            console.log(company);
            this.transitionTo('dashboard.research', {queryParams: {'symbol':company}});
            this.transitionTo('dashboard.research.profile');
        }
    },
});

