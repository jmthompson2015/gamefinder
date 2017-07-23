define(function()
{
   "use strict";
   var Selector = {};

   Selector.findGameCollectionsById = function(state, id)
   {
      return this.gameCollectionMap(state)[id];
   };

   Selector.findGameDetailById = function(state, id)
   {
      return this.gameDetailMap(state)[id];
   };

   Selector.findGameSummaryById = function(state, id)
   {
      return this.gameSummaryMap(state)[id];
   };

   Selector.gameCollectionMap = function(state)
   {
      return state.gameCollectionMap;
   };

   Selector.gameDetailMap = function(state)
   {
      return state.gameDetailMap;
   };

   Selector.gameSummaryMap = function(state)
   {
      return state.gameSummaryMap;
   };

   Selector.gameTotal = function(state)
   {
      return this.pageCount(state) * 100;
   };

   Selector.isCollectionsLoaded = function(state)
   {
      var usernames = this.usernames(state);
      var usernameToReceivedMap = this.usernameToReceivedMap(state);

      return usernames.reduce(function(accumulator, username)
      {
         return accumulator && (usernameToReceivedMap[username] === true);
      }, true);
   };

   Selector.isDataLoaded = function(state)
   {
      return state.isDataLoaded;
   };

   Selector.isDetailsLoaded = function(state)
   {
      var length = Object.keys(this.gameDetailMap(state)).length;
      var gameTotal = this.gameTotal(state);

      return (length === gameTotal);
   };

   Selector.isSummariesLoaded = function(state)
   {
      var length = Object.keys(this.gameSummaryMap(state)).length;
      var gameTotal = this.gameTotal(state);

      return (length === gameTotal);
   };

   Selector.pageCount = function(state)
   {
      return state.pageCount;
   };

   Selector.usernameToReceivedMap = function(state)
   {
      return state.usernameToReceivedMap;
   };

   Selector.usernames = function(state)
   {
      return state.usernames;
   };

   return Selector;
});
