define(["process/GameSummaryFetcher", "process/Reducer"],
   function(GameSummaryFetcher, Reducer)
   {
      "use strict";
      QUnit.module("GameSummaryFetcher0");

      QUnit.test("fetchData() 2", function(assert)
      {
         // Setup.
         var page = 2;
         var callback = function(newGameSummaryMap)
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(newGameSummaryMap);
            var gameSummaries = Object.values(newGameSummaryMap);
            assert.ok(gameSummaries);
            var length = 100;
            assert.equal(gameSummaries.length, length);
            assert.equal(gameSummaries[0].id, 1);
            assert.equal(gameSummaries[0].title, "Die Macher (1986)");
            assert.equal(gameSummaries[length - 1].id, 198928);
            assert.equal(gameSummaries[length - 1].title, "Pandemic Iberia (2016)");
            done();
         };
         var fetcher = new GameSummaryFetcher(page, callback);

         // Run.
         var done = assert.async();
         fetcher.fetchData();
      });
   });
