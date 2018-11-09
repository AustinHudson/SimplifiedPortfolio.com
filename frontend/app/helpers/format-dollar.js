import { helper } from '@ember/component/helper';

export function formatDollar(params/*, hash*/) {
  params = parseFloat(params).toFixed(2);
  return Number(params).toLocaleString();
}

export default helper(formatDollar);
