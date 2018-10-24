import { helper } from '@ember/component/helper';

export function formatDollar(params/*, hash*/) {
  params = parseFloat(params).toFixed(2);
  return params;
}

export default helper(formatDollar);
