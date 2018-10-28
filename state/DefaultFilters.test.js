import DefaultFilters from "./DefaultFilters.js";
import GameColumns from "./GameColumns.js";

QUnit.module("DefaultFilters");

const verifyEntityFilter = (assert, filter, column, values) => {
  assert.ok(filter);
  assert.equal(filter.columnKey, column.key);
  assert.equal(filter.values.join(), values.join());
};

const verifyRangeFilter = (
  assert,
  filter,
  column,
  { isMinEnabled = false, minValue, isMaxEnabled = false, maxValue }
) => {
  assert.ok(filter);
  assert.equal(filter.columnKey, column.key);
  assert.equal(filter.isMinEnabled, isMinEnabled, `${column.key} isMinEnabled`);
  assert.equal(filter.minValue, minValue, `${column.key} minValue`);
  assert.equal(filter.isMaxEnabled, isMaxEnabled, `${column.key}  isMaxEnabled`);
  assert.equal(filter.maxValue, maxValue, `${column.key} maxValue`);
};

QUnit.test("create()", assert => {
  // Setup.

  // Run.
  const result = DefaultFilters.create();

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 13);

  const entityColumns = [0, 3, 12, 13];
  R.forEach(i => {
    const column = GameColumns[i];
    const filter = result[column.key];
    verifyEntityFilter(assert, filter, column, []);
  }, entityColumns);

  const rangeColumns = [1, 4, 5, 6, 7, 8, 9, 10, 11];
  const isMinEnableds = [false, false, true, false, true, false, true, false, true];
  const minValues = [1, 2007, 7, 2, 4, 3, 30, 30, 1.5];
  const isMaxEnableds = [false, false, false, true, false, false, false, true, true];
  const maxValues = [100, 2017, 10, 3, 6, 4, 90, 90, 3.2];
  R.forEach(i => {
    const column = GameColumns[i];
    const filter = result[column.key];
    const index = rangeColumns.indexOf(i);
    const isMinEnabled = isMinEnableds[index];
    const minValue = minValues[index];
    const maxValue = maxValues[index];
    const isMaxEnabled = isMaxEnableds[index];
    verifyRangeFilter(assert, filter, column, { isMinEnabled, minValue, isMaxEnabled, maxValue });
  }, rangeColumns);
});

const DefaultFiltersTest = {};
export default DefaultFiltersTest;
