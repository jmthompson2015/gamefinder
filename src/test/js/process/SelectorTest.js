define(["process/Action", "process/GameLoader", "process/Reducer", "process/Selector"],
   function(Action, GameLoader, Reducer, Selector)
   {
      "use strict";
      QUnit.module("Selector");

      QUnit.test("findGameCollectionsById()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var gameLoader = new GameLoader(store);
         var id = 161936; // Pandemic Legacy Season 1
         var callback = function(gameCollectionMap)
         {
            // Verify.
            assert.equal(gameCollectionMap.size, 170);

            // Run.
            var result = Selector.findGameCollectionsById(store.getState(), id);

            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(result);
            assert.ok(Array.isArray(result));
            assert.equal(result.length, 1);
            assert.equal(result[0].name, "ghightshoe");
            done();
         };

         var done = assert.async();
         gameLoader.loadCollections(callback);
      });

      QUnit.test("findGameDetailById()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setPageCount(1));
         var newGameSummaryMap = createGameSummaryMap();
         store.dispatch(Action.addGameSummaries(newGameSummaryMap));
         var gameLoader = new GameLoader(store);
         var id = 1406; // Monopoly
         var callback = function(gameDetailMap)
         {
            // Verify.
            assert.equal(gameDetailMap.size, 2);

            // Run.
            var result = Selector.findGameDetailById(store.getState(), id);

            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(result);
            assert.equal(result.get("id"), id);
            assert.equal(result.get("title"), "Monopoly");
            done();
         };

         var done = assert.async();
         gameLoader.loadGameDetails(newGameSummaryMap, callback);
      });

      QUnit.test("findGameSummaryById()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         store.dispatch(Action.setPageCount(1));
         var gameLoader = new GameLoader(store);
         var id = 161936; // Pandemic Legacy Season 1
         var callback = function(gameSummaryMap)
         {
            // Verify.
            assert.equal(gameSummaryMap.size, 100);
            assert.ok(Selector.gameSummaryMap(store.getState()) instanceof Immutable.Map);

            // Run.
            var result = Selector.findGameSummaryById(store.getState(), id);

            // Verify.
            assert.ok(true, "test resumed from async operation");
            assert.ok(result);
            assert.equal(result.get("id"), id);
            assert.equal(result.get("title"), "Pandemic Legacy: Season 1 (2015)");
            done();
         };

         var done = assert.async();
         gameLoader.loadGameSummaries(callback);
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
         assert.ok(result instanceof Immutable.List);
         assert.equal(result.size, 3);
      });

      function createGameSummaryMap()
      {
         var answer = Immutable.Map();

         answer = answer.set(1406, Immutable.Map(
         {
            id: 1406,
            title: "Monopoly (1933)",
         }));
         answer = answer.set(181, Immutable.Map(
         {
            id: 181,
            title: "Risk (1959)",
         }));

         return answer;
      }
   });
