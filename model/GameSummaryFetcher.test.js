import GameSummaryFetcher from "./GameSummaryFetcher.js";

QUnit.module("GameSummaryFetcher");

QUnit.test("fetchData() 2", (assert) => {
  // Setup.
  const page0 = 2;

  // Run.
  const done = assert.async();
  GameSummaryFetcher.fetchData(page0).then(({ page, gameSummaries }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.equal(page, page0);
    assert.ok(gameSummaries);
    gameSummaries.sort((a, b) => a.id - b.id);
    assert.equal(gameSummaries.length, 100);
    const gameSummary0 = R.head(gameSummaries);
    assert.equal(gameSummary0.id, 12, "id");
    assert.equal(gameSummary0.title, "Ra (1999)");
    const gameSummaryLast = R.last(gameSummaries);
    assert.equal(gameSummaryLast.id, 316554);
    assert.equal(gameSummaryLast.title, "Dune: Imperium (2020)");
    done();
  });
});

QUnit.test("fetchData() 3", (assert) => {
  // Setup.
  const page0 = 3;

  // Run.
  const done = assert.async();
  GameSummaryFetcher.fetchData(page0).then(({ page, gameSummaries }) => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.equal(page, page0);
    assert.ok(gameSummaries);
    gameSummaries.sort((a, b) => a.id - b.id);
    assert.equal(gameSummaries.length, 100);
    const gameSummary0 = R.head(gameSummaries);
    assert.equal(gameSummary0.id, 1, "id");
    assert.equal(gameSummary0.title, "Die Macher (1986)");
    const gameSummaryLast = R.last(gameSummaries);
    assert.equal(gameSummaryLast.id, 314040);
    assert.equal(gameSummaryLast.title, "Pandemic Legacy: Season 0 (2020)");

    const ids = R.map(R.prop("id"), gameSummaries);
    // console.log(`ids = ${ids}`);
    assert.equal(ids.includes(24181), true, "Has Imperial ID"); // Imperial
    assert.equal(ids.includes(228341), true, "Has Pulsar 2849 ID"); // Pulsar 2849
    assert.equal(ids.includes(54138), true, "Has Imperial 2030 ID"); // Imperial 2030

    const boardGameRanks = R.map(R.prop("boardGameRank"), gameSummaries);
    for (let i = 201; i <= 300; i += 1) {
      if (!boardGameRanks.includes(i)) {
        console.warn(`Missing game for boardGameRank=${i}`);
      }
      assert.equal(
        boardGameRanks.includes(i),
        true,
        `Missing game for boardGameRank=${i}`
      );
    }

    done();
  });
});

const GameSummaryFetcherTest = {};
export default GameSummaryFetcherTest;
