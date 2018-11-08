import DS from 'ember-data';

export default DS.Model.extend({
    symbol: DS.attr('string'),
    purchase_date: DS.attr('date'),
    purchase_price: DS.attr('number'),
    num_of_shares: DS.attr('number'),
    brokerage_fees: DS.attr('number'),
    value_at_purchase: DS.attr('number')
});
