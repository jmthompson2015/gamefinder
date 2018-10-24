import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";

import GameLoader from "./GameLoader.js";

QUnit.module("GameLoader");

QUnit.test("load()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  store.dispatch(ActionCreator.setPageCount(2));

  // Run.
  const done = assert.async();
  GameLoader.load(store).then(() => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    const { gameToUsers, gameDetailMap, gameSummaryMap } = store.getState();
    assert.ok(gameToUsers);
    assert.equal(Object.keys(gameToUsers).length, 240);
    assert.ok(gameSummaryMap);
    assert.equal(Object.keys(gameSummaryMap).length, 200);
    assert.ok(gameDetailMap);
    assert.equal(Object.keys(gameDetailMap).length, 200);
    done();
  });
});

QUnit.test("loadCollections()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const done = assert.async();
  GameLoader.loadCollections(store).then(() => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    const { gameToUsers } = store.getState();
    assert.ok(gameToUsers);
    assert.equal(Object.keys(gameToUsers).length, 240);
    done();
  });
});

QUnit.test("loadGameDetails()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  store.dispatch(ActionCreator.setPageCount(1));

  // Run.
  const done2 = assert.async();
  GameLoader.loadGameSummaries(store).then(gameSummaryMap => {
    assert.ok(true, "test resumed from async operation");
    assert.ok(gameSummaryMap);

    // Run.
    const done = assert.async();
    GameLoader.loadGameDetails(store, gameSummaryMap).then(gameDetailMap => {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.ok(gameDetailMap);

      assert.equal(Object.keys(gameDetailMap).length, 100);
      done();
      done2();
    });
  });
});

QUnit.test("loadGameSummaries()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  store.dispatch(ActionCreator.setPageCount(2));

  // Run.
  const done = assert.async();
  GameLoader.loadGameSummaries(store).then(gameSummaryMap => {
    // Verify.
    assert.ok(true, "summaryCallback() test resumed from async operation");
    assert.ok(gameSummaryMap);
    assert.equal(Object.keys(gameSummaryMap).length, 200);
    done();
  });
});

const GameLoaderTest = {};
export default GameLoaderTest;
