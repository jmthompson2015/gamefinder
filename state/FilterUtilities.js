import EntityFilterUtils from "./EntityFilterUtilities.js";
import RangeFilterUtils from "./RangeFilterUtilities.js";

const FilterUtilities = {};

FilterUtilities.isEntityFilter = filter => filter !== undefined && filter.values !== undefined;

FilterUtilities.isRangeFilter = filter =>
  filter !== undefined &&
  (filter.isMinEnabled !== undefined ||
    filter.minValue !== undefined ||
    filter.isMaxEnabled !== undefined ||
    filter.maxValue !== undefined);

FilterUtilities.passes = (filter, data) =>
  (FilterUtilities.isEntityFilter(filter) && EntityFilterUtils.passes(filter, data)) ||
  (FilterUtilities.isRangeFilter(filter) && RangeFilterUtils.passes(filter, data));

FilterUtilities.passesAll = (filters, data) => {
  let answer = true;
  const propertyNames = Object.getOwnPropertyNames(filters);

  for (let i = 0; i < propertyNames.length; i += 1) {
    const propertyName = propertyNames[i];
    const filter = filters[propertyName];
    const passes = FilterUtilities.passes(filter, data);

    if (!passes) {
      answer = false;
      break;
    }
  }

  return answer;
};

export default FilterUtilities;
