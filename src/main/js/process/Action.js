define(function()
{
   "use strict";
   var Action = {};

   Action.ADD_GAME_DETAILS = "addGameDetails";
   Action.ADD_GAME_SUMMARIES = "addGameSummaries";
   Action.ADD_USER_COLLECTION = "addUserCollection";
   Action.REMOVE_FILTERS = "removeFilters";
   Action.SET_COLLECTION_TIME = "setCollectionTime";
   Action.SET_DEFAULT_FILTERS = "setDefaultFilters";
   Action.SET_DETAIL_TIME = "setDetailTime";
   Action.SET_FILTERS = "setFilters";
   Action.SET_PAGE_COUNT = "setPageCount";
   Action.SET_SUMMARY_TIME = "setSummaryTime";

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

   Action.setCollectionTime = function(time)
   {
      InputValidator.validateIsNumber("time", time);

      return (
      {
         type: Action.SET_COLLECTION_TIME,
         time: time,
      });
   };

   Action.setDefaultFilters = function()
   {
      return (
      {
         type: Action.SET_DEFAULT_FILTERS,
      });
   };

   Action.setDetailTime = function(time)
   {
      InputValidator.validateIsNumber("time", time);

      return (
      {
         type: Action.SET_DETAIL_TIME,
         time: time,
      });
   };

   Action.setFilters = function(filters)
   {
      InputValidator.validateNotNull("filters", filters);

      return (
      {
         type: Action.SET_FILTERS,
         filters: filters,
      });
   };

   Action.setPageCount = function(pageCount)
   {
      InputValidator.validateInRange("pageCount", pageCount, 1, 10);

      return (
      {
         type: Action.SET_PAGE_COUNT,
         pageCount: pageCount,
      });
   };

   Action.setSummaryTime = function(time)
   {
      InputValidator.validateIsNumber("time", time);

      return (
      {
         type: Action.SET_SUMMARY_TIME,
         time: time,
      });
   };

   if (Object.freeze)
   {
      Object.freeze(Action);
   }

   return Action;
});
