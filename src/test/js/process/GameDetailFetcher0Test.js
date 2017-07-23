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
         var gameDetails = Object.values(newGameDetailMap);
         assert.ok(gameDetails);
         var length = gameIds.length;
         assert.equal(gameDetails.length, length);
         assert.equal(gameDetails[0].id, 12333);
         assert.equal(gameDetails[0].title, "Twilight Struggle");
         assert.equal(gameDetails[0].minPlayers, 2);
         assert.equal(gameDetails[0].maxPlayers, 2);
         assert.equal(gameDetails[length - 1].id, 120677);
         assert.equal(gameDetails[length - 1].title, "Terra Mystica");
         assert.equal(gameDetails[length - 1].minPlayers, 2);
         assert.equal(gameDetails[length - 1].maxPlayers, 5);
         done();
      };
      var fetcher = new GameDetailFetcher(gameIds, callback);

      // Run.
      var done = assert.async();
      fetcher.fetchData();
   });
});
