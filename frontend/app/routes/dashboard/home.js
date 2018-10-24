import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({

    resetController(controller, isExiting, transition) {
          if (isExiting) {
            // isExiting would be false if only the route's model was changing
            controller.set('symbol', null);
          }
        },
      

    quereyParams: {
        symbol: {
          refreshModel: true
        }
      },

      actions: {

        onSubmitForm(params) {
            this.refresh();
            this.transitionTo('dashboard.home', {queryParams: params});
        }
    },

    model(params){

        const formURL = 'http://localhost:3000/api/basicInfo?symbol=' + params.symbol;

        const response = $.ajax({
            url: formURL,
            types: 'GET',
            dataType: 'jsonp',    
        });
        console.log('Made It here', response);
        return response;
    },

    
});
