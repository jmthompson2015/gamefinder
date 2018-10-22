import EntityFilter from "./EntityFilter.js";

QUnit.module("EntityFilter");

QUnit.test("EntityFilter()", assert => {
  // Setup.
  const columnKey = "id";
  const values = [1, 2];

  // Run.
  const result = EntityFilter.create({ columnKey, values });

  // Verify.
  assert.ok(result);
  assert.equal(result.columnKey, columnKey);
  assert.equal(result.values.join(), values.join());
});

const EntityFilterTest = {};
export default EntityFilterTest;
