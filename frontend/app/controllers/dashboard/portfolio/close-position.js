import Controller from '@ember/controller';

export default Controller.extend({
    
    queryParams: ['position', 'symbol'],
    position: null,
    symbol: null
});
