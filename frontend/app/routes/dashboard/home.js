import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    quereyParams: {
        symbol: {
          refreshModel: true
        }
      },

      actions: {
        onSubmitForm(params) {
            this.refresh();
            this.transitionTo('dashboard.home', {queryParams: params});
        },

       
    },

    model(params){

        let port = process.env.port || 3000;
    
        alert('the port is' + port);
        const basicInfoURL = 'http://localhost:' + port + '/api/basicInfo?symbol=' + params.symbol;
        const gainersURL = 'http://localhost:' + port + '/api/gainers';
        const losersURL = 'http://localhost:' + port + '/api/losers';
        const sectorsURL = 'http://localhost:' + port + '/api/sectors';

        const basicInfoAPI = $.ajax({
            url: basicInfoURL,
            types: 'GET',
            dataType: 'jsonp',    
        });
        const gainersAPI = $.ajax({
            url: gainersURL,
            types: 'GET',
            dataType: 'jsonp',    
        });
        const losersAPI = $.ajax({
            url: losersURL,
            types: 'GET',
            dataType: 'jsonp',    
        });
        const sectorsAPI = $.ajax({
            url: sectorsURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        return RSVP.hash({
            basicInfo: basicInfoAPI,
            gainersInfo: gainersAPI,
            losersInfo: losersAPI,
            sectorsInfo: sectorsAPI,
        })
    },

    
});
