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
        
        const basicInfoURL = 'http://localhost:/api/basicInfo?symbol=' + params.symbol;
        const gainersURL = 'http://localhost:3000/api/gainers';
        const losersURL = 'http://localhost:3000/api/losers';
        const sectorsURL = 'http://localhost:3000/api/sectors';

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
