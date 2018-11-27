import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    model() {
        let { symbol } = this.paramsFor('dashboard.research');
        const quarterlyURL = '/api/quarterly_financials?symbol=' + symbol;
        const basicInfoURL = '/api/basicInfo?symbol=' + symbol;

        const quarterlyAPI = $.ajax({
            url: quarterlyURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        const basicInfoAPI = $.ajax({
            url: basicInfoURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        return RSVP.hash({
            quarterlyInfo: quarterlyAPI,
            basicInfo: basicInfoAPI
        })
    }
});
