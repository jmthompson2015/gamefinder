import GameDetailFetcher from "./GameDetailFetcher.js";

QUnit.module("GameDetailFetcher");

QUnit.test("fetchData()", assert => {
  // Setup.
  const gameIds = [
    1406, // Monopoly
    12333, // Twilight Struggle
    120677 // Terra Mystica
  ];

  // Run.
  const done = assert.async();
  GameDetailFetcher.fetchData(gameIds).then(gameDetails => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(gameDetails);
    gameDetails.sort((a, b) => a.id - b.id);
    const { length } = gameIds;
    assert.equal(gameDetails.length, length);

    assert.equal(gameDetails[0].id, 1406);
    assert.equal(gameDetails[0].boardGameRank, 16069, "gameDetails[0] boardGameRank");
    assert.equal(gameDetails[0].title, "Monopoly");
    assert.equal(gameDetails[0].geekRating, 4.33035, "gameDetails[0] geekRating");
    assert.equal(gameDetails[0].minPlayers, 2);
    assert.equal(gameDetails[0].maxPlayers, 8);

    assert.equal(gameDetails[1].id, 12333);
    assert.equal(gameDetails[1].boardGameRank, 5);
    assert.equal(gameDetails[1].title, "Twilight Struggle");
    assert.equal(gameDetails[1].geekRating, 8.18642);
    assert.equal(gameDetails[1].minPlayers, 2);
    assert.equal(gameDetails[1].maxPlayers, 2);

    assert.equal(gameDetails[length - 1].id, 120677);
    assert.equal(gameDetails[length - 1].boardGameRank, 9);
    assert.equal(gameDetails[length - 1].title, "Terra Mystica");
    assert.equal(gameDetails[length - 1].geekRating, 8.07169);
    assert.equal(gameDetails[length - 1].minPlayers, 2);
    assert.equal(gameDetails[length - 1].maxPlayers, 5);
    done();
  });
});

const GameDetailFetcherTest = {};
export default GameDetailFetcherTest;
