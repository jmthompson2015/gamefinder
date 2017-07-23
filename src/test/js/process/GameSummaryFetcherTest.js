define(["process/GameSummaryFetcher", "process/Reducer"],
   function(GameSummaryFetcher, Reducer)
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
            var gameSummaries = Object.values(newGameSummaryMap);
            assert.ok(gameSummaries);
            var length = 100;
            assert.equal(gameSummaries.length, length);
            assert.equal(gameSummaries[0].id, 1);
            assert.equal(gameSummaries[0].title, "Die Macher (1986)");
            assert.equal(gameSummaries[length - 1].id, 198928);
            assert.equal(gameSummaries[length - 1].title, "Pandemic Iberia (2016)");
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
