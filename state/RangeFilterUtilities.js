const RangeFilterUtilities = {};

RangeFilterUtilities.passes = (filter, data) => {
  const value = data[filter.columnKey];

  return (
    (!filter.isMinEnabled || filter.minValue <= value) &&
    (!filter.isMaxEnabled || value <= filter.maxValue)
  );
};

RangeFilterUtilities.toString = filter =>
  `RangeFilter (${filter.isMinEnabled} ${filter.minValue}\u2264${filter.columnKey}\u2264${
    filter.isMaxEnabled
  } ${filter.maxValue})`;

export default RangeFilterUtilities;
