const RangeFilter = {};

RangeFilter.create = ({
  columnKey,
  isMinEnabled = false,
  minValue,
  isMaxEnabled = false,
  maxValue
}) =>
  Immutable({
    columnKey,
    isMinEnabled,
    minValue,
    isMaxEnabled,
    maxValue
  });

Object.freeze(RangeFilter);

export default RangeFilter;
