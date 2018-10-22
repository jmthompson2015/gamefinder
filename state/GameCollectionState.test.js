import GameCollectionState from "./GameCollectionState.js";

QUnit.module("GameCollectionState");

const PROPS = ["username", "collectionIds"];

const createTestState = () => GameCollectionState.create({ username: 1, collectionIds: 2 });

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
