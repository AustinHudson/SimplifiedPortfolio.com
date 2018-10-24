import { helper } from '@ember/component/helper';

export function currentDate(params/*, hash*/) {

  return new Date();
}

export default helper(currentDate);
