import Route from '@ember/routing/route';

export default Route.extend({

    model(){

        let { symbol } = this.paramsFor('dashboard.research');

        const basicInfoURL = '/api/basicInfo?symbol=' + symbol;

        const basicInfoAPI = $.ajax({
            url: basicInfoURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        return basicInfoAPI;        
    }
});
