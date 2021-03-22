import Mechanic from "./Mechanic.js";

QUnit.module("Mechanic");

QUnit.test("Mechanic properties Tile Placement", (assert) => {
  // Setup.
  const id = 2002;

  // Run.
  const mechanic = Mechanic[id];

  // Verify.
  assert.equal(mechanic.id, id);
  assert.equal(mechanic.name, "Tile Placement");
});

QUnit.test("Mechanic keys", (assert) => {
  // Setup.

  // Run.
  const keys = Object.keys(Mechanic);

  // Verify.
  assert.equal(keys.length, 176);

  const mechanic0 = Mechanic[R.head(keys)];
  assert.equal(mechanic0.id, 2001);
  assert.equal(mechanic0.name, "Action Points");

  const mechanicLast = Mechanic[R.last(keys)];
  assert.equal(mechanicLast.id, 3006);
  assert.equal(mechanicLast.name, "Predictive Bid");
});

const MechanicTest = {};
export default MechanicTest;
