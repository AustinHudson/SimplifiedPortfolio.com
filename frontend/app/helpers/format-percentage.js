import { helper } from '@ember/component/helper';

export function formatPercentage(params/*, hash*/) {
  console.log('helper params:', params);
  params = parseFloat(params).toFixed(2);

  return `${params}%`;
}

export default helper(formatPercentage);
