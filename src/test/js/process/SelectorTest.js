define(["InitialState", "process/Action", "process/GameDatabase", "process/Reducer", "process/Selector"],
   function(InitialState, Action, GameDatabase, Reducer, Selector)
   {
      "use strict";
      QUnit.module("Selector");

      QUnit.test("findGameCollectionsById()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var gameDatabase = new GameDatabase(store);
         var id = 161936; // Pandemic Legacy Season 1
         var callback = function(gameCollectionMap)
         {
            // Verify.
            assert.equal(Object.keys(gameCollectionMap).length, 170);

            // Run.
            var result = Selector.findGameCollectionsById(store.getState(), id);

            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(result);
            assert.ok(Array.isArray(result));
            assert.equal(result[0].name, "ghightshoe");
            done();
         };

         var done = assert.async();
         gameDatabase.loadCollections(callback);
      });

      QUnit.test("findGameDetailById()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setPageCount(1));
         var newGameSummaryMap = createGameSummaryMap();
         store.dispatch(Action.addGameSummaries(newGameSummaryMap));
         var gameDatabase = new GameDatabase(store);
         var id = 1406; // Monopoly
         var callback = function(gameDetailMap)
         {
            // Verify.
            assert.equal(Object.keys(gameDetailMap).length, 2);

            // Run.
            var result = Selector.findGameDetailById(store.getState(), id);

            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(result);
            assert.equal(result.id, id);
            assert.equal(result.title, "Monopoly");
            done();
         };

         var done = assert.async();
         gameDatabase.loadGameDetails(newGameSummaryMap, callback);
      });

      QUnit.test("findGameSummaryById()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setPageCount(1));
         var gameDatabase = new GameDatabase(store);
         var id = 161936; // Pandemic Legacy Season 1
         var callback = function(gameSummaryMap)
         {
            // Verify.
            assert.equal(Object.keys(gameSummaryMap).length, 100);

            // Run.
            var result = Selector.findGameSummaryById(store.getState(), id);

            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(result);
            assert.equal(result.id, id);
            assert.equal(result.title, "Pandemic Legacy: Season 1 (2015)");
            done();
         };

         var done = assert.async();
         gameDatabase.loadGameSummaries(callback);
      });

      QUnit.test("gameCollectionMap()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = Selector.gameCollectionMap(store.getState());

         // Verify.
         assert.ok(result);
      });

      QUnit.test("gameDetailMap()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = Selector.gameDetailMap(store.getState());

         // Verify.
         assert.ok(result);
      });

      QUnit.test("gameSummaryMap()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = Selector.gameSummaryMap(store.getState());

         // Verify.
         assert.ok(result);
      });

      QUnit.test("isCollectionsLoaded()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = Selector.isCollectionsLoaded(store.getState());

         // Verify.
         assert.ok(!result);
      });

      QUnit.test("isDetailsLoaded()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = Selector.isDetailsLoaded(store.getState());

         // Verify.
         assert.ok(!result);
      });

      QUnit.test("isSummariesLoaded()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = Selector.isSummariesLoaded(store.getState());

         // Verify.
         assert.ok(!result);
      });

      QUnit.test("pageCount()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = Selector.pageCount(store.getState());

         // Verify.
         assert.ok(result);
         assert.equal(result, 8);
      });

      QUnit.test("usernames()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);

         // Run.
         var result = Selector.usernames(store.getState());

         // Verify.
         assert.ok(result);
         assert.ok(Array.isArray(result));
         assert.equal(result.length, 3);
      });

      function createGameSummaryMap()
      {
         var answer = {};

         answer[1406] = {
            id: 1406,
            title: "Monopoly (1933)",
         };
         answer[181] = {
            id: 181,
            title: "Risk (1959)",
         };

         return answer;
      }
   });
