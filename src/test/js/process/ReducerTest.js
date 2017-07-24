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
         assert.equal(state.gameSummaryMap.size, 2);
         var gameDetailMap = createGameDetailMap();
         assert.equal(Object.keys(state.gameDetailMap).length, 0);
         var action = Action.addGameDetails(gameDetailMap);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(Object.keys(result.gameDetailMap).length, 2);
         assert.ok(result.gameDataMap instanceof Immutable.Map);
         assert.equal(result.gameDataMap.size, 2);
         assert.ok(result.filteredGameData instanceof Immutable.List, "result.filteredGameData = " + result.filteredGameData);
         assert.equal(result.filteredGameData.size, 2);
      });

      QUnit.test("addGameSummaries()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var length = 0;
         assert.equal(state.gameSummaryMap.size, length);
         var gameSummaryMap = createGameSummaryMap();
         var action = Action.addGameSummaries(gameSummaryMap);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.gameSummaryMap.size, length + 2);
      });

      QUnit.test("addUserCollection()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var length = 0;
         assert.equal(state.gameCollectionMap.size, length);
         var username = "jmthompson";
         var gameIds = [1406, 181];
         var action = Action.addUserCollection(username, gameIds);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.gameCollectionMap.size, length + 2);
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
