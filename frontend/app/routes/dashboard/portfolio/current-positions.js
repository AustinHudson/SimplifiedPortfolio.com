import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    

    model() {
        var positionSymbolsArray = [];

        return Promise.all([
            this.store.findRecord('user', this.get('session').get('uid')).then((user) => {

                return user.get('positions').toArray();
                
            }),
            this.store.findRecord('user', this.get('session').get('uid')).then((user) => {
                return user.get('positions').then((positions) => {
                    positions.forEach(function(item) {
                  positionSymbolsArray.push(item.symbol);
                     })
                     return positionSymbolsArray;
                }).then((symbols) => {
     
                 const watchlistInfoURL = 'http://localhost:3000/api/getBatchInfo?symbols=' + symbols + '&types=quote';
                 
                  return $.ajax({
                     url: watchlistInfoURL,
                     types: 'GET',
                     dataType: 'jsonp',    
                     })
                 });
             })
        ]).then((results) => {
            
            let combinedArray = [];

            for (let i = 0; i < results[1].length; i++){
               
                let position = results[0][i];
                let currentData = results[1][i];

                let currentValue = currentData.latestPrice * position.num_of_shares;
                let priceOfOwnedShares = Number((position.purchase_price * position.num_of_shares)) + Number(position.brokerage_fees);
                let priceChange  = currentValue - priceOfOwnedShares;
                let priceChangePercent = priceChange/priceOfOwnedShares;

                console.log(priceChange);
                console.log(priceChangePercent);

                let newObject = {
                    symbol: currentData.symbol,
                    purchase_date: position.purchase_date,
                    purchase_price: position.purchase_price,
                    num_of_shares: position.num_of_shares,
                    brokerage_fees: position.brokerage_fees,
                    value_at_purchase: priceOfOwnedShares,
                    companyName: currentData.companyName,
                    latestPrice: currentData.latestPrice,
                    currentValue: currentValue,
                    priceChange: priceChange,
                    priceChangePercent: priceChangePercent
                }

                combinedArray.push(newObject);
            }

            console.log('combined array: ' + combinedArray);
            combinedArray.forEach(function(item) {
                console.log(item);
            })

            return combinedArray;       
        })
    }
});
