import ActionCreator from "./ActionCreator.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";

QUnit.module("Selector");

const createGameDetails = () => [
  { id: 1406, title: "Monopoly (1933)", boardGameRank: 16250 },
  { id: 181, title: "Risk (1959)", boardGameRank: 15588 }
];

const createGameSummaries = () => [
  { id: 1406, title: "Monopoly (1933)", boardGameRank: 16265 },
  { id: 181, title: "Risk (1959)", boardGameRank: 15588 }
];

const GAME_IDS_1 = Immutable([1406, 169786]);

const GAME_IDS_2 = Immutable([181, 162886]);

const verifyGameIds = (assert, gameIds, length, idFirst, idLast) => {
  assert.equal(gameIds.length, length);
  assert.equal(gameIds[0], idFirst);
  assert.equal(typeof gameIds[0], "number");
  assert.equal(gameIds[length - 1], idLast);
  assert.equal(typeof gameIds[length - 1], "number");
};

QUnit.test("actualDetailCount()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  const newGameDetails = createGameDetails();
  store.dispatch(ActionCreator.addUserCollection(1, GAME_IDS_1));
  store.dispatch(ActionCreator.addUserCollection(2, GAME_IDS_2));
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));
  store.dispatch(ActionCreator.addGameDetails(newGameDetails));

  // Run.
  const result = Selector.actualDetailCount(store.getState());

  // Verify.
  assert.equal(result, 2);
});

QUnit.test("actualSummaryCount()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  store.dispatch(ActionCreator.addUserCollection(1, GAME_IDS_1));
  store.dispatch(ActionCreator.addUserCollection(2, GAME_IDS_2));
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));

  // Run.
  const result = Selector.actualSummaryCount(store.getState());

  // Verify.
  assert.equal(result, 2);
});

QUnit.test("boardGameRank() Monopoly", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  const newGameDetails = createGameDetails();
  store.dispatch(ActionCreator.addUserCollection(1, GAME_IDS_1));
  store.dispatch(ActionCreator.addUserCollection(2, GAME_IDS_2));
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));
  store.dispatch(ActionCreator.addGameDetails(newGameDetails));
  const gameId = 1406;

  // Run.
  const result = Selector.boardGameRank(store.getState(), gameId);

  // Verify.
  assert.equal(result, 16265);
});

QUnit.test("boardGameRank() Risk", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  const newGameDetails = createGameDetails();
  store.dispatch(ActionCreator.addUserCollection(1, GAME_IDS_1));
  store.dispatch(ActionCreator.addUserCollection(2, GAME_IDS_2));
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));
  store.dispatch(ActionCreator.addGameDetails(newGameDetails));
  const gameId = 181;

  // Run.
  const result = Selector.boardGameRank(store.getState(), gameId);

  // Verify.
  assert.equal(result, 15588);
});

QUnit.test("expectedDetailCount()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  const newGameDetails = createGameDetails();
  store.dispatch(ActionCreator.addUserCollection(1, GAME_IDS_1));
  store.dispatch(ActionCreator.addUserCollection(2, GAME_IDS_2));
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));
  store.dispatch(ActionCreator.addGameDetails(newGameDetails));

  // Run.
  const result = Selector.expectedDetailCount(store.getState());

  // Verify.
  assert.equal(result, 4);
});

QUnit.test("expectedSummaryCount()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  store.dispatch(ActionCreator.addUserCollection(1, GAME_IDS_1));
  store.dispatch(ActionCreator.addUserCollection(2, GAME_IDS_2));
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));

  // Run.
  const result = Selector.expectedSummaryCount(store.getState());

  // Verify.
  assert.equal(result, 500);
});

QUnit.test("gameIdsFromCollections()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  store.dispatch(ActionCreator.addUserCollection(1, GAME_IDS_1));
  store.dispatch(ActionCreator.addUserCollection(2, GAME_IDS_2));

  // Run.
  const result = Selector.gameIdsFromCollections(store.getState());

  // Verify.
  assert.ok(result);
  verifyGameIds(assert, result, 4, 181, 169786);
});

QUnit.test("gameIdsFromCollectionsAndSummaries()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));
  store.dispatch(ActionCreator.addUserCollection(1, GAME_IDS_1));
  store.dispatch(ActionCreator.addUserCollection(2, GAME_IDS_2));

  // Run.
  const result = Selector.gameIdsFromCollectionsAndSummaries(store.getState());

  // Verify.
  assert.ok(result);
  verifyGameIds(assert, result, 4, 181, 169786);
});

QUnit.test("gameIdsFromSummaries()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));

  // Run.
  const result = Selector.gameIdsFromSummaries(store.getState());

  // Verify.
  assert.ok(result);
  verifyGameIds(assert, result, 2, 181, 1406);
});

QUnit.test("gameSummary()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));
  const id = 1406; // Monopoly

  // Run.
  const result = Selector.gameSummary(store.getState(), id);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, id);
  assert.equal(result.title, "Monopoly (1933)");
});

QUnit.test("isCollectionsLoaded()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.isCollectionsLoaded(store.getState());

  // Verify.
  assert.ok(!result);
});

QUnit.test("isDetailsLoaded()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const page = 1;
  const newGameSummaries = createGameSummaries();
  store.dispatch(ActionCreator.addGameSummaries(page, newGameSummaries));

  // Run.
  const result = Selector.isDetailsLoaded(store.getState());

  // Verify.
  assert.ok(!result);
});

QUnit.test("isSummariesLoaded()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.isSummariesLoaded(store.getState());

  // Verify.
  assert.ok(!result);
});

QUnit.test("pageCount()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.pageCount(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, 5);
});

const SelectorTest = {};
export default SelectorTest;
