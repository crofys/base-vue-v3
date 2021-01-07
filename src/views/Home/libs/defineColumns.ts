const filterColumns = (models: any, columns: any[]) => {
  return columns.map(column => {
    return {
      "v-model": [models[column.key], "value"],
      ...column,
    };
  });
};

export function defineColumns(models: any, columns: any[]) {
  return filterColumns(models, columns);
}
