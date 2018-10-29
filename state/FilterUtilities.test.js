import User from "../artifact/User.js";

import EntityFilter from "./EntityFilter.js";
import FilterUtils from "./FilterUtilities.js";
import RangeFilter from "./RangeFilter.js";

QUnit.module("FilterUtilities");

QUnit.test("isEntityFilter()", assert => {
  // Setup.
  const columnKey = "usernames";
  const values = ["ghightshoe", "jmthompson"];
  const filter = EntityFilter.create({ columnKey, values });

  // Run.
  const result = FilterUtils.isEntityFilter(filter);

  // Verify.
  assert.equal(result, true);
});

QUnit.test("isEntityFilter() undefined", assert => {
  // Setup.

  // Run.
  const result = FilterUtils.isEntityFilter(undefined);

  // Verify.
  assert.equal(result, false);
});

QUnit.test("isRangeFilter()", assert => {
  // Setup.
  const columnKey = "geekRating";
  const filter = RangeFilter.create({ columnKey, minValue: 1, maxValue: 10 });

  // Run.
  const result = FilterUtils.isRangeFilter(filter);

  // Verify.
  assert.equal(result, true);
});

QUnit.test("isRangeFilter() undefined", assert => {
  // Setup.

  // Run.
  const result = FilterUtils.isRangeFilter(undefined);

  // Verify.
  assert.equal(result, false);
});

QUnit.test("passes() Entity Filter", assert => {
  // Setup.
  const columnKey = "usernames";
  const values = [1, 2];
  const filter = EntityFilter.create({ columnKey, values });
  const data1 = { usernames: [User[1]] };
  const data2 = { usernames: [User[2]] };
  const data3 = { usernames: [User[3]] };

  // Run / Verify.
  assert.equal(FilterUtils.passes(filter, data1), true);
  assert.equal(FilterUtils.passes(filter, data2), true);
  assert.equal(FilterUtils.passes(filter, data3), false);
});

QUnit.test("passes() Range Filter", assert => {
  // Setup.
  const columnKey = "geekRating";
  const filter = RangeFilter.create({
    columnKey,
    isMinEnabled: true,
    minValue: 1,
    maxValue: 10,
    isMaxEnabled: true
  });
  const data1 = { geekRating: 5 };
  const data2 = { geekRating: 10 };
  const data3 = { geekRating: 11 };

  // Run / Verify.
  assert.equal(FilterUtils.passes(filter, data1), true);
  assert.equal(FilterUtils.passes(filter, data2), true);
  assert.equal(FilterUtils.passes(filter, data3), false);
});

QUnit.test("passesAll()", assert => {
  // Setup.
  const columnKey1 = "usernames";
  const values = [1, 2];
  const filter1 = EntityFilter.create({ columnKey: columnKey1, values });
  const columnKey2 = "geekRating";
  const filter2 = RangeFilter.create({
    columnKey: columnKey2,
    isMinEnabled: true,
    minValue: 1,
    maxValue: 10,
    isMaxEnabled: true
  });
  const filters = R.reduce((accum, filter) => R.assoc(filter.columnKey, filter, accum), {}, [
    filter1,
    filter2
  ]);
  const data1 = { usernames: [User[1]], geekRating: 5 };
  const data2 = { usernames: [User[2]], geekRating: 5 };
  const data3 = { usernames: [User[3]], geekRating: 5 };
  const data4 = { usernames: [User[1]], geekRating: 10 };
  const data5 = { usernames: [User[2]], geekRating: 10 };
  const data6 = { usernames: [User[3]], geekRating: 10 };
  const data7 = { usernames: [User[1]], geekRating: 11 };
  const data8 = { usernames: [User[2]], geekRating: 11 };
  const data9 = { usernames: [User[3]], geekRating: 11 };

  // Run / Verify.
  assert.equal(FilterUtils.passesAll(filters, data1), true);
  assert.equal(FilterUtils.passesAll(filters, data2), true);
  assert.equal(FilterUtils.passesAll(filters, data3), false);
  assert.equal(FilterUtils.passesAll(filters, data4), true);
  assert.equal(FilterUtils.passesAll(filters, data5), true);
  assert.equal(FilterUtils.passesAll(filters, data6), false);
  assert.equal(FilterUtils.passesAll(filters, data7), false);
  assert.equal(FilterUtils.passesAll(filters, data8), false);
  assert.equal(FilterUtils.passesAll(filters, data9), false);
});

const FilterUtilitiesTest = {};
export default FilterUtilitiesTest;
