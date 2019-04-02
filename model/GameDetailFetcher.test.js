import GameDetailFetcher from "./GameDetailFetcher.js";

QUnit.module("GameDetailFetcher");

const round2 = value => Math.round(value * 100.0) / 100.0;

QUnit.test("fetchData()", assert => {
  // Setup.
  const gameIds = [
    1406, // Monopoly
    12333, // Twilight Struggle
    120677, // Terra Mystica
    176371 // Explorers of the North Sea (not in top 1000)
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

    assert.ok(gameDetails[0]);
    assert.equal(gameDetails[0].id, 1406);
    assert.equal(gameDetails[0].boardGameRank, 16920, "gameDetails[0] boardGameRank");
    assert.equal(gameDetails[0].title, "Monopoly");
    assert.equal(round2(gameDetails[0].geekRating), 4.32, "gameDetails[0] geekRating");
    assert.equal(gameDetails[0].minPlayers, 2);
    assert.equal(gameDetails[0].maxPlayers, 8);

    assert.ok(gameDetails[1]);
    assert.equal(gameDetails[1].id, 12333);
    assert.equal(gameDetails[1].boardGameRank, 5);
    assert.equal(gameDetails[1].title, "Twilight Struggle");
    assert.equal(round2(gameDetails[1].geekRating), 8.18);
    assert.equal(gameDetails[1].minPlayers, 2);
    assert.equal(gameDetails[1].maxPlayers, 2);

    assert.ok(gameDetails[2]);
    assert.equal(gameDetails[2].id, 120677);
    assert.equal(gameDetails[2].boardGameRank, 11);
    assert.equal(gameDetails[2].title, "Terra Mystica");
    assert.equal(round2(gameDetails[2].geekRating), 8.05);
    assert.equal(gameDetails[2].minPlayers, 2);
    assert.equal(gameDetails[2].maxPlayers, 5);

    assert.ok(gameDetails[3]);
    assert.equal(gameDetails[3].id, 176371);
    assert.equal(gameDetails[3].boardGameRank, 1067);
    assert.equal(gameDetails[3].title, "Explorers of the North Sea");
    assert.equal(round2(gameDetails[3].geekRating), 6.41);
    assert.equal(gameDetails[3].minPlayers, 1);
    assert.equal(gameDetails[3].maxPlayers, 4);
    done();
  });
});

const GameDetailFetcherTest = {};
export default GameDetailFetcherTest;
