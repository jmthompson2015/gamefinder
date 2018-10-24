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
    const { gameToUsers, gameToDetail, gameToSummary } = store.getState();
    assert.ok(gameToUsers);
    assert.equal(Object.keys(gameToUsers).length, 240);
    assert.ok(gameToSummary);
    assert.equal(Object.keys(gameToSummary).length, 200);
    assert.ok(gameToDetail);
    assert.equal(Object.keys(gameToDetail).length, 200);
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
  GameLoader.loadGameSummaries(store).then(gameToSummary => {
    assert.ok(true, "test resumed from async operation");
    assert.ok(gameToSummary);

    // Run.
    const done = assert.async();
    GameLoader.loadGameDetails(store, gameToSummary).then(gameToDetail => {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.ok(gameToDetail);

      assert.equal(Object.keys(gameToDetail).length, 100);
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
  GameLoader.loadGameSummaries(store).then(gameToSummary => {
    // Verify.
    assert.ok(true, "summaryCallback() test resumed from async operation");
    assert.ok(gameToSummary);
    assert.equal(Object.keys(gameToSummary).length, 200);
    done();
  });
});

const GameLoaderTest = {};
export default GameLoaderTest;
