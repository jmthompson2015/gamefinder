import GameCollectionState from "./GameCollectionState.js";

QUnit.module("GameCollectionState");

const PROPS = ["userId", "gameIds"];

const createTestState = () => GameCollectionState.create({ userId: 1, gameIds: 2 });

QUnit.test("create()", assert => {
  // Run.
  const collection = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(collection[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const collection = createTestState();

  // Run / Verify.
  try {
    collection.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const GameCollectionStateTest = {};
export default GameCollectionStateTest;
