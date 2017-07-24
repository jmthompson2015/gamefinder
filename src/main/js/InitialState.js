define(["DefaultFilters", "EntityFilter", "RangeFilter"],
   function(DefaultFilters, EntityFilter, RangeFilter)
   {
      "use strict";

      function InitialState()
      {
         this.pageCount = 8;
         this.usernames = Immutable.List(["ghightshoe", "jmthompson", "kmistr"]);

         this.gameDataMap = {};
         this.filteredGameData = [];

         // game ID to array of users
         this.gameCollectionMap = Immutable.Map();
         // game ID to detail
         this.gameDetailMap = {};
         // game ID to summary
         this.gameSummaryMap = Immutable.Map();

         this.collectionTime = undefined;
         this.summaryTime = undefined;
         this.detailTime = undefined;

         this.isDataLoaded = false;
         this.categoryMap = {};
         this.designerMap = {};
         this.mechanicMap = {};
         // user ID to object
         this.usernameMap = {};
         // username to boolean
         this.usernameToReceivedMap = Immutable.Map();

         var entityMap = this.usernameMap;
         this.usernames.forEach(function(username, id)
         {
            var user = {
               type: "username",
               id: parseInt(id),
               name: username,
               count: 0,
            };

            entityMap[user.id] = user;
         }, this);

         // FIXME
         // localStorage.removeItem("filters");
         // FIXME

         this.filters = DefaultFilters.create();
         var oldFilters = InitialState.loadFromLocalStorage();

         if (oldFilters)
         {
            this.merge(oldFilters);
         }
      }

      InitialState.prototype.merge = function(oldFilters)
      {
         InputValidator.validateNotNull("oldFilters", oldFilters);

         Object.getOwnPropertyNames(oldFilters).forEach(function(columnKey, i)
         {
            this.filters[columnKey] = oldFilters[columnKey];
         }, this);
      };

      InitialState.loadFromLocalStorage = function()
      {
         var answer;
         var filterObjects = JSON.parse(localStorage.filters || null);

         if (filterObjects)
         {
            answer = {};

            filterObjects.forEach(function(object, i)
            {
               var filter;

               switch (object.type)
               {
                  case "EntityFilter":
                     filter = EntityFilter.fromObject(object);
                     break;
                  case "RangeFilter":
                     filter = RangeFilter.fromObject(object);
                     break;
                  default:
                     throw "Unknown filter type: " + JSON.stringify(object);
               }

               answer[filter.columnKey()] = filter;
            });
         }

         return answer;
      };

      if (Object.freeze)
      {
         Object.freeze(InitialState);
      }

      return InitialState;
   });
