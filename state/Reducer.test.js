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
    categories: [],
    designers: [],
    mechanics: []
  };
  answer[181] = {
    id: 181,
    title: "Risk (1959)",
    minPlayers: 2,
    maxPlayers: 6,
    categories: [],
    designers: [],
    mechanics: []
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
  const gameDetailMap = createGameDetailMap();
  assert.equal(Object.values(state.gameDetailMap).length, 0);
  const action = ActionCreator.addGameDetails(gameDetailMap);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(Object.values(result.gameDetailMap).length, 2, "gameDetailMap length");
  assert.equal(Object.values(result.gameDataMap).length, 2, "gameDataMap length");
  assert.equal(Object.values(result.filteredGameData).length, 2, "filteredGameData length");
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
  assert.equal(Object.keys(state.gameCollectionMap).length, length);
  const username = "jmthompson";
  const gameIds = [1406, 181];
  const action = ActionCreator.addUserCollection(username, gameIds);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result.gameCollectionMap).length, length + 2);
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