define(["DefaultFilters", "GameData", "InitialState", "process/Action", "process/Selector"],
   function(DefaultFilters, GameData, InitialState, Action, Selector)
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

         var gameData, newCategoryMap, newDesignerMap, newFilteredGameData, newFilters, newGameCollectionMap, newGameDataMap, newGameDetailMap, newGameSummaryMap, newMechanicMap, newUsernameMap;

         switch (action.type)
         {
            case Action.ADD_GAME_DETAILS:
               LOGGER.info("Reducer gameDetailMap length = " + Object.keys(action.gameDetailMap).length);
               newGameDetailMap = state.gameDetailMap.merge(action.gameDetailMap);
               newGameDataMap = Reducer.addGameData(state, state.gameDataMap, action.gameDetailMap);
               newCategoryMap = Object.assign(
               {}, state.categoryMap);
               newDesignerMap = Object.assign(
               {}, state.designerMap);
               newMechanicMap = Object.assign(
               {}, state.mechanicMap);
               var gameDetailKeys = action.gameDetailMap.keySeq().toArray();
               gameDetailKeys.forEach(function(id)
               {
                  var gameDetail = action.gameDetailMap.get(parseInt(id));
                  Reducer.entityMap(state, newCategoryMap, gameDetail.get("categories"));
                  Reducer.entityMap(state, newDesignerMap, gameDetail.get("designers"));
                  Reducer.entityMap(state, newMechanicMap, gameDetail.get("mechanics"));
                  var users = Selector.findGameCollectionsById(state, parseInt(id));
                  if (users && users.length > 0)
                  {
                     users.forEach(function(user)
                     {
                        user.count++;
                     });
                  }
               });
               gameData = Immutable.List(newGameDataMap.toIndexedSeq().toArray());
               var isDataLoaded = (Selector.gameTotal(state) === gameData.size);
               newFilteredGameData = Reducer.sortGameData(gameData);
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
               });
            case Action.ADD_GAME_SUMMARIES:
               LOGGER.info("Reducer gameSummaryMap.size = " + action.gameSummaryMap.size);
               newGameSummaryMap = state.gameSummaryMap.merge(action.gameSummaryMap);
               return Object.assign(
               {}, state,
               {
                  gameSummaryMap: newGameSummaryMap,
               });
            case Action.ADD_USER_COLLECTION:
               LOGGER.info("Reducer gameIds.length = " + action.gameIds.length);
               var newUsernameToReceivedMap = state.usernameToReceivedMap.set(action.username, true);
               newGameCollectionMap = state.gameCollectionMap;
               action.gameIds.forEach(function(id)
               {
                  var users = Selector.findGameCollectionsById(state, parseInt(id));
                  var userId = state.usernames.indexOf(action.username);
                  var user = state.usernameMap[userId];
                  if (users === undefined)
                  {
                     users = [];
                  }
                  users.push(user);
                  newGameCollectionMap = newGameCollectionMap.set(id, users);
               });
               return Object.assign(
               {}, state,
               {
                  gameCollectionMap: newGameCollectionMap,
                  usernameToReceivedMap: newUsernameToReceivedMap,
               });
            case Action.REMOVE_FILTERS:
               LOGGER.info("Reducer remove filters");
               gameData = Immutable.List(state.gameDataMap.toIndexedSeq().toArray());
               newFilteredGameData = Reducer.sortGameData(gameData);
               return Object.assign(
               {}, state,
               {
                  filteredGameData: newFilteredGameData,
               });
            case Action.SET_COLLECTION_TIME:
               LOGGER.info("Reducer collectionTime = " + action.time);
               return Object.assign(
               {}, state,
               {
                  collectionTime: action.time,
               });
            case Action.SET_DEFAULT_FILTERS:
               LOGGER.info("Reducer set default filters");
               newFilters = DefaultFilters.create();
               return Object.assign(
               {}, state,
               {
                  filters: newFilters,
               });
            case Action.SET_DETAIL_TIME:
               LOGGER.info("Reducer detailTime = " + action.time);
               return Object.assign(
               {}, state,
               {
                  detailTime: action.time,
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
               gameData = Immutable.List(state.gameDataMap.toIndexedSeq().toArray());
               newFilteredGameData = Reducer.filterGameData(gameData, newFilters);
               Reducer.saveToLocalStorage(newFilters);
               return Object.assign(
               {}, state,
               {
                  filters: newFilters,
                  filteredGameData: newFilteredGameData,
               });
            case Action.SET_PAGE_COUNT:
               LOGGER.info("Reducer pageCount = " + action.pageCount);
               return Object.assign(
               {}, state,
               {
                  pageCount: action.pageCount,
               });
            case Action.SET_SUMMARY_TIME:
               LOGGER.info("Reducer summaryTime = " + action.time);
               return Object.assign(
               {}, state,
               {
                  summaryTime: action.time,
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

         var gameDetails = newGameDetailMap.toIndexedSeq().toArray();

         gameDetails.forEach(function(gameDetail)
         {
            var gameSummary = Selector.findGameSummaryById(state, parseInt(gameDetail.get("id")));
            var gameCollections = Selector.findGameCollectionsById(state, parseInt(gameDetail.get("id")));
            gameDataMap = gameDataMap.set(gameDetail.get("id"), GameData.createGameData(gameSummary, gameDetail, gameCollections));
         }, this);

         return gameDataMap;
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

         return Reducer.sortGameData(answer);
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
         return gameData.sort(function(a, b)
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
