import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
    model() {        
        const response = $.ajax({
            url: 'http://localhost:3000/api/stories',
            types: 'GET',
            dataType: 'jsonp'
        }); 
        console.log(response);
        return response;
    } 
});
