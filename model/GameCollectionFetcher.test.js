import GameCollectionFetcher from "./GameCollectionFetcher.js";

QUnit.module("GameCollectionFetcher");

QUnit.test("fetchData() BoardGameArena", (assert) => {
  // Setup.
  const username0 = "BoardGameArena";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0).then(({ userId, gameIds }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(userId);
    assert.equal(userId, 4);
    assert.ok(gameIds);
    assert.equal(gameIds.length, 250);
    assert.equal(R.head(gameIds), 10);
    assert.equal(R.last(gameIds), 310888);
    done();
  });
});

QUnit.test("fetchData() ghightshoe", (assert) => {
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
    assert.equal(gameIds.length, 42);
    assert.equal(R.head(gameIds), 74);
    assert.equal(R.last(gameIds), 255681);
    done();
  });
});

QUnit.test("fetchData() jmthompson", (assert) => {
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
    assert.equal(gameIds.length, 203);
    assert.equal(R.head(gameIds), 1198);
    assert.equal(R.last(gameIds), 284444);
    done();
  });
});

QUnit.test("fetchData() kmistr", (assert) => {
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
    assert.equal(gameIds.length, 46);
    assert.equal(R.head(gameIds), 13);
    assert.equal(R.last(gameIds), 312667);
    done();
  });
});

QUnit.test("fetchData() nic", (assert) => {
  // Setup.
  const username0 = "nic";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0).then(({ userId, gameIds }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(userId);
    assert.equal(userId, 5);
    assert.ok(gameIds);
    assert.equal(gameIds.length, 11);
    assert.equal(R.head(gameIds), 124361);
    assert.equal(R.last(gameIds), 269595);
    done();
  });
});

const GameCollectionFetcherTest = {};
export default GameCollectionFetcherTest;
