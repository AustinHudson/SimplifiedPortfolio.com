import DS from 'ember-data';

export default DS.Model.extend({
    symbol: DS.attr('string'),
    company_name: DS.attr('string'),
    close_date: DS.attr('date'),
    close_price: DS.attr('number'),
    purchase_price: DS.attr('number'),
    purchase_fees: DS.attr('number'),
    close_num_of_shares: DS.attr('number'),
    close_brokerage_fees: DS.attr('number'),
    profit: DS.attr('number'),
    profit_percentage: DS.attr('number'),
});
