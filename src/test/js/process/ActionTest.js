define(["process/Action"],
   function(Action)
   {
      "use strict";
      QUnit.module("Action");

      QUnit.test("addGameDetails()", function(assert)
      {
         // Setup.
         var gameDetailMap = createGameDetailMap();

         // Run.
         var result = Action.addGameDetails(gameDetailMap);

         // Verify.
         assert.ok(result);
         assert.equal(result.type, Action.ADD_GAME_DETAILS);
         assert.equal(result.gameDetailMap, gameDetailMap);
      });

      QUnit.test("addGameSummaries()", function(assert)
      {
         // Setup.
         var gameSummaryMap = createGameSummaryMap();

         // Run.
         var result = Action.addGameSummaries(gameSummaryMap);

         // Verify.
         assert.ok(result);
         assert.equal(result.type, Action.ADD_GAME_SUMMARIES);
         assert.equal(result.gameSummaryMap, gameSummaryMap);
      });

      QUnit.test("addUserCollection()", function(assert)
      {
         // Setup.
         var username = "jmthompson";
         var gameIds = [1406, 181];

         // Run.
         var result = Action.addUserCollection(username, gameIds);

         // Verify.
         assert.ok(result);
         assert.equal(result.type, Action.ADD_USER_COLLECTION);
         assert.equal(result.username, username);
         assert.equal(result.gameIds, gameIds);
      });

      function createGameDetailMap()
      {
         var answer = {};

         answer[1406] = {
            id: 1406,
            title: "Monopoly (1933)",
            minPlayers: 2,
            maxPlayers: 8,
         };
         answer[181] = {
            id: 181,
            title: "Risk (1959)",
            minPlayers: 2,
            maxPlayers: 6,
         };

         return answer;
      }

      function createGameSummaryMap()
      {
         var answer = {};

         answer[12] = {
            id: 12,
            title: "Monopoly (1933)",
         };
         answer[34] = {
            id: 34,
            title: "Risk (1959)",
         };

         return answer;
      }
   });
