import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function isPositive(params/*, hash*/) {

  if (parseFloat(params) > 0){
    return htmlSafe(`<p class='is-positive'> ${params} </p>`);
  }
  else {
    return htmlSafe(`<p class='is-negative'> ${params} </p>`);
  }
}

export default helper(isPositive);
