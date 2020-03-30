import { normalize, schema } from 'normalizr';

export const formatData = type =>
  new schema.Entity(
    'formattedData',
    {},
    {
      idAttribute: '_id',
      processStrategy: value => {
        return {
          ...value,
          type,
          isChecked: false,
        };
      },
    }
  );

export const normalizeData = (type, data) =>
  normalize(data, [formatData(type)]);

export const mergeData = (currentData, newData = {}) => {
  const newDataIds = Object.keys(newData);
  for (let id of newDataIds) {
    if (currentData[id]) {
      newData[id] = {
        ...currentData[id],
        ...newData[id],
      };
    }
  }
  return { ...currentData, ...newData };
};
