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
    assert.equal(userId, 5);
    assert.ok(gameIds);
    assert.equal(gameIds.length, 756);
    assert.equal(R.head(gameIds), 10);
    assert.equal(R.last(gameIds), 380728);
    done();
  });
});

QUnit.test("fetchData() ghightshoe collection", (assert) => {
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
    assert.equal(gameIds.length, 51);
    assert.equal(R.head(gameIds), 74);
    assert.equal(R.last(gameIds), 317985);
    done();
  });
});

QUnit.test("fetchData() ghightshoe wishlist", (assert) => {
  // Setup.
  const username0 = "ghightshoe";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0, true).then(
    ({ userId, gameIds }) => {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.ok(userId);
      assert.equal(userId, 1);
      assert.ok(gameIds);
      assert.equal(gameIds.length, 6);
      assert.equal(R.head(gameIds), 146508);
      assert.equal(R.last(gameIds), 317985);
      done();
    },
  );
});

QUnit.test("fetchData() jmthompson collection", (assert) => {
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
    assert.equal(gameIds.length, 247);
    assert.equal(R.head(gameIds), 42);
    assert.equal(R.last(gameIds), 364073);
    done();
  });
});

QUnit.test("fetchData() jmthompson wishlist", (assert) => {
  // Setup.
  const username0 = "jmthompson";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0, true).then(
    ({ userId, gameIds }) => {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.ok(userId);
      assert.equal(userId, 2);
      assert.ok(gameIds);
      assert.equal(gameIds.length, 9);
      assert.equal(R.head(gameIds), 823);
      assert.equal(R.last(gameIds), 376373);
      done();
    },
  );
});

QUnit.test("fetchData() kmistr collection", (assert) => {
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
    assert.equal(gameIds.length, 54);
    assert.equal(R.head(gameIds), 13);
    assert.equal(R.last(gameIds), 312667);
    done();
  });
});

QUnit.test("fetchData() kmistr wishlist", (assert) => {
  // Setup.
  const username0 = "kmistr";

  // Run.
  const done = assert.async();
  GameCollectionFetcher.fetchData(username0, true).then(
    ({ userId, gameIds }) => {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.ok(userId);
      assert.equal(userId, 3);
      assert.ok(gameIds);
      assert.equal(gameIds.length, 22);
      assert.equal(R.head(gameIds), 13004);
      assert.equal(R.last(gameIds), 356414);
      done();
    },
  );
});

const GameCollectionFetcherTest = {};
export default GameCollectionFetcherTest;
