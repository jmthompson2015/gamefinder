define(["DefaultFilters", "GameData", "InitialState", "process/Action"],
   function(DefaultFilters, GameData, InitialState, Action)
   {
      "use strict";
      var Reducer = {};

      Reducer.root = function(state, action)
      {
         LOGGER.debug("root() type = " + action.type);

         if (typeof state === 'undefined')
         {
            return new InitialState();
         }

         var newCategoryMap, newDesignerMap, newFilteredGameData, newFilters, newGameCollectionMap, newGameDataMap, newGameDetailMap, newGameSummaryMap, newMechanicMap, newUsernameMap;

         switch (action.type)
         {
            case Action.ADD_GAME_DETAILS:
               LOGGER.info("Reducer gameDetailMap = " + action.gameDetailMap + (action.gameDetailMap !== undefined ? " length = " + Object.keys(action.gameDetailMap).length : ""));
               newGameDetailMap = Object.assign(
               {}, state.gameDetailMap);
               newGameDataMap = Object.assign(
               {}, state.gameDataMap);
               Object.vizziniMerge(newGameDetailMap, action.gameDetailMap);
               Reducer.addGameData(state, newGameDataMap, action.gameDetailMap);
               newCategoryMap = Object.assign(
               {}, state.categoryMap);
               newDesignerMap = Object.assign(
               {}, state.designerMap);
               newMechanicMap = Object.assign(
               {}, state.mechanicMap);
               newUsernameMap = Object.assign(
               {}, state.usernameMap);
               Object.keys(action.gameDetailMap).forEach(function(id)
               {
                  var gameDetail = action.gameDetailMap[id];
                  Reducer.entityMap(state, newCategoryMap, gameDetail.categories);
                  Reducer.entityMap(state, newDesignerMap, gameDetail.designers);
                  Reducer.entityMap(state, newMechanicMap, gameDetail.mechanics);
                  var users = state.gameCollectionMap[id];
                  if (users && users.length > 0)
                  {
                     users.forEach(function(user)
                     {
                        user.count++;
                     });
                  }
               });
               newFilteredGameData = [];
               var gameData = Object.values(newGameDataMap);
               var gameCount = state.gameDatabase.pageCount() * 100;
               var isDataLoaded = (gameCount === gameData.length);
               newFilteredGameData.vizziniAddAll(gameData);
               Reducer.sortGameData(newFilteredGameData);
               return Object.assign(
               {}, state,
               {
                  categoryMap: newCategoryMap,
                  designerMap: newDesignerMap,
                  filteredGameData: newFilteredGameData,
                  gameDataMap: newGameDataMap,
                  gameDetailMap: newGameDetailMap,
                  isDataLoaded: isDataLoaded,
                  mechanicMap: newMechanicMap,
                  usernameMap: newUsernameMap,
               });
            case Action.ADD_GAME_SUMMARIES:
               LOGGER.info("Reducer gameSummaryMap = " + action.gameSummaryMap + (action.gameSummaryMap !== undefined ? " length = " + Object.keys(action.gameSummaryMap).length : ""));
               newGameSummaryMap = Object.assign(
               {}, state.gameSummaryMap);
               Object.vizziniMerge(newGameSummaryMap, action.gameSummaryMap);
               return Object.assign(
               {}, state,
               {
                  gameSummaryMap: newGameSummaryMap,
               });
            case Action.ADD_USER_COLLECTION:
               LOGGER.info("Reducer gameCollectionMap = " + action.gameCollectionMap + (action.gameCollectionMap !== undefined ? " length = " + Object.keys(action.gameCollectionMap).length : ""));
               newGameCollectionMap = Object.assign(
               {}, state.gameCollectionMap);
               action.gameIds.forEach(function(id)
               {
                  var users = newGameCollectionMap[id];
                  var userId = state.usernames.indexOf(action.username);
                  var user = state.usernameMap[userId];
                  if (users === undefined)
                  {
                     newGameCollectionMap[id] = [user];
                  }
                  else
                  {
                     users.push(user);
                  }
               });
               return Object.assign(
               {}, state,
               {
                  gameCollectionMap: newGameCollectionMap,
               });
            case Action.REMOVE_FILTERS:
               LOGGER.info("Reducer remove filters");
               newFilteredGameData = [];
               newFilteredGameData.vizziniAddAll(Object.values(state.gameDataMap));
               Reducer.sortGameData(newFilteredGameData);
               return Object.assign(
               {}, state,
               {
                  filteredGameData: newFilteredGameData,
               });
            case Action.SET_DEFAULT_FILTERS:
               LOGGER.info("Reducer set default filters");
               newFilters = DefaultFilters.create();
               return Object.assign(
               {}, state,
               {
                  filters: newFilters,
               });
            case Action.SET_FILTERS:
               LOGGER.info("Reducer filters = " + action.filters);
               Object.getOwnPropertyNames(action.filters).forEach(function(columnKey)
               {
                  LOGGER.info(columnKey + ": " + action.filters[columnKey]);
               });
               newFilters = Object.assign(
               {}, state.filters);
               Object.vizziniMerge(newFilters, action.filters);
               newFilteredGameData = Reducer.filterGameData(Object.values(state.gameDataMap), newFilters);
               Reducer.saveToLocalStorage(newFilters);
               return Object.assign(
               {}, state,
               {
                  filters: newFilters,
                  filteredGameData: newFilteredGameData,
               });
            case Action.SET_GAME_DATABASE:
               LOGGER.info("Reducer gameDatabase = " + action.gameDatabase);
               return Object.assign(
               {}, state,
               {
                  gameDatabase: action.gameDatabase,
               });
            default:
               LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      Reducer.addGameData = function(state, gameDataMap, newGameDetailMap)
      {
         InputValidator.validateNotNull("state", state);
         InputValidator.validateNotNull("gameDataMap", gameDataMap);
         InputValidator.validateNotNull("newGameDetailMap", newGameDetailMap);

         Object.values(newGameDetailMap).forEach(function(gameDetail)
         {
            var gameSummary = this.findGameSummaryById(state, gameDetail.id);
            var gameCollections = this.findGameCollectionsById(state, gameDetail.id);
            gameDataMap[gameDetail.id] = GameData.createGameData(gameSummary, gameDetail, gameCollections);
         }, this);
      };

      Reducer.entityMap = function(state, newEntityMap, newEntities)
      {
         InputValidator.validateNotNull("state", state);
         InputValidator.validateNotNull("newEntityMap", newEntityMap);
         InputValidator.validateIsArray("newEntities", newEntities);

         newEntities.forEach(function(newEntity)
         {
            var entity = newEntityMap[newEntity.id];

            if (entity)
            {
               entity.count++;
            }
            else
            {
               newEntityMap[newEntity.id] = newEntity;
            }
         });
      };

      Reducer.filterGameData = function(gameData, filters)
      {
         InputValidator.validateNotNull("gameData", gameData);
         InputValidator.validateNotNull("filters", filters);

         var answer = gameData.filter(function(data)
         {
            return Reducer.passes(data, filters);
         });

         Reducer.sortGameData(answer);

         return answer;
      };

      Reducer.findGameCollectionsById = function(state, id)
      {
         return state.gameCollectionMap[id];
      };

      Reducer.findGameSummaryById = function(state, id)
      {
         return state.gameSummaryMap[id];
      };

      Reducer.passes = function(data, filters)
      {
         InputValidator.validateNotNull("data", data);
         InputValidator.validateNotNull("filters", filters);

         var answer = true;
         var propertyNames = Object.getOwnPropertyNames(filters);

         for (var i = 0; i < propertyNames.length; i++)
         {
            var propertyName = propertyNames[i];
            var filter = filters[propertyName];

            if (!filter.passes(data))
            {
               answer = false;
               break;
            }
         }

         return answer;
      };

      Reducer.saveToLocalStorage = function(filters)
      {
         InputValidator.validateNotNull("filters", filters);

         var filterObjects = [];

         Object.getOwnPropertyNames(filters).forEach(function(columnKey)
         {
            var filter = filters[columnKey];
            filterObjects.push(filter.toObject());
         });

         localStorage.filters = JSON.stringify(filterObjects);
      };

      Reducer.sortGameData = function(gameData)
      {
         gameData.sort(function(a, b)
         {
            return a.boardGameRank - b.boardGameRank;
         });
      };

      if (Object.freeze)
      {
         Object.freeze(Reducer);
      }

      return Reducer;
   });
