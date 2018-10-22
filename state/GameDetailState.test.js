import GameDetailState from "./GameDetailState.js";

QUnit.module("GameDetailState");

const PROPS = ["id", "title"];

const createTestState = () => GameDetailState.create({ id: 1, title: 2 });

QUnit.test("create()", assert => {
  // Run.
  const detail = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(detail[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const detail = createTestState();

  // Run / Verify.
  try {
    detail.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const GameDetailStateTest = {};
export default GameDetailStateTest;
