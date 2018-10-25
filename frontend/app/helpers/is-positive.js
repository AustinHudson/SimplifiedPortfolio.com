import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function isPositive(params/*, hash*/) {

  if (parseFloat(params) > 0){
    return htmlSafe(`<div class='is-positive'> ${params} </div>`);
  }
  else {
    return htmlSafe(`<div class='is-negative'> ${params} </div>`);
  }
}

export default helper(isPositive);
