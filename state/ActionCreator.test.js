import ActionCreator from "./ActionCreator.js";
import ActionType from "./ActionType.js";

QUnit.module("ActionCreator");

QUnit.test("all action types", (assert) => {
  // Setup.
  const actionTypeKeys = Object.getOwnPropertyNames(ActionType);
  assert.equal(actionTypeKeys.length, 11);

  // Run / Verify.
  actionTypeKeys.forEach((key) => {
    assert.ok(
      ActionCreator[ActionType[key]],
      `actionType = ${key} ${ActionType[key]}`
    );
  });
});

QUnit.test("addGameDetails()", (assert) => {
  // Setup.
  const gameDetails = 3;

  // Run.
  const result = ActionCreator.addGameDetails(gameDetails);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_GAME_DETAILS);
  assert.equal(result.gameDetails, gameDetails);
});

QUnit.test("addGameSummaries()", (assert) => {
  // Setup.
  const page = 2;
  const gameSummaries = 3;

  // Run.
  const result = ActionCreator.addGameSummaries(page, gameSummaries);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_GAME_SUMMARIES);
  assert.equal(result.page, page);
  assert.equal(result.gameSummaries, gameSummaries);
});

QUnit.test("addUserCollection()", (assert) => {
  // Setup.
  const userId = 3;
  const gameIds = 4;

  // Run.
  const result = ActionCreator.addUserCollection(userId, gameIds);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_USER_COLLECTION);
  assert.equal(result.userId, userId);
  assert.equal(result.gameIds, gameIds);
});

QUnit.test("setCollectionTime()", (assert) => {
  // Setup.
  const time = 3;

  // Run.
  const result = ActionCreator.setCollectionTime(time);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_COLLECTION_TIME);
  assert.equal(result.time, time);
});

QUnit.test("setDetailTime()", (assert) => {
  // Setup.
  const time = 3;

  // Run.
  const result = ActionCreator.setDetailTime(time);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_DETAIL_TIME);
  assert.equal(result.time, time);
});

QUnit.test("setPageCount()", (assert) => {
  // Setup.
  const pageCount = 3;

  // Run.
  const result = ActionCreator.setPageCount(pageCount);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_PAGE_COUNT);
  assert.equal(result.pageCount, pageCount);
});

QUnit.test("setSummaryTime()", (assert) => {
  // Setup.
  const time = 3;

  // Run.
  const result = ActionCreator.setSummaryTime(time);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_SUMMARY_TIME);
  assert.equal(result.time, time);
});

const ActionCreatorTest = {};
export default ActionCreatorTest;
