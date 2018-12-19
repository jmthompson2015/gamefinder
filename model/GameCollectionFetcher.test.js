import GameCollectionFetcher from "./GameCollectionFetcher.js";

QUnit.module("GameCollectionFetcher");

QUnit.test("fetchData() ghightshoe", assert => {
  // Setup.
  const username0 = "ghightshoe";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0).then(({ userId, gameIds }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(userId);
    assert.equal(userId, 1);
    assert.ok(gameIds);
    const length = 39;
    assert.equal(gameIds.length, length);
    assert.equal(gameIds[0], 74);
    assert.equal(gameIds[length - 1], 247030);
    done();
  });
});

QUnit.test("fetchData() jmthompson", assert => {
  // Setup.
  const username0 = "jmthompson";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0).then(({ userId, gameIds }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(userId);
    assert.equal(userId, 2);
    assert.ok(gameIds);
    const length = 177;
    assert.equal(gameIds.length, length);
    assert.equal(gameIds[0], 1198);
    assert.equal(gameIds[length - 1], 246718);
    done();
  });
});

QUnit.test("fetchData() kmistr", assert => {
  // Setup.
  const username0 = "kmistr";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0).then(({ userId, gameIds }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(userId);
    assert.equal(userId, 3);
    assert.ok(gameIds);
    const length = 40;
    assert.equal(gameIds.length, length);
    assert.equal(gameIds[0], 13);
    assert.equal(gameIds[length - 1], 220653);
    done();
  });
});

const GameCollectionFetcherTest = {};
export default GameCollectionFetcherTest;
