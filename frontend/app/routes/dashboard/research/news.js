import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({

    model() {

        let { symbol } = this.paramsFor('dashboard.research');

        const newsStoriesURL = 'http://localhost:3000/api/getStories?symbol=' + symbol;

        const newsStoriesAPI = $.ajax({
            url: newsStoriesURL,
            types: 'GET',
            dataType: 'jsonp'
        }); 
        console.log(newsStoriesAPI);
        return newsStoriesAPI;
    }
});
