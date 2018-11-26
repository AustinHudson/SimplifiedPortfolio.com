import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

    actions: {
        filterDates(range) {
            this.refresh();
            this.transitionTo('/dashboard/portfolio/gains-losses?range=' + range);
        },

        deleteTransaction(position) {
            this.store.findRecord('closed-position', position.id).then((transaction) => {
                transaction.destroyRecord(); 
            })

            const uid = this.get('session').get('uid');
            
            this.store.findRecord('user', uid).then((user) => {
                user.get('closed_positions').removeObject(position.id);
                user.save();
                this.refresh();
                this.transitionTo('dashboard.portfolio.current-positions');
            })     
        },

        excelExport(positions){
            
            let data = [
                ['Date', 'Symbol', 'Company Name', 'Purchase Price', 'Closing Price', 'Number of Shares', 'Closing Fees', 'Profit($)', 'Profit(%)'],
            ];
             
            positions.forEach((item) => {
                let rowArray = []
                rowArray.push((item.close_date).toDateString());
                rowArray.push(item.symbol);
                rowArray.push(item.company_name);
                rowArray.push(item.purchase_price);
                rowArray.push(item.close_price);
                rowArray.push(item.close_num_of_shares);
                rowArray.push(item.close_brokerage_fees);
                rowArray.push(item.profit); 
                rowArray.push(item.profit_percentage);
                data.push(rowArray);
            })
              this.get('excel').export(data, {sheetName: 'all', fileName: 'gain-loss.xlsx'});
        }        
    },

    model() {

        let { range } = this.paramsFor('dashboard.portfolio.gains-losses');

        let closedPositions = this.store.findRecord('user', this.get('session').get('uid')).then((user) => {
            return user.get('closed_positions').sortBy('close_date').toArray(); 
        })
        let totals =  this.store.findRecord('user', this.get('session').get('uid')).then((user) => {

           
           
            return  user.get('closed_positions'); 

        }).then((positions) => {

            let inRangePositions = [];

            console.log("getting current range in route: " + range);

            let daysAgo5 = moment().subtract(5, 'days').startOf('day');
            let monthsAgo1 = moment().subtract(1, 'months');
            let monthsAgo3 = moment().subtract(3, 'months');
            let monthsAgo6 = moment().subtract(6, 'months');
            let today = moment().startOf('day');
            let startOfYear = moment().startOf('year');
            let yearsAgo1 = moment().subtract(1, 'years');

            switch(range) {
                case 'ALL':
                    inRangePositions = [];
                    positions.forEach((item) => {
                            inRangePositions.push(item);
                    }) 
                    break;
                case '1Y':
                    positions.forEach((item) => {
                        if (item.close_date > yearsAgo1){
                            inRangePositions.push(item);
                        }
                    }) 
                    break;
                case 'YTD':
                    positions.forEach((item) => {
                        if (item.close_date > startOfYear){
                            inRangePositions.push(item);
                        }
                    }) 
                    break;
                case '6M':
                    positions.forEach((item) => {
                        if (item.close_date > monthsAgo6){
                            inRangePositions.push(item);
                        }
                    }) 
                    break;
                case '3M':
                    positions.forEach((item) => {
                        if (item.close_date > monthsAgo3){
                            inRangePositions.push(item);
                        }
                    }) 
                    break;
                case '1M':
                    positions.forEach((item) => {
                        if (item.close_date > monthsAgo1){
                            inRangePositions.push(item);
                        }
                    }) 
                    break;
                case '5D':
                    positions.forEach((item) => {
                        if (item.close_date > daysAgo5){
                            inRangePositions.push(item);
                        }
                    }) 
                    break;
            }


            let totalBought = 0;
            let totalSold = 0;
            let totalProfit = 0;
            let totalProfitPercentage = 0;

            inRangePositions.forEach(element => {
                totalBought += Number(element.purchase_price) * Number(element.close_num_of_shares) + Number(element.purchase_fees);
                totalSold += Number(element.close_price) * Number(element.close_num_of_shares) - Number(element.close_brokerage_fees);
            });
            totalProfit = totalSold-totalBought;
            totalProfitPercentage = totalProfit/totalBought;

            return {
                "total-bought": totalBought,
                "total-sold": totalSold,
                "total-profit": totalProfit,
                "total-profit-percentage": totalProfitPercentage
            }  
        })
        return RSVP.hash({
            positions: closedPositions,
            totals: totals,
            dateRanges: ['5D', '1M', '3M', '6M', 'YTD', '1Y', 'ALL']        
        })
    }
});
