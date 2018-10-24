import ActionCreator from "./ActionCreator.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";

QUnit.module("Selector");

const createGameSummaryMap = () => {
  const answer = {};

  answer[1406] = { id: 1406, title: "Monopoly (1933)" };
  answer[181] = { id: 181, title: "Risk (1959)" };

  return answer;
};

// QUnit.test("findGameUsersByGameId()", assert => {
//   // Setup.
//   const store = Redux.createStore(Reducer.root);
//   // const gameLoader = new GameLoader(store);
//   const id = 161936; // Pandemic Legacy Season 1
//   const done = assert.async();
//   const callback = gameToUsers => {
//     // Verify.
//     assert.equal(Object.values(gameToUsers).length, 240);
//
//     // Run.
//     const result = Selector.findGameUsersByGameId(store.getState(), id);
//
//     // Verify.
//     assert.ok(true, "test resumed from async operation");
//     assert.ok(result);
//     assert.ok(Array.isArray(result));
//     assert.equal(result.length, 1);
//     assert.equal(result[0].name, "ghightshoe");
//     done();
//   };
//
//   // gameLoader.loadCollections(callback);
// });
//
// QUnit.test("findGameDetailById()", assert => {
//   // Setup.
//   const store = Redux.createStore(Reducer.root);
//   store.dispatch(ActionCreator.setPageCount(1));
//   const newGameToSummary = createGameSummaryMap();
//   store.dispatch(ActionCreator.addGameSummaries(newGameToSummary));
//   // const gameLoader = new GameLoader(store);
//   const id = 169786; // Scythe
//
//   const done = assert.async();
//   const callback = gameToDetail => {
//     // Verify.
//     assert.equal(Object.values(gameToDetail).length, 1000);
//
//     // Run.
//     const result = Selector.findGameDetailById(store.getState(), id);
//
//     // Verify.
//     assert.ok(true, "test resumed from async operation");
//     assert.ok(result);
//     assert.equal(result.id, id);
//     assert.equal(result.title, "Scythe");
//     done();
//   };
//
//   // gameLoader.loadGameDetails(newGameToSummary, callback);
// });

QUnit.test("findGameSummaryById()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const newGameToSummary = createGameSummaryMap();
  store.dispatch(ActionCreator.addGameSummaries(newGameToSummary));
  const id = 1406; // Monopoly

  // Run.
  const result = Selector.findGameSummaryById(store.getState(), id);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, id);
  assert.equal(result.title, "Monopoly (1933)");
});

QUnit.test("gameToUsers()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.gameToUsers(store.getState());

  // Verify.
  assert.ok(result);
});

QUnit.test("gameToDetail()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.gameToDetail(store.getState());

  // Verify.
  assert.ok(result);
});

QUnit.test("gameToSummary()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.gameToSummary(store.getState());

  // Verify.
  assert.ok(result);
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
