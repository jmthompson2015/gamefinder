import User from "./User.js";

QUnit.module("User");

QUnit.test("User properties ghightshoe", (assert) => {
  // Setup.
  const id = 1;

  // Run.
  const user = User[id];

  // Verify.
  assert.equal(user.id, id);
  assert.equal(user.name, "ghightshoe");
});

QUnit.test("User keys", (assert) => {
  // Setup.

  // Run.
  const keys = Object.keys(User);

  // Verify.
  assert.equal(keys.length, 5);

  const user0 = User[R.head(keys)];
  assert.equal(user0.id, 1);
  assert.equal(user0.name, "ghightshoe");

  const userLast = User[R.last(keys)];
  assert.equal(userLast.id, 5);
  assert.equal(userLast.name, "BoardGameArena");
});

const UserTest = {};
export default UserTest;
