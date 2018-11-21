import Controller from '@ember/controller';
import { sort } from '@ember/object/computed'

export default Controller.extend({

    queryParams: ['range'],
    range: "ALL",

    filteredPositions: Ember.computed.filter('model.positions', function(item) {
        
        let daysAgo5 = moment().subtract(5, 'days').startOf('day');
        let monthsAgo1 = moment().subtract(1, 'months');
        let monthsAgo3 = moment().subtract(3, 'months');
        let monthsAgo6 = moment().subtract(6, 'months');
        let today = moment().startOf('day');
        let startOfYear = moment().startOf('year');
        let yearsAgo1 = moment().subtract(1, 'years');
        
        switch(this.range) {
            case 'ALL':
                return 1;
            case '1Y': 
                return (item.close_date > yearsAgo1);
            case 'YTD':
                return (item.close_date > startOfYear && item.close_date <= today);
            case '6M':
                return (item.close_date > monthsAgo6);
            case '3M':
                return (item.close_date > monthsAgo3);
            case '1M':
                return (item.close_date > monthsAgo1);
            case '5D':
                return (item.close_date > daysAgo5);
        }
      
    })
});
