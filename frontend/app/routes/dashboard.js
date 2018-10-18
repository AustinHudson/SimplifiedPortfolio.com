import Route from '@ember/routing/route';
import $ from 'jquery';
import { inject } from '@ember/service';

export default Route.extend({
    store: inject(),

    model() {        
        return $.ajax({
            url: 'http://localhost:3000/api/stories',
            types: 'GET',
            dataType: 'jsonp'
        })
    //     .then((results) => {
    //         console.log("RESULTS:", results);
    //         var storyArray = Object.keys(results).map((element) => {
    //             var story = results[element];
    //             return story;
    //         });
    // return storyArray;
    // })
    
}  
});
