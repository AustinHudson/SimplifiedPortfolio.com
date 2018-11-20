import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

    actions: {
        excelExport(positions){
            console.log('made it to excel export');
            console.log(positions);



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
        

        let closedPositions = this.store.findRecord('user', this.get('session').get('uid')).then((user) => {

            return user.get('closed_positions').toArray(); 
       })

       let totals =  this.store.findRecord('user', this.get('session').get('uid')).then((user) => {

           return  user.get('closed_positions'); 
        }).then((positions) => {
            let totalBought = 0;
            let totalSold = 0;
            let totalProfit = 0;
            let totalProfitPercentage = 0;

            positions.forEach(element => {
                console.log(element);
                totalBought += Number(element.purchase_price) * Number(element.close_num_of_shares) + Number(element.purchase_fees);
                totalSold += Number(element.close_price) * Number(element.close_num_of_shares) - Number(element.close_brokerage_fees);
            });
            console.log("total bought: " + totalBought);
            console.log("total sold: "  +totalSold);
            totalProfit = totalSold-totalBought;
            console.log("total profit: " + totalProfit);
            totalProfitPercentage = totalProfit/totalBought;
            console.log("total profit percent: " + totalProfitPercentage);

            return {
                "total-bought": totalBought,
                "total-sold": totalSold,
                "total-profit": totalProfit,
                "total-profit-percentage": totalProfitPercentage
            }
            
        })

        return RSVP.hash({
            positions: closedPositions,
            totals: totals
        })
    }
});
