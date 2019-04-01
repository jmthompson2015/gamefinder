import User from "./User.js";

QUnit.module("User");

QUnit.test("User properties ghightshoe", assert => {
  // Setup.
  const id = 1;

  // Run.
  const user = User[id];

  // Verify.
  assert.equal(user.id, id);
  assert.equal(user.name, "ghightshoe");
});

QUnit.test("User keys", assert => {
  // Setup.
  const length = 4;

  // Run.
  const keys = Object.keys(User);

  // Verify.
  assert.equal(keys.length, length);

  const user0 = User[keys[0]];
  assert.equal(user0.id, 1);
  assert.equal(user0.name, "ghightshoe");

  const userLast = User[keys[length - 1]];
  assert.equal(userLast.id, 4);
  assert.equal(userLast.name, "nic");
});

const UserTest = {};
export default UserTest;
