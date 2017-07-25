define(["process/GameSummaryFetcher"],
   function(GameSummaryFetcher)
   {
      "use strict";
      QUnit.module("GameSummaryFetcher");

      QUnit.test("receiveData() 2", function(assert)
      {
         // Setup.
         var page = 2;
         var callback = function(newGameSummaryMap)
         {
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
         };
         var fetcher = new GameSummaryFetcher(page, callback);
         var xmlDocument = load("GameSummaries2");

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
