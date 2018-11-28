import Mechanic from "./Mechanic.js";

QUnit.module("Mechanic");

QUnit.test("Mechanic properties Tile Placement", assert => {
  // Setup.
  const id = 2002;

  // Run.
  const mechanic = Mechanic[id];

  // Verify.
  assert.equal(mechanic.id, id);
  assert.equal(mechanic.name, "Tile Placement");
});

QUnit.test("Mechanic keys", assert => {
  // Setup.
  const length = 49;

  // Run.
  const keys = Object.keys(Mechanic);

  // Verify.
  assert.equal(keys.length, length);

  const mechanic0 = Mechanic[keys[0]];
  assert.equal(mechanic0.id, 2001);
  assert.equal(mechanic0.name, "Action Point Allowance System");

  const mechanicLast = Mechanic[keys[length - 1]];
  assert.equal(mechanicLast.id, 2689);
  assert.equal(mechanicLast.name, "Action / Movement Programming");
});

const MechanicTest = {};
export default MechanicTest;
