import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    model() {
        let { symbol } = this.paramsFor('dashboard.research');
        console.log(symbol);

        const getPriceURL = 'http://localhost:3000/api/basicInfo?symbol=' + symbol;
        const keyStatsURL = 'http://localhost:3000/api/keyStatistics?symbol=' + symbol;

        const getPriceAPI = $.ajax({
            url: getPriceURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        const keyStatsAPI = $.ajax({
            url: keyStatsURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        return RSVP.hash({
            basicInfo: getPriceAPI,  
            keyStatistics: keyStatsAPI,
        })
    }
});
