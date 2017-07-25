define(["process/GameDetailFetcher"], function(GameDetailFetcher)
{
   "use strict";
   QUnit.module("GameDetailFetcher");

   QUnit.test("receiveData()", function(assert)
   {
      // Setup.
      var gameIds = [];
      gameIds.push(12333);
      gameIds.push(120677);
      var callback = function(newGameDetailMap)
      {
         // Verify.
         assert.ok(newGameDetailMap);
         var gameDetails = newGameDetailMap.toIndexedSeq().toArray();
         assert.ok(gameDetails);
         gameDetails.sort(function(a, b)
         {
            return a.id - b.id;
         });
         var length = gameIds.length;
         assert.equal(gameDetails.length, length);
         verifyFirst(gameDetails[0]);
         verifyLast(gameDetails[length - 1]);
      };
      var fetcher = new GameDetailFetcher(gameIds, callback);
      var xmlDocument = load("GameDetails1");

      // Run.
      fetcher.receiveData(xmlDocument);

      function verifyFirst(gameDetail)
      {
         assert.ok(gameDetail);
         assert.equal(gameDetail.get("id"), 12333);
         assert.equal(gameDetail.get("title"), "Twilight Struggle");
         assert.equal(gameDetail.get("yearPublished"), 2005);
         assert.equal(gameDetail.get("minPlayers"), 2);
         assert.equal(gameDetail.get("maxPlayers"), 2);
         assert.equal(gameDetail.get("bestWithPlayers"), 2);
         assert.equal(gameDetail.get("minPlayTime"), 180);
         assert.equal(gameDetail.get("maxPlayTime"), 180);
         assert.equal(gameDetail.get("averageWeight"), 3.534);
         assert.equal(gameDetail.get("designers").length, 2);
         assert.equal(gameDetail.get("categories").length, 3);
         assert.equal(gameDetail.get("mechanics").length, 5);
      }

      function verifyLast(gameDetail)
      {
         assert.ok(gameDetail);
         assert.equal(gameDetail.get("id"), 120677);
         assert.equal(gameDetail.get("title"), "Terra Mystica");
         assert.equal(gameDetail.get("yearPublished"), 2012);
         assert.equal(gameDetail.get("minPlayers"), 2);
         assert.equal(gameDetail.get("maxPlayers"), 5);
         assert.equal(gameDetail.get("bestWithPlayers"), 4);
         assert.equal(gameDetail.get("minPlayTime"), 60);
         assert.equal(gameDetail.get("maxPlayTime"), 150);
         assert.equal(gameDetail.get("averageWeight"), 3.9356);
         assert.equal(gameDetail.get("designers").length, 2);
         assert.equal(gameDetail.get("categories").length, 4);
         assert.equal(gameDetail.get("mechanics").length, 3);
      }
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
