import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';


export default Route.extend({

    quereyParams: {
        symbol: {
          refreshModel: true
        }
      },

    resetController(controller, isExiting, transition) {
        if (isExiting) {
          // isExiting would be false if only the route's model was changing
          controller.set('symbol', null);
        }
      },

      actions: {
        getStories(company){
            this.refresh();
            this.transitionTo({queryParams: {'symbol':company}});
        },

        researchSymbol(company){
            console.log(company);
            this.transitionTo('dashboard.research', {queryParams: {'symbol':company}});
            this.transitionTo('dashboard.research.profile');
        }
    },
      
    model(params) {    
        
        const storiesURL = 'http://localhost:3000/api/stories'
        const personalizedStoriesURL = 'http://localhost:3000/api/getStories?symbol=' + params.symbol;
       
        const storiesAPI = $.ajax({
            url: storiesURL,
            types: 'GET',
            dataType: 'jsonp'
        }); 
        const personalizedStoriesAPI = $.ajax({
            url: personalizedStoriesURL,
            types: 'GET',
            dataType: 'jsonp'
        }); 

        const uid = this.get('session').get('uid');
        const getUser = this.store.findRecord('user', uid);
        
        return RSVP.hash({
            generalStories: storiesAPI,
            personalizedStories: personalizedStoriesAPI,
            userModel: getUser, 
        })
    },
    
    
  
});
