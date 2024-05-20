import ASelector from "../artifact/Selector.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameCollectionFetcher from "./GameCollectionFetcher.js";
import GameDetailFetcher from "./GameDetailFetcher.js";
import GameSummaryFetcher from "./GameSummaryFetcher.js";

const GameLoader = {};

GameLoader.load = (store) =>
  new Promise((resolve) => {
    // Load from the internet.
    const start0 = Date.now();

    store.dispatch(ActionCreator.setCollectionBusy(true));
    GameLoader.loadCollections(store)
      .then(() => {
        const end0 = Date.now();
        store.dispatch(ActionCreator.setCollectionBusy(false));
        store.dispatch(ActionCreator.setCollectionTime(end0 - start0));
        const start1 = Date.now();

        store.dispatch(ActionCreator.setWishlistBusy(true));
        GameLoader.loadWishlists(store)
          .then(() => {
            const end1 = Date.now();
            store.dispatch(ActionCreator.setWishlistBusy(false));
            store.dispatch(ActionCreator.setWishlistTime(end1 - start1));
            const start2 = Date.now();

            store.dispatch(ActionCreator.setSummaryBusy(true));
            GameLoader.loadGameSummaries(store)
              .then(() => {
                const end2 = Date.now();
                store.dispatch(ActionCreator.setSummaryBusy(false));
                store.dispatch(ActionCreator.setSummaryTime(end2 - start2));
                const start3 = Date.now();

                store.dispatch(ActionCreator.setDetailBusy(true));
                GameLoader.loadGameDetails(store)
                  .then(() => {
                    const end3 = Date.now();
                    store.dispatch(ActionCreator.setDetailBusy(false));
                    store.dispatch(ActionCreator.setDetailTime(end3 - start3));
                    resolve();
                  })
                  .catch((error) => {
                    store.dispatch(ActionCreator.setDetailError(error));
                  });
              })
              .catch((error) => {
                store.dispatch(ActionCreator.setSummaryError(error));
              });
          })
          .catch((error) => {
            store.dispatch(ActionCreator.setWishlistError(error));
          });
      })
      .catch((error) => {
        store.dispatch(ActionCreator.setCollectionError(error));
      });
  });

GameLoader.loadCollections = (store) =>
  new Promise((resolve) => {
    const receiveCollection = ({ userId, gameIds }) => {
      if (gameIds.length > 0) {
        store.dispatch(ActionCreator.addUserCollection(userId, gameIds));
      }

      if (Selector.isCollectionsLoaded(store.getState())) {
        resolve(store.getState().gameToUsers);
      }
    };

    const usernames = ASelector.usernames();
    usernames.forEach((username) => {
      GameCollectionFetcher.fetchData(username).then(receiveCollection);
    });
  });

GameLoader.loadGameDetails = (store) =>
  new Promise((resolve) => {
    const receiveDetailData = (gameDetails) => {
      store.dispatch(ActionCreator.addGameDetails(gameDetails));

      if (Selector.isDetailsLoaded(store.getState())) {
        resolve(store.getState().gameToDetail);
      }
    };

    // Fetch a game detail for each game summary.
    const gameIds = Selector.gameIdsFromCollectionsAndSummaries(
      store.getState(),
    );

    const needGameDetailIds = gameIds.filter(
      (gameId) => store.getState().gameToDetail[gameId] === undefined,
      this,
    );

    if (needGameDetailIds.length > 0) {
      const numPerCall = 50;
      const count = Math.ceil(needGameDetailIds.length / numPerCall);

      for (let i = 0; i < count; i += 1) {
        const start = numPerCall * i;
        const max = Math.min(numPerCall, needGameDetailIds.length);
        const end = start + max;
        GameDetailFetcher.fetchData(needGameDetailIds.slice(start, end)).then(
          receiveDetailData,
        );
      }
    }
  });

GameLoader.loadGameSummaries = (store) =>
  new Promise((resolve) => {
    const receiveSummaryData = ({ page, gameSummaries }) => {
      store.dispatch(ActionCreator.addGameSummaries(page, gameSummaries));

      if (Selector.isSummariesLoaded(store.getState())) {
        resolve(Object.values(store.getState().gameToSummary));
      }
    };

    const pageCount = Selector.pageCount(store.getState());

    for (let i = 1; i <= pageCount; i += 1) {
      GameSummaryFetcher.fetchData(i).then(receiveSummaryData);
    }
  });

GameLoader.loadWishlists = (store) =>
  new Promise((resolve) => {
    const receiveCollection = ({ userId, gameIds }) => {
      store.dispatch(ActionCreator.addUserWishlist(userId, gameIds));

      if (Selector.isWishlistsLoaded(store.getState())) {
        resolve(store.getState().wishToUsers);
      }
    };

    const usernames = ASelector.usernames();
    usernames.forEach((username) => {
      GameCollectionFetcher.fetchData(username, true).then(receiveCollection);
    });
  });

export default GameLoader;
