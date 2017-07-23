define(["process/GameCollectionFetcher"], function(GameCollectionFetcher)
{
   "use strict";
   QUnit.module("GameCollectionFetcher");

   QUnit.test("receiveData() ghightshoe", function(assert)
   {
      // Setup.
      var username = "ghightshoe";
      var callback = function(username2, collectionIds)
      {
         // Verify.
         assert.ok(username2);
         assert.equal(username2, username);
         assert.ok(collectionIds);
         var length = 25;
         assert.equal(collectionIds.length, length);
         assert.equal(collectionIds[0], 74);
         assert.equal(collectionIds[length - 1], 204053);
      };
      var fetcher = new GameCollectionFetcher(username, callback);
      var xmlDocument = load("GameCollection0");

      // Run.
      fetcher.receiveData(xmlDocument);
   });

   function load(name)
   {
      var request = new XMLHttpRequest();
      var url = "../resources/" + name + ".xml";
      LOGGER.debug("url = " + url);
      var isAsync = false;
      request.open("GET", url, isAsync);
      request.send();

      return request.responseXML;
   }
});
