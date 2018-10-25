import { helper } from '@ember/component/helper';

export function toArray(params/*, hash*/) {

console.log(params);

  return params;
}

export default helper(toArray);
