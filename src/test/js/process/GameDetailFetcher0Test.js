define(["process/GameDetailFetcher"], function(GameDetailFetcher)
{
   "use strict";
   QUnit.module("GameDetailFetcher");

   QUnit.test("fetchData()", function(assert)
   {
      // Setup.
      var gameIds = [];
      gameIds.push(12333);
      gameIds.push(120677);
      var callback = function(newGameDetailMap)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(newGameDetailMap);
         var gameDetails = newGameDetailMap.toIndexedSeq().toArray();
         assert.ok(gameDetails);
         gameDetails.sort(function(a, b)
         {
            return a.id - b.id;
         });
         var length = gameIds.length;
         assert.equal(gameDetails.length, length);
         assert.equal(gameDetails[0].get("id"), 12333);
         assert.equal(gameDetails[0].get("title"), "Twilight Struggle");
         assert.equal(gameDetails[0].get("minPlayers"), 2);
         assert.equal(gameDetails[0].get("maxPlayers"), 2);
         assert.equal(gameDetails[length - 1].get("id"), 120677);
         assert.equal(gameDetails[length - 1].get("title"), "Terra Mystica");
         assert.equal(gameDetails[length - 1].get("minPlayers"), 2);
         assert.equal(gameDetails[length - 1].get("maxPlayers"), 5);
         done();
      };
      var fetcher = new GameDetailFetcher(gameIds, callback);

      // Run.
      var done = assert.async();
      fetcher.fetchData();
   });
});
