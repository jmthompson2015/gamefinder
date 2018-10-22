import GameCollectionFetcher from "./GameCollectionFetcher.js";

QUnit.module("GameCollectionFetcher");

QUnit.test("fetchData() ghightshoe", assert => {
  // Setup.
  const username0 = "ghightshoe";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0).then(({ username, collectionIds }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(username);
    assert.equal(username, username);
    assert.ok(collectionIds);
    const length = 31;
    assert.equal(collectionIds.length, length);
    assert.equal(collectionIds[0], 74);
    assert.equal(collectionIds[length - 1], 221107);
    done();
  });
});

QUnit.test("fetchData() jmthompson", assert => {
  // Setup.
  const username0 = "jmthompson";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0).then(({ username, collectionIds }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(username);
    assert.equal(username, username);
    assert.ok(collectionIds);
    const length = 177;
    assert.equal(collectionIds.length, length);
    assert.equal(collectionIds[0], 1198);
    assert.equal(collectionIds[length - 1], 246718);
    done();
  });
});

QUnit.test("fetchData() kmistr", assert => {
  // Setup.
  const username0 = "kmistr";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0).then(({ username, collectionIds }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(username);
    assert.equal(username, username);
    assert.ok(collectionIds);
    const length = 34;
    assert.equal(collectionIds.length, length);
    assert.equal(collectionIds[0], 13);
    assert.equal(collectionIds[length - 1], 192951);
    done();
  });
});

const GameCollectionFetcherTest = {};
export default GameCollectionFetcherTest;
