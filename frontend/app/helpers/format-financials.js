import { helper } from '@ember/component/helper';

export function formatFinancials(x/*, hash*/) {

    

    if(isNaN(x)) return x;

    if(x < -1000000000000) {
      return (x/1000000000).toFixed(2) + " B";
    }

    if(x < -1000000000) {
      return Math.round((x/1000000)) + " M";
    }

    if( x < -10000000) {
      return (x/1000000).toFixed(2) + " M";
    }

    if(x < -1000000) {
      return Math.round(x/1000) + " K";
    }

    if(x < 9999) {
      return x;
    }
  
    if(x < 1000000) {
      return Math.round(x/1000) + " K";
    }
    
    if( x < 10000000) {
      return (x/1000000).toFixed(2) + " M";
    }
  
    if(x < 1000000000) {
      return Math.round((x/1000000)) + " M";
    }
  
    if(x < 1000000000000) {
      return (x/1000000000).toFixed(2) + " B";
    }
  
    return "1T+";
}

export default helper(formatFinancials);
