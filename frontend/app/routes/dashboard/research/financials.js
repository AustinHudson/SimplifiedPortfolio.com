import Route from '@ember/routing/route';
import $ from 'jquery';


export default Route.extend({

    model() {
        let { symbol } = this.paramsFor('dashboard.research');
        console.log(symbol);

        const quarterlyURL = 'http://localhost:3000/api/quarterly_financials?symbol=' + symbol;

        const quarterlyAPI = $.ajax({
            url: quarterlyURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        console.log(quarterlyAPI);

        return quarterlyAPI;   
    }
});
