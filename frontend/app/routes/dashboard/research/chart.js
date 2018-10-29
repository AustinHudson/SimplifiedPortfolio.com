import Route from '@ember/routing/route';

export default Route.extend({

    model(){

        let { symbol } = this.paramsFor('dashboard.research');
        console.log(symbol);

        return symbol;        
    }
});
