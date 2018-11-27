import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    model() {
        let { symbol } = this.paramsFor('dashboard.research');
        console.log(symbol);

        const logoURL = '/api/logo?symbol=' + symbol;
        const companyInfoURL = '/api/company?symbol=' + symbol;
        const peersURL = '/api/peers?symbol=' + symbol;

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

        const peersAPI = $.ajax({
            url: peersURL,
            types: 'GET',
            dataType: 'jsonp',    
        });
        
        
        return RSVP.hash({
            logo: logoAPI,  
            companyInfo: companyInfoAPI,
            peers: peersAPI,
        })
    }
});
