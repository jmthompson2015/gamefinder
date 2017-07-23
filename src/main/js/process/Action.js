define(function()
{
   "use strict";
   var Action = {};

   Action.ADD_GAME_DETAILS = "addGameDetails";
   Action.ADD_GAME_SUMMARIES = "addGameSummaries";
   Action.ADD_USER_COLLECTION = "addUserCollection";
   Action.REMOVE_FILTERS = "removeFilters";
   Action.SET_DEFAULT_FILTERS = "setDefaultFilters";
   Action.SET_FILTERS = "setFilters";
   Action.SET_GAME_DATABASE = "setGameDatabase";

   Action.addGameDetails = function(gameDetailMap)
   {
      InputValidator.validateNotNull("gameDetailMap", gameDetailMap);

      return (
      {
         type: Action.ADD_GAME_DETAILS,
         gameDetailMap: gameDetailMap,
      });
   };

   Action.addGameSummaries = function(gameSummaryMap)
   {
      InputValidator.validateNotNull("gameSummaryMap", gameSummaryMap);

      return (
      {
         type: Action.ADD_GAME_SUMMARIES,
         gameSummaryMap: gameSummaryMap,
      });
   };

   Action.addUserCollection = function(username, gameIds)
   {
      InputValidator.validateNotNull("username", username);
      InputValidator.validateNotNull("gameIds", gameIds);
      InputValidator.validateIsArray("gameIds", gameIds);

      return (
      {
         type: Action.ADD_USER_COLLECTION,
         username: username,
         gameIds: gameIds,
      });
   };

   Action.removeFilters = function()
   {
      return (
      {
         type: Action.REMOVE_FILTERS,
      });
   };

   Action.setDefaultFilters = function()
   {
      return (
      {
         type: Action.SET_DEFAULT_FILTERS,
      });
   };

   Action.setFilters = function(filters)
   {
      return (
      {
         type: Action.SET_FILTERS,
         filters: filters,
      });
   };

   Action.setGameDatabase = function(gameDatabase)
   {
      return (
      {
         type: Action.SET_GAME_DATABASE,
         gameDatabase: gameDatabase,
      });
   };

   if (Object.freeze)
   {
      Object.freeze(Action);
   }

   return Action;
});
