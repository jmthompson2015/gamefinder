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
    assert.equal(gameSummaries.length, 91);
    const gameSummary0 = R.head(gameSummaries);
    assert.equal(gameSummary0.id, 12, "id");
    assert.equal(gameSummary0.title, "Ra (1999)");
    const gameSummaryLast = R.last(gameSummaries);
    assert.equal(gameSummaryLast.id, 312484);
    assert.equal(gameSummaryLast.title, "Lost Ruins of Arnak (2020)");
    done();
  });
});

const GameSummaryFetcherTest = {};
export default GameSummaryFetcherTest;
