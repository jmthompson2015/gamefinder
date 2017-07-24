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
            var gameSummaries = newGameSummaryMap.toIndexedSeq().toArray();
            assert.ok(gameSummaries);
            gameSummaries.sort(function(a, b)
            {
               return a.get("id") - b.get("id");
            });
            var length = 100;
            assert.equal(gameSummaries.length, length);
            assert.equal(gameSummaries[0].get("id"), 1);
            assert.equal(gameSummaries[0].get("title"), "Die Macher (1986)");
            assert.equal(gameSummaries[length - 1].get("id"), 198928);
            assert.equal(gameSummaries[length - 1].get("title"), "Pandemic Iberia (2016)");
            done();
         };
         var fetcher = new GameSummaryFetcher(page, callback);

         // Run.
         var done = assert.async();
         fetcher.fetchData();
      });
   });
