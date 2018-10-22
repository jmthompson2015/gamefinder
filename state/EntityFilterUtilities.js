const EntityFilterUtilities = {};

EntityFilterUtilities.passes = (filter, data) => {
  let answer = true;
  const { columnKey, values } = filter;

  if (values.length > 0) {
    const value = data[columnKey];

    if (!value || value.length === 0) {
      answer = false;
    } else {
      answer = false;

      const ids = value.map(v => v.id);

      values.forEach(v => {
        answer = answer || (Array.isArray(value) && ids.includes(v));
      }, this);
    }
  }

  return answer;
};

EntityFilterUtilities.toString = filter =>
  `EntityFilter (${filter.columnKey} in [${filter.values}])`;

Object.freeze(EntityFilterUtilities);

export default EntityFilterUtilities;
