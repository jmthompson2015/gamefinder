import User from "./User.js";

QUnit.module("User");

QUnit.test("User properties ghightshoe", assert => {
  // Setup.
  const id = 1;

  // Run.
  const mechanic = User[id];

  // Verify.
  assert.equal(mechanic.id, id);
  assert.equal(mechanic.name, "ghightshoe");
});

QUnit.test("User keys", assert => {
  // Setup.
  const length = 3;

  // Run.
  const keys = Object.keys(User);

  // Verify.
  assert.equal(keys.length, length);

  const mechanic0 = User[keys[0]];
  assert.equal(mechanic0.id, 1);
  assert.equal(mechanic0.name, "ghightshoe");

  const mechanicLast = User[keys[length - 1]];
  assert.equal(mechanicLast.id, 3);
  assert.equal(mechanicLast.name, "kmistr");
});

const UserTest = {};
export default UserTest;
