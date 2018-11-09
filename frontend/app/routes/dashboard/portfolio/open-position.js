import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    resetController(controller, isExiting, transition) {
        if (isExiting) {
          // isExiting would be false if only the route's model was changing
          controller.set('symbol', null);
        }
      },

    actions: {
        verifySymbol(symbol) {
            console.log("made it to verify action with " + symbol);
            this.transitionTo('dashboard.portfolio.open-position', {queryParams: {'symbol':symbol}});
            this.refresh();
        },

        updatePosition(position) {

            if (!position.get('price')){
                alert('Please Enter a Purchase Price.');
                return;
            }
            if (position.get('price') < 0){
                alert('Purchase price cannot be a negative value.');
                return;
            }
            if (!position.get('date')){
                alert('Please Enter a date of the purchase.');
                return;
            }
            let selectedDate = new Date(position.get('date'));
            let now = new Date();

            if (selectedDate > now){
                alert('The date of purchase cannot be in the future.')
                return;
            }
            if (!position.get('shares')){
                alert('Please Enter the number of shares purchased.');
                return;
            }
            if (position.get('shares') < 0){
                alert('The amount of shares purchased cannot be a negative value');
                return;
            }
            if (!position.get('fees')){
                alert('Please Enter the total amount of fees for this transaction.');
                return;
            }
            if (position.get('fees') < 0){
                alert('The fee amount cannot be a negative value');
                return;
            }

            let totalValue = position.get('price') * position.get('shares') - position.get('fees');
            
            let newPosition = this.store.createRecord('position', {
                symbol: this.controller.get('symbol').toUpperCase(),
                purchase_date: selectedDate,
                purchase_price: position.get('price'),
                num_of_shares: position.get('shares'),
                brokerage_fees: position.get('fees'),
                value_at_purchase: totalValue,
            })
            const uid = this.get('session').get('uid');
            
            this.store.findRecord('user', uid).then((user) => {
                user.get('positions').addObject(newPosition);
                newPosition.save().then(() => {
                    user.save();
                });
            });
            this.refresh();
            this.transitionTo('dashboard.portfolio.current-positions');
        }
    },

    model(params) {
        
        const basicInfoURL = 'http://localhost:3000/api/basicInfo?symbol=' + params.symbol;

        const basicInfoAPI = $.ajax({
            url: basicInfoURL,
            types: 'GET',
            dataType: 'jsonp',    
        });

        console.log(basicInfoAPI);
        
        return RSVP.hash({
            basicInfo: basicInfoAPI,
        })
    }
});
