import GameDetailFetcher from "./GameDetailFetcher.js";

QUnit.module("GameDetailFetcher");

QUnit.test("fetchData()", assert => {
  // Setup.
  const gameIds = [];
  gameIds.push(1406); // Monopoly
  gameIds.push(12333); // Twilight Struggle
  gameIds.push(120677); // Terra Mystica

  // Run.
  const done = assert.async();
  GameDetailFetcher.fetchData(gameIds).then(newGameDetailMap => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(newGameDetailMap);
    const gameDetails = Object.values(newGameDetailMap);
    assert.ok(gameDetails);
    gameDetails.sort((a, b) => a.id - b.id);
    const { length } = gameIds;
    assert.equal(gameDetails.length, length);

    assert.equal(gameDetails[0].id, 1406);
    assert.equal(gameDetails[0].title, "Monopoly");
    assert.equal(gameDetails[0].minPlayers, 2);
    assert.equal(gameDetails[0].maxPlayers, 8);

    assert.equal(gameDetails[1].id, 12333);
    assert.equal(gameDetails[1].title, "Twilight Struggle");
    assert.equal(gameDetails[1].minPlayers, 2);
    assert.equal(gameDetails[1].maxPlayers, 2);

    assert.equal(gameDetails[length - 1].id, 120677);
    assert.equal(gameDetails[length - 1].title, "Terra Mystica");
    assert.equal(gameDetails[length - 1].minPlayers, 2);
    assert.equal(gameDetails[length - 1].maxPlayers, 5);
    done();
  });
});

const GameDetailFetcherTest = {};
export default GameDetailFetcherTest;
