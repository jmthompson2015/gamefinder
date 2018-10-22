import GameDataState from "./GameDataState.js";
import GameDetailState from "./GameDetailState.js";
import GameSummaryState from "./GameSummaryState.js";

QUnit.module("GameDataState");

const PROPS = ["id", "title"];

const createTestState = () => {
  const gameSummary = GameSummaryState.create({ id: 1 });
  const gameDetail = GameDetailState.create({ id: 1, title: 2 });
  const usernames = [];
  return GameDataState.create({ gameSummary, gameDetail, usernames });
};

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

const GameDataStateTest = {};
export default GameDataStateTest;
