import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import Reducer from "./Reducer.js";

QUnit.module("Reducer");

const createGameDetailMap = () => {
  const answer = {};

  answer[1406] = {
    id: 1406,
    title: "Monopoly (1933)",
    minPlayers: 2,
    maxPlayers: 8,
    categoryIds: [],
    designerIds: [],
    mechanicIds: []
  };
  answer[181] = {
    id: 181,
    title: "Risk (1959)",
    minPlayers: 2,
    maxPlayers: 6,
    categoryIds: [],
    designerIds: [],
    mechanicIds: []
  };

  return answer;
};

const createGameSummaryMap = () => {
  const answer = {};

  answer[1406] = { id: 1406, title: "Monopoly (1933)" };
  answer[181] = { id: 181, title: "Risk (1959)" };

  return answer;
};

QUnit.test("addGameDetails()", assert => {
  // Setup.
  let state = AppState.create();
  const gameSummaryMap = createGameSummaryMap();
  const action1 = ActionCreator.addGameSummaries(gameSummaryMap);
  state = Reducer.root(state, action1);
  assert.equal(Object.values(state.gameSummaryMap).length, 2);
  const gameToDetail = createGameDetailMap();
  assert.equal(Object.values(state.gameToDetail).length, 0);
  const action = ActionCreator.addGameDetails(gameToDetail);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(Object.values(result.gameToDetail).length, 2, "gameToDetail length");
  assert.equal(Object.values(result.gameDataMap).length, 2, "gameDataMap length");
  assert.equal(result.filteredTableRows.length, 2, "filteredTableRows length");
});

QUnit.test("addGameSummaries()", assert => {
  // Setup.
  const state = AppState.create();
  const length = 0;
  assert.equal(Object.keys(state.gameSummaryMap).length, length);
  const gameSummaryMap = createGameSummaryMap();
  const action = ActionCreator.addGameSummaries(gameSummaryMap);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result.gameSummaryMap).length, length + 2);
});

QUnit.test("addUserCollection()", assert => {
  // Setup.
  const state = AppState.create();
  const length = 0;
  assert.equal(Object.keys(state.gameToUsers).length, length);
  const userId = 2;
  const gameIds = [1406, 181];
  const action = ActionCreator.addUserCollection(userId, gameIds);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result.gameToUsers).length, length + 2);
});

QUnit.test("setPageCount()", assert => {
  // Setup.
  const state = AppState.create();
  assert.equal(state.pageCount, 5);
  const pageCount = 5;
  const action = ActionCreator.setPageCount(pageCount);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.pageCount, pageCount);
});

const ReducerTest = {};
export default ReducerTest;
