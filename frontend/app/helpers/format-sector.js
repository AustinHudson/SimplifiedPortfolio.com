import { helper } from '@ember/component/helper';

export function formatSector(params/*, hash*/) {

  params = (parseFloat(params)*100).toFixed(2);

  return `${params}%`;
  
}

export default helper(formatSector);
