define(["process/GameCollectionFetcher"], function(GameCollectionFetcher)
{
   "use strict";
   QUnit.module("GameCollectionFetcher0");

   QUnit.test("fetchData() ghightshoe", function(assert)
   {
      // Setup.
      var username = "ghightshoe";
      var callback = function(username2, collectionIds)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(username2);
         assert.equal(username2, username);
         assert.ok(collectionIds);
         var length = 25;
         assert.equal(collectionIds.length, length);
         assert.equal(collectionIds[0], 74);
         assert.equal(collectionIds[length - 1], 204053);
         done();
      };
      var fetcher = new GameCollectionFetcher(username, callback);

      // Run.
      var done = assert.async();
      fetcher.fetchData();
   });

   QUnit.test("fetchData() jmthompson", function(assert)
   {
      // Setup.
      var username = "jmthompson";
      var callback = function(username2, collectionIds)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(username2);
         assert.equal(username2, username);
         assert.ok(collectionIds);
         var length = 117;
         assert.equal(collectionIds.length, length);
         assert.equal(collectionIds[0], 1198);
         assert.equal(collectionIds[length - 1], 201875);
         done();
      };
      var fetcher = new GameCollectionFetcher(username, callback);

      // Run.
      var done = assert.async();
      fetcher.fetchData();
   });

   QUnit.test("fetchData() kmistr", function(assert)
   {
      // Setup.
      var username = "kmistr";
      var callback = function(username2, collectionIds)
      {
         // Verify.
         assert.ok(true, "test resumed from async operation");
         assert.ok(username2);
         assert.equal(username2, username);
         assert.ok(collectionIds);
         var length = 30;
         assert.equal(collectionIds.length, length);
         assert.equal(collectionIds[0], 13);
         assert.equal(collectionIds[length - 1], 176173);
         done();
      };
      var fetcher = new GameCollectionFetcher(username, callback);

      // Run.
      var done = assert.async();
      fetcher.fetchData();
   });
});
