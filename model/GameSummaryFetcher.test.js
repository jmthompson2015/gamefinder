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
    assert.equal(gameSummaryLast.id, 397598);
    assert.equal(gameSummaryLast.title, "Dune: Imperium – Uprising (2023)");
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
    assert.equal(gameSummary0.id, 3, "id");
    assert.equal(gameSummary0.title, "Samurai (1998)");
    const gameSummaryLast = R.last(gameSummaries);
    assert.equal(gameSummaryLast.id, 390092);
    assert.equal(
      gameSummaryLast.title,
      "Ticket to Ride Legacy: Legends of the West (2023)",
    );

    const ids = R.map(R.prop("id"), gameSummaries);
    // console.log(`ids = ${ids}`);
    assert.equal(ids.includes(24181), false, "Has Imperial ID"); // Imperial
    assert.equal(ids.includes(228341), true, "Has Pulsar 2849 ID"); // Pulsar 2849
    assert.equal(ids.includes(54138), false, "Has Imperial 2030 ID"); // Imperial 2030

    const boardGameRanks = R.map(R.prop("boardGameRank"), gameSummaries);
    for (let i = 201; i <= 300; i += 1) {
      if (!boardGameRanks.includes(i)) {
        console.warn(`Missing game for boardGameRank=${i}`);
      }
      assert.equal(
        boardGameRanks.includes(i),
        true,
        `Missing game for boardGameRank=${i}`,
      );
    }

    done();
  });
});

const GameSummaryFetcherTest = {};
export default GameSummaryFetcherTest;
