import cloneDeep from 'lodash.clonedeep/index';

function prepData(data) {
  const preppedData = cloneDeep(data);
  preppedData.map(el => delete el.rows);
  preppedData.columns = cloneDeep(data.columns).filter((d, i) => i !== 0);

  return preppedData;
}

export default prepData;
