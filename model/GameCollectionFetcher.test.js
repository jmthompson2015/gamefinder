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
    assert.equal(gameIds.length, 392);
    assert.equal(R.head(gameIds), 10);
    assert.equal(R.last(gameIds), 332317);
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
    assert.equal(gameIds.length, 45);
    assert.equal(R.head(gameIds), 74);
    assert.equal(R.last(gameIds), 266192);
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
      assert.equal(gameIds.length, 3);
      assert.equal(R.head(gameIds), 146508);
      assert.equal(R.last(gameIds), 266192);
      done();
    }
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
    assert.equal(gameIds.length, 226);
    assert.equal(R.head(gameIds), 42);
    assert.equal(R.last(gameIds), 300327);
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
      assert.equal(gameIds.length, 10);
      assert.equal(R.head(gameIds), 107998);
      assert.equal(R.last(gameIds), 319959);
      done();
    }
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
    assert.equal(gameIds.length, 49);
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
      assert.equal(gameIds.length, 18);
      assert.equal(R.head(gameIds), 13004);
      assert.equal(R.last(gameIds), 283355);
      done();
    }
  );
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
