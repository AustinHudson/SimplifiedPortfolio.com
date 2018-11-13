import Route from '@ember/routing/route';

export default Route.extend({

    actions: {
        researchSymbol(company){
            console.log(company);
            this.transitionTo('dashboard.research', {queryParams: {'symbol':company}});
            this.transitionTo('dashboard.research.profile');
        }
    },

     
});
