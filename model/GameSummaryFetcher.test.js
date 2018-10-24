import GameSummaryFetcher from "./GameSummaryFetcher.js";

QUnit.module("GameSummaryFetcher");

QUnit.test("fetchData() 2", assert => {
  // Setup.
  const page = 2;

  // Run.
  const done = assert.async();
  GameSummaryFetcher.fetchData(page).then(newGameToSummary => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(newGameToSummary);
    const gameSummaries = Object.values(newGameToSummary);
    assert.ok(gameSummaries);
    gameSummaries.sort((a, b) => a.id - b.id);
    const length = 100;
    assert.equal(gameSummaries.length, length);
    assert.equal(gameSummaries[0].id, 1);
    assert.equal(gameSummaries[0].title, "Die Macher (1986)");
    assert.equal(gameSummaries[length - 1].id, 237182);
    assert.equal(gameSummaries[length - 1].title, "Root (2018)");
    done();
  });
});

const GameSummaryFetcherTest = {};
export default GameSummaryFetcherTest;
