import RangeFilter from "./RangeFilter.js";
import RangeFilterUtils from "./RangeFilterUtilities.js";

QUnit.module("RangeFilterUtilities");

QUnit.test("passes()", assert => {
  // Setup.
  const columnKey = "pilotSkill";
  const minValue = 1;
  const maxValue = 10;
  const filter1 = RangeFilter.create({ columnKey, minValue, maxValue });
  const filter2 = RangeFilter.create({ columnKey: "bogus", minValue, maxValue });
  const filter3 = RangeFilter.create({ columnKey, isMinEnabled: true, minValue, maxValue });
  const filter4 = RangeFilter.create({ columnKey, minValue: 6, maxValue });
  const filter5 = RangeFilter.create({ columnKey, minValue, isMaxEnabled: true, maxValue });
  const filter6 = RangeFilter.create({ columnKey, minValue, maxValue: 4 });
  const filter7 = RangeFilter.create({ columnKey, isMinEnabled: true, minValue: 6, maxValue });
  const filter8 = RangeFilter.create({ columnKey, minValue, isMaxEnabled: true, maxValue: 4 });
  const data = { pilotSkill: 5 };

  // Run / Verify.
  assert.ok(RangeFilterUtils.passes(filter1, data));
  assert.ok(RangeFilterUtils.passes(filter2, data));
  assert.ok(RangeFilterUtils.passes(filter3, data));
  assert.ok(RangeFilterUtils.passes(filter4, data));
  assert.ok(RangeFilterUtils.passes(filter5, data));
  assert.ok(RangeFilterUtils.passes(filter6, data));

  assert.ok(!RangeFilterUtils.passes(filter7, data));
  assert.ok(!RangeFilterUtils.passes(filter8, data));
});

QUnit.test("toString()", assert => {
  // Setup.
  const columnKey = "pilotSkill";
  const minValue = 1;
  const maxValue = 10;
  const filter = RangeFilter.create({ columnKey, minValue, maxValue });

  // Run.
  const result = RangeFilterUtils.toString(filter);

  // Verify.
  assert.ok(result);
  assert.equal(result, "RangeFilter (false 1≤pilotSkill≤false 10)");
});

const RangeFilterUtilitiesTest = {};
export default RangeFilterUtilitiesTest;
