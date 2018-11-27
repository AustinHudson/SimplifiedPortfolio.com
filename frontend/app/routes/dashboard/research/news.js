import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    model() {

        let { symbol } = this.paramsFor('dashboard.research');

        const newsStoriesURL = '/api/getStories?symbol=' + symbol;
        const basicInfoURL = '/api/basicInfo?symbol=' + symbol;

        const newsStoriesAPI = $.ajax({
            url: newsStoriesURL,
            types: 'GET',
            dataType: 'jsonp'
        }); 

        const basicInfoAPI = $.ajax({
            url: basicInfoURL,
            types: 'GET',
            dataType: 'jsonp',    
        });
      
        return RSVP.hash({
            newsStories: newsStoriesAPI,
            basicInfo: basicInfoAPI
        })
        
    }
});
