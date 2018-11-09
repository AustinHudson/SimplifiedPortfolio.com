import { helper } from '@ember/component/helper';

export function formatSector(params/*, hash*/) {

  params = Number((parseFloat(params)*100).toFixed(2)).toLocaleString();

  return `${params}%`;
  
}

export default helper(formatSector);
