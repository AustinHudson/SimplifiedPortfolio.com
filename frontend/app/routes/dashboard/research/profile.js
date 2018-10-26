import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    model() {
        let { symbol } = this.paramsFor('dashboard.research');
        console.log(symbol);

        const logoURL = 'http://localhost:3000/api/logo?symbol=' + symbol;
        const companyInfoURL = 'http://localhost:3000/api/company?symbol=' + symbol;

        const logoAPI = $.ajax({
            url: logoURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        const companyInfoAPI = $.ajax({
            url: companyInfoURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        return RSVP.hash({
            logo: logoAPI,  
            companyInfo: companyInfoAPI,
        })
    }
});
