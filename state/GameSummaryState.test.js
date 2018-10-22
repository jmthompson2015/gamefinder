import GameSummaryState from "./GameSummaryState.js";

QUnit.module("GameSummaryState");

const PROPS = ["id", "title"];

const createTestState = () => GameSummaryState.create({ id: 1, title: 2 });

QUnit.test("create()", assert => {
  // Run.
  const summary = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(summary[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const summary = createTestState();

  // Run / Verify.
  try {
    summary.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const GameSummaryStateTest = {};
export default GameSummaryStateTest;
