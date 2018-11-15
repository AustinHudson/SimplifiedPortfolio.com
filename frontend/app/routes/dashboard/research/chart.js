import Route from '@ember/routing/route';

export default Route.extend({

    model(){

        let { symbol } = this.paramsFor('dashboard.research');

        const basicInfoURL = 'http://localhost:3000/api/basicInfo?symbol=' + symbol;

        const basicInfoAPI = $.ajax({
            url: basicInfoURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        return basicInfoAPI;        
    }
});
