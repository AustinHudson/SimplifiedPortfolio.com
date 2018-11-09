import DS from 'ember-data';

export default DS.Model.extend({
    followed_stocks: DS.attr(),
    positions: DS.hasMany('position', { async: true, invese: null }),
    closed_positions: DS.hasMany('closed-position', {async: true, inverse: null })
})
   
