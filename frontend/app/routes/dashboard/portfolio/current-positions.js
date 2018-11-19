import Route from '@ember/routing/route';
import $ from 'jquery';
import RSVP from 'rsvp';

export default Route.extend({

    actions: {
        goToOpenPosition (symbol){
            this.transitionTo('dashboard.portfolio.open-position', {queryParams: {'symbol':symbol}});
        },
        goToClosePosition (symbol) {

            return this.store.findRecord('user', this.get('session').get('uid')).then((user) => {
                return user.get('positions').toArray();
            }).then((positionArray) => {
                for(let i = 0; i < positionArray.length; i++){
                    if (positionArray[i].symbol == symbol){
                        return positionArray[i].id;
                    }
                }
            }).then((id) => {
                this.transitionTo('dashboard.portfolio.close-position', {queryParams: {'position':id, 'symbol':symbol}});
            })
        },
        goToResearch(symbol) {
            this.transitionTo('/dashboard/research?symbol=' + symbol);
        },
    },

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
            let dataArray = [['Symbol', 'Amount Owned']];

            for (let i = 0; i < results[1].length; i++){
               
                let position = results[0][i];
                let currentData = results[1][i];

                let currentValue = currentData.latestPrice * position.num_of_shares;
                let priceOfOwnedShares = Number(position.purchase_price) * Number(position.num_of_shares) + Number(position.brokerage_fees);
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
            combinedArray.forEach((item) => {
                console.log(item.symbol);
                console.log(item.value_at_purchase);

                dataArray.push([item.symbol, item.currentValue])
            
            })

            

            return RSVP.hash({
                currentPositions: combinedArray,
                chartData: dataArray
                    
                

                //     [
                //     ['Task', 'Hours per Day'],
                //     ['Work', 11],
                //     ['Eat', 2],
                //     ['Commute', 2],
                //     ['Watch TV', 2],
                //     ['Sleep', 7],
                //   ]

            })
                 
        })
    }
});
