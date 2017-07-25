define(function()
{
   "use strict";
   var GameData = {};

   GameData.createGameData = function(gameSummary, gameDetail, usernames)
   {
      InputValidator.validateNotNull("gameSummary", gameSummary);
      InputValidator.validateNotNull("gameDetail", gameDetail);
      // usernames optional.
      if (gameSummary.get("id") !== gameDetail.get("id"))
      {
         throw "ID mismatch: gameSummary.get(\"id\") = " + gameSummary.get("id") + " gameDetail.get(\"id\") = " + gameDetail.get("id");
      }

      var answer = {};

      answer.id = gameSummary.get("id");
      answer.boardGameRank = gameSummary.get("boardGameRank");
      answer.geekRating = gameSummary.get("geekRating");

      var designers = gameDetail.get("designers");
      var categories = gameDetail.get("categories");
      var mechanics = gameDetail.get("mechanics");

      answer.title = gameDetail.get("title");
      answer.designers = designers;
      answer.yearPublished = gameDetail.get("yearPublished");
      answer.minPlayers = gameDetail.get("minPlayers");
      answer.maxPlayers = gameDetail.get("maxPlayers");
      answer.bestWithPlayers = gameDetail.get("bestWithPlayers");
      answer.minPlayTime = gameDetail.get("minPlayTime");
      answer.maxPlayTime = gameDetail.get("maxPlayTime");
      answer.averageWeight = gameDetail.get("averageWeight");
      answer.categories = categories;
      answer.mechanics = mechanics;

      answer.usernames = usernames;

      return answer;
   };

   return GameData;
});
