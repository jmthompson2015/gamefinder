define(["InitialState", "process/Action", "process/GameLoader", "process/Reducer"],
   function(InitialState, Action, GameLoader, Reducer)
   {
      "use strict";
      QUnit.module("Reducer");

      QUnit.test("addGameDetails()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var pageCount = 2;
         var gameLoader = new GameLoader(store, pageCount);

         var state = new InitialState();
         var gameSummaryMap = createGameSummaryMap();
         var action1 = Action.addGameSummaries(gameSummaryMap);
         state = Reducer.root(state, action1);
         assert.equal(Object.keys(state.gameSummaryMap).length, 2);
         var gameDetailMap = createGameDetailMap();
         assert.equal(Object.keys(state.gameDetailMap).length, 0);
         var action = Action.addGameDetails(gameDetailMap);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(Object.keys(result.gameDetailMap).length, 2);
         assert.equal(Object.keys(result.gameDataMap).length, 2);
      });

      QUnit.test("addGameSummaries()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var length = 0;
         assert.equal(Object.keys(state.gameSummaryMap).length, length);
         var gameSummaryMap = createGameSummaryMap();
         var action = Action.addGameSummaries(gameSummaryMap);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(Object.keys(result.gameSummaryMap).length, length + 2);
      });

      QUnit.test("addUserCollection()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var length = 0;
         assert.equal(Object.keys(state.gameCollectionMap).length, length);
         var username = "jmthompson";
         var gameIds = [1406, 181];
         var action = Action.addUserCollection(username, gameIds);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(Object.keys(result.gameCollectionMap).length, length + 2);
      });

      QUnit.test("setPageCount()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var length = 0;
         assert.equal(state.pageCount, 8);
         var pageCount = 5;
         var action = Action.setPageCount(pageCount);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.pageCount, pageCount);
      });

      function createGameDetailMap()
      {
         var answer = {};

         answer[1406] = {
            id: 1406,
            title: "Monopoly (1933)",
            minPlayers: 2,
            maxPlayers: 8,
            categories: [],
            designers: [],
            mechanics: [],
         };
         answer[181] = {
            id: 181,
            title: "Risk (1959)",
            minPlayers: 2,
            maxPlayers: 6,
            categories: [],
            designers: [],
            mechanics: [],
         };

         return answer;
      }

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
