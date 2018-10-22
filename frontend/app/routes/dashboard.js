import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({

    model() {        
        return $.ajax({
            url: 'http://localhost:3000/api/stories',
            types: 'GET',
            dataType: 'jsonp'
        }) 
    }  
});
