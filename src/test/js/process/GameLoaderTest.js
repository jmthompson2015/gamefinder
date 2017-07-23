define(["process/Action", "process/GameLoader", "process/Reducer"],
   function(Action, GameLoader, Reducer)
   {
      "use strict";
      QUnit.module("GameLoader");

      QUnit.test("GameLoader()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = new GameLoader(store);

         // Verify.
         assert.ok(result);
      });

      QUnit.test("loadCollections()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var gameLoader = new GameLoader(store);
         var callback = function(gameSummaryMap)
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            var gameCollectionMap = store.getState().gameCollectionMap;
            assert.ok(gameCollectionMap);
            assert.equal(Object.keys(gameCollectionMap).length, 170);
            done();
         };

         // Run.
         var done = assert.async();
         gameLoader.loadCollections(callback);
      });

      QUnit.test("loadGameDetails()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setPageCount(1));
         var gameLoader = new GameLoader(store);
         var summaryCallback = function(gameSummaryMap)
         {
            assert.ok(true, "test resumed from async operation");
            assert.ok(gameSummaryMap);

            var detailCallback = function(gameDetailMap)
            {
               // Verify.
               assert.ok(true, "test resumed from async operation");
               assert.ok(gameDetailMap);

               if (Object.keys(gameDetailMap).length === Object.keys(gameSummaryMap).length)
               {
                  assert.equal(Object.keys(gameDetailMap).length, 100);
                  done();
                  done2();
               }
            };

            // Run.
            var done = assert.async();
            gameLoader.loadGameDetails(gameSummaryMap, detailCallback);
         };

         var done2 = assert.async();
         gameLoader.loadGameSummaries(summaryCallback);
      });

      QUnit.test("loadGameSummaries()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setPageCount(2));
         var gameLoader = new GameLoader(store);
         var summaryCallback = function(gameSummaryMap)
         {
            // Verify.
            assert.ok(true, "summaryCallback() test resumed from async operation");
            assert.ok(gameSummaryMap);
            assert.equal(Object.keys(gameSummaryMap).length, 200);
            done();
         };

         // Run.
         var done = assert.async();
         gameLoader.loadGameSummaries(summaryCallback);
      });
   });
