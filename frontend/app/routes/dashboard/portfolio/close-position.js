import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    resetController(controller, isExiting, transition) {
        if (isExiting) {
          // isExiting would be false if only the route's model was changing
          controller.set('symbol', null);
          controller.set('position', null);
        }
      },

    actions: {

        getPosition(param) {

            this.refresh();
            this.transitionTo({queryParams: {'position':param.id, 'symbol':param.symbol}});
        },

        updatePosition(formData, position, basicInfo) {

            if (!formData.get('price')){
                alert('Please Enter a Sell Price.');
                return;
            }
            if (formData.get('price') < 0) {
                alert('You cannot have a negative value for the share price');
                return;
            }
            if (!formData.get('date')){
                alert('Please Enter a date of the sell.');
                return;
            }

            let selectedDate = new Date(formData.get('date'));
            let now = new Date();

            if (selectedDate > now){
                alert('The sell date cannot be in the future.')
                return;
            }
            if (selectedDate < position.get('purchase_date')){
                alert ('The sell date cannot be before the purchase date.')
                return;
            }
            if (!formData.get('shares')){
                alert('Please Enter the number of shares sold.');
                return;
            }
            if (formData.get('shares') < 0) {
                alert('You cannot have a negative value for number of shares sold');
                return;
            }
            if(formData.get('shares') > position.get('num_of_shares')){
                alert('You cannot sell more shares than you own. (' + position.get('num_of_shares') + ')');
                return;
            }
            if (!formData.get('fees')){
                alert('Please Enter the total amount of fees for this transaction.');
                return;
            }
            if (formData.get('fees') < 0) {
                alert('You cannot have a negative value for transactional fees');
                return;
            }

            let revenue = formData.get('price') * formData.get('shares') - formData.get('fees');
            let cost = position.get('purchase_price') * formData.get('shares') + position.get('brokerage_fees'); 
            let profit = revenue - cost;
            let profitPercentage = profit/cost;

            let newClosedPosition = this.store.createRecord('closed-position', {
                symbol: position.get('symbol').toUpperCase(),
                company_name: basicInfo.companyName,
                close_date: selectedDate,
                close_price: formData.get('price'),
                purchase_price: position.get('purchase_price'),
                purchase_fees: position.get('brokerage_fees'),
                close_num_of_shares: formData.get('shares'),
                close_brokerage_fees: formData.get('fees'),
                profit: profit,
                profit_percentage: profitPercentage
            })

            const uid = this.get('session').get('uid');
            
            this.store.findRecord('user', uid).then((user) => {
                user.get('closed_positions').addObject(newClosedPosition);
                newClosedPosition.save().then(() => {
                    user.save();
                });
            });

            let newNumOfShares = position.get('num_of_shares') - formData.get('shares');

            //All shares of open position have been sold. delete the open position.
            if (newNumOfShares == 0 ){
                this.store.findRecord('position', position.get('id'), { backgroundReload: false }).then((closedPosition) => {
                    closedPosition.destroyRecord();
                    
                })
            }
            //remove the number of sold shares from the open position. 
            else{
               
                this.store.findRecord('position', position.get('id'), { backgroundReload: false }).then((openPosition) => {
            
                        openPosition.set('num_of_shares', newNumOfShares);
                        openPosition.save()
                    })
                }
            this.controller.set('price', null);
            this.controller.set('date', null);
            this.controller.set('shares', null);
            this.controller.set('fees', null);

            this.refresh();
            this.transitionTo('dashboard.portfolio.gains-losses');
        }
    },

    model(params){

        if (params.position) {

            const basicInfoURL = 'http://localhost:3000/api/basicInfo?symbol=' + params.symbol;

            return RSVP.hash({
                positionList: this.store.findRecord('user', this.get('session').get('uid')).then((user) => {
                    return user.get('positions').toArray();
                    }),
                selectedPosition: this.store.findRecord('position', params.position),
                
                basicInfo: $.ajax({
                    url: basicInfoURL,
                    types: 'GET',
                    dataType: 'jsonp',    
                })
            })
        }
        else {
            return RSVP.hash({
                positionList: this.store.findRecord('user', this.get('session').get('uid')).then((user) => {
                    return user.get('positions').toArray();
                }),
            })
        }  
    }
});
