import EntityFilter from "./EntityFilter.js";
import EntityFilterUtils from "./EntityFilterUtilities.js";

QUnit.module("EntityFilterUtilities");

QUnit.test("passes() designers 1", assert => {
  // Setup.
  const columnKey = "designers";
  const values0 = [1, 2];
  const values1 = [3, 4];
  const type = "boardgamedesigner";
  const filter1 = EntityFilter.create({ columnKey, values: values0 });
  const filter2 = EntityFilter.create({ columnKey: "bogus", values: values0 });
  const filter3 = EntityFilter.create({ columnKey, values: values1 });
  const data = {
    designers: [
      {
        type,
        id: 1,
        name: "Alpha"
      }
    ]
  };

  // Run / Verify.
  assert.ok(EntityFilterUtils.passes(filter1, data), "filter1");
  assert.ok(!EntityFilterUtils.passes(filter2, data), "filter2");
  assert.ok(!EntityFilterUtils.passes(filter3, data), "filter3");
});

QUnit.test("passes() designers 2", assert => {
  // Setup.
  const columnKey = "designers";
  const values0 = [1, 2];
  const values1 = [3, 4];
  const type = "boardgamedesigner";
  const filter1 = EntityFilter.create({ columnKey, values: values0 });
  const filter2 = EntityFilter.create({ columnKey: "bogus", values: values0 });
  const filter3 = EntityFilter.create({ columnKey, values: values1 });
  const filter4 = EntityFilter.create({ columnKey, values: [] });
  const data = {
    designers: [
      {
        type,
        id: 1,
        name: "Alpha"
      },
      {
        type,
        id: 5,
        name: "Echo"
      }
    ]
  };

  // Run / Verify.
  assert.ok(EntityFilterUtils.passes(filter1, data), "filter1");
  assert.ok(!EntityFilterUtils.passes(filter2, data), "filter2");
  assert.ok(!EntityFilterUtils.passes(filter3, data), "filter3");
  assert.ok(EntityFilterUtils.passes(filter4, data), "filter4");
});

QUnit.test("toString()", assert => {
  // Setup.
  const columnKey = "designers";
  const values = [1, 2];
  const filter = EntityFilter.create({ columnKey, values });

  // Run.
  const result = EntityFilterUtils.toString(filter);

  // Verify.
  assert.ok(result);
  assert.equal(result, "EntityFilter (designers in [1,2])");
});

const EntityFilterUtilitiesTest = {};
export default EntityFilterUtilitiesTest;
