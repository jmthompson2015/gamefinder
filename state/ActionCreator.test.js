import ActionCreator from "./ActionCreator.js";
import ActionType from "./ActionType.js";

QUnit.module("ActionCreator");

QUnit.test("all action types", assert => {
  // Setup.
  const actionTypeKeys = Object.getOwnPropertyNames(ActionType);
  assert.equal(actionTypeKeys.length, 10);

  // Run / Verify.
  actionTypeKeys.forEach(key => {
    assert.ok(ActionCreator[ActionType[key]], `actionType = ${key} ${ActionType[key]}`);
  });
});

QUnit.test("addGameDetails()", assert => {
  // Setup.
  const gameToDetail = 3;

  // Run.
  const result = ActionCreator.addGameDetails(gameToDetail);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_GAME_DETAILS);
  assert.equal(result.gameToDetail, gameToDetail);
});

QUnit.test("addGameSummaries()", assert => {
  // Setup.
  const gameSummaryMap = 3;

  // Run.
  const result = ActionCreator.addGameSummaries(gameSummaryMap);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_GAME_SUMMARIES);
  assert.equal(result.gameSummaryMap, gameSummaryMap);
});

QUnit.test("addUserCollection()", assert => {
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

QUnit.test("removeFilters()", assert => {
  // Setup.

  // Run.
  const result = ActionCreator.removeFilters();

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.REMOVE_FILTERS);
});

QUnit.test("setCollectionTime()", assert => {
  // Setup.
  const time = 3;

  // Run.
  const result = ActionCreator.setCollectionTime(time);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_COLLECTION_TIME);
  assert.equal(result.time, time);
});

QUnit.test("setDefaultFilters()", assert => {
  // Setup.

  // Run.
  const result = ActionCreator.setDefaultFilters();

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_DEFAULT_FILTERS);
});

QUnit.test("setDetailTime()", assert => {
  // Setup.
  const time = 3;

  // Run.
  const result = ActionCreator.setDetailTime(time);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_DETAIL_TIME);
  assert.equal(result.time, time);
});

QUnit.test("setFilters()", assert => {
  // Setup.
  const filters = 3;

  // Run.
  const result = ActionCreator.setFilters(filters);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_FILTERS);
  assert.equal(result.filters, filters);
});

QUnit.test("setPageCount()", assert => {
  // Setup.
  const pageCount = 3;

  // Run.
  const result = ActionCreator.setPageCount(pageCount);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_PAGE_COUNT);
  assert.equal(result.pageCount, pageCount);
});

QUnit.test("setSummaryTime()", assert => {
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
