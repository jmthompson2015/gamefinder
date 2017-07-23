define(["process/Action", "process/GameDatabase", "process/Reducer"],
   function(Action, GameDatabase, Reducer)
   {
      "use strict";
      QUnit.module("GameDatabase");

      QUnit.test("GameDatabase()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = new GameDatabase(store);

         // Verify.
         assert.ok(result);
      });

      QUnit.test("loadCollections()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var gameDatabase = new GameDatabase(store);
         var callback = function(gameSummaryMap)
         {
            // Verify.
            assert.ok(true, "test resumed from async operation");
            // var gameCollectionMap = gameDatabase.gameCollectionMap();
            var gameCollectionMap = store.getState().gameCollectionMap;
            assert.ok(gameCollectionMap);
            assert.equal(Object.keys(gameCollectionMap).length, 170);
            done();
         };

         // Run.
         var done = assert.async();
         gameDatabase.loadCollections(callback);
      });

      QUnit.test("loadGameDetails()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setPageCount(1));
         var gameDatabase = new GameDatabase(store);
         store.dispatch(Action.setGameDatabase(gameDatabase));
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
            gameDatabase.loadGameDetails(gameSummaryMap, detailCallback);
         };

         var done2 = assert.async();
         gameDatabase.loadGameSummaries(summaryCallback);
      });

      QUnit.test("loadGameSummaries()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setPageCount(2));
         var gameDatabase = new GameDatabase(store);
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
         gameDatabase.loadGameSummaries(summaryCallback);
      });
   });
