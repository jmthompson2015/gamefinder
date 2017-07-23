define(["process/Action", "process/GameCollectionFetcher", "process/GameDetailFetcher", "process/GameSummaryFetcher"],
   function(Action, GameCollectionFetcher, GameDetailFetcher, GameSummaryFetcher)
   {
      "use strict";

      function GameDatabase(store, pageCount, callback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateInRange("pageCount", pageCount, 1, 10);
         // callback optional.

         var that = this;
         var usernameToReceivedMap = {};

         var collectionCallback;
         var summaryCallback;
         var detailCallback;

         this.store = function()
         {
            return store;
         };

         this.pageCount = function()
         {
            return pageCount;
         };

         this.callback = function()
         {
            return callback;
         };

         this.gameCollectionMap = function()
         {
            return store.getState().gameCollectionMap;
         };

         this.gameDetailMap = function()
         {
            return store.getState().gameDetailMap;
         };

         this.gameSummaryMap = function()
         {
            return store.getState().gameSummaryMap;
         };

         this.usernameToReceivedMap = function()
         {
            return usernameToReceivedMap;
         };

         this.usernames = function()
         {
            return store.getState().usernames;
         };

         this.receiveCollection = function(username, collectionIds)
         {
            InputValidator.validateNotNull("username", username);
            InputValidator.validateNotNull("collectionIds", collectionIds);
            // LOGGER.info("GameDatabase.receiveCollection(" + username + ") collectionIds.length = " + collectionIds.length);

            if (collectionIds.length > 0)
            {
               usernameToReceivedMap[username] = true;
               store.dispatch(Action.addUserCollection(username, collectionIds));
            }

            if (this.isCollectionsLoaded())
            {
               this.collectionCallback(this.gameCollectionMap());
            }
         };

         this.receiveDetailData = function(newGameDetailMap)
         {
            InputValidator.validateNotNull("newGameDetailMap", newGameDetailMap);
            // LOGGER.info("GameDatabase.receiveDetailData() newGameDetailMap length = " + Object.keys(newGameDetailMap).length);

            store.dispatch(Action.addGameDetails(newGameDetailMap));

            if (this.detailCallback)
            {
               this.detailCallback(this.gameDetailMap());
            }
         };

         this.receiveSummaryData = function(newGameSummaryMap)
         {
            InputValidator.validateNotNull("newGameSummaryMap", newGameSummaryMap);
            // LOGGER.info("GameDatabase.receiveSummaryData() newGameSummaryMap length = " + Object.keys(newGameSummaryMap).length);

            store.dispatch(Action.addGameSummaries(newGameSummaryMap));

            if (this.isSummariesLoaded() && this.summaryCallback)
            {
               this.summaryCallback(this.gameSummaryMap());
            }
         };
      }

      GameDatabase.prototype.findGameCollectionsById = function(id)
      {
         return this.gameCollectionMap()[id];
      };

      GameDatabase.prototype.findGameDetailById = function(id)
      {
         return this.gameDetailMap()[id];
      };

      GameDatabase.prototype.findGameSummaryById = function(id)
      {
         return this.gameSummaryMap()[id];
      };

      GameDatabase.prototype.isCollectionsLoaded = function()
      {
         var usernames = this.usernames();
         var usernameToReceivedMap = this.usernameToReceivedMap();

         return usernames.reduce(function(accumulator, username)
         {
            return accumulator && (usernameToReceivedMap[username] === true);
         }, true);
      };

      GameDatabase.prototype.isDetailsLoaded = function()
      {
         var length = Object.keys(this.gameDetailMap()).length;
         var pageCount = this.pageCount();

         return (length === pageCount * 100);
      };

      GameDatabase.prototype.isSummariesLoaded = function()
      {
         var length = Object.keys(this.gameSummaryMap()).length;
         var pageCount = this.pageCount();

         return (length === pageCount * 100);
      };

      GameDatabase.prototype.load = function()
      {
         // Load from the internet.
         var collectionCallback = function(gameCollectionMap)
         {
            var summaryCallback = function(gameSummaryMap)
            {
               var detailCallback = function(gameDetailMap)
               {
                  var callback = this.callback();
                  callback(gameDetailMap);
               };

               this.loadGameDetails(gameSummaryMap, detailCallback);
            };

            this.loadGameSummaries(summaryCallback);
         };

         this.loadCollections(collectionCallback);
      };

      GameDatabase.prototype.loadCollections = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         this.collectionCallback = callback;
         var usernames = this.usernames();

         usernames.forEach(function(username)
         {
            var fetcher = new GameCollectionFetcher(username, this.receiveCollection.bind(this));

            setTimeout(function()
            {
               fetcher.fetchData();
            }, 50);
         }, this);
      };

      GameDatabase.prototype.loadGameDetails = function(newGameSummaryMap, callback)
      {
         InputValidator.validateNotNull("newGameSummaryMap", newGameSummaryMap);
         InputValidator.validateNotNull("callback", callback);

         // Fetch a game detail for each game summary.
         this.detailCallback = callback;
         var keys = Object.keys(newGameSummaryMap);
         // LOGGER.info("GameDatabase.loadGameDetails() keys.length = " + keys.length);

         var needGameDetailIds = keys.filter(function(key)
         {
            return this.findGameDetailById(key) === undefined;
         }, this);
         // LOGGER.info("GameDatabase.loadGameDetails() needGameDetailIds.length = " + needGameDetailIds.length);

         if (needGameDetailIds.length > 0)
         {
            var numPerCall = 50;
            var count = Math.ceil(needGameDetailIds.length / numPerCall);

            for (var i = 0; i < count; i++)
            {
               var start = numPerCall * i;
               var max = Math.min(numPerCall, needGameDetailIds.length);
               var end = start + max;
               var fetcher = new GameDetailFetcher(needGameDetailIds.slice(start, end), this.receiveDetailData.bind(this));
               fetcher.fetchData();
            }
         }
      };

      GameDatabase.prototype.loadGameSummaries = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         this.summaryCallback = callback;
         var pageCount = this.pageCount();

         for (var i = 1; i <= pageCount; i++)
         {
            var fetcher = new GameSummaryFetcher(i, this.receiveSummaryData.bind(this));
            fetcher.fetchData();
         }
      };

      return GameDatabase;
   });
