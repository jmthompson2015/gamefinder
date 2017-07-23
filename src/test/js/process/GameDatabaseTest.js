define(["process/Action", "process/GameDatabase", "process/Reducer"],
   function(Action, GameDatabase, Reducer)
   {
      "use strict";
      QUnit.module("GameDatabase");

      QUnit.test("GameDatabase()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var pageCount = 5;

         // Run.
         var result = new GameDatabase(store, pageCount);

         // Verify.
         assert.ok(result);
         assert.equal(result.pageCount(), pageCount);
         assert.ok(result.usernameToReceivedMap());
      });

      QUnit.test("findGameCollectionsById()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var pageCount = 1;
         var gameDatabase = new GameDatabase(store, pageCount);
         var id = 161936; // Pandemic Legacy Season 1
         var collectionCallback = function(gameCollectionMap)
         {
            // Verify.
            assert.equal(Object.keys(gameCollectionMap).length, 170);

            // Run.
            var result = gameDatabase.findGameCollectionsById(id);

            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(result);
            assert.ok(Array.isArray(result));
            assert.equal(result[0].name, "ghightshoe");
            done();
         };

         var done = assert.async();
         gameDatabase.loadCollections(collectionCallback);
      });

      QUnit.test("loadCollections()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var pageCount = 5;
         var gameDatabase = new GameDatabase(store, pageCount);
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
         var pageCount = 1;
         var gameDatabase = new GameDatabase(store, pageCount);
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
         var pageCount = 2;
         var gameDatabase = new GameDatabase(store, pageCount);
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
