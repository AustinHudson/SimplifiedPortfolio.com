import Route from '@ember/routing/route';

export default Route.extend({

    beforeModel() {
        this.transitionTo('dashboard.portfolio.watchlist');
    },

    actions: {
        researchSymbol(company){
            console.log(company);
            this.transitionTo('dashboard.research', {queryParams: {'symbol':company}});
            this.transitionTo('dashboard.research.profile');
        }
    },
});

