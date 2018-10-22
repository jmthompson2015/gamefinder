import RangeFilter from "./RangeFilter.js";

QUnit.module("RangeFilter");

QUnit.test("RangeFilter()", assert => {
  // Setup.
  const columnKey = "pilotSkill";
  const minValue = 1;
  const maxValue = 10;

  // Run.
  const result = RangeFilter.create({ columnKey, minValue, maxValue });

  // Verify.
  assert.ok(result);
  assert.equal(result.columnKey, columnKey);
  assert.equal(result.isMinEnabled, false);
  assert.equal(result.minValue, minValue);
  assert.equal(result.isMaxEnabled, false);
  assert.equal(result.maxValue, maxValue);
});

const RangeFilterTest = {};
export default RangeFilterTest;
