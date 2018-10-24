import ASelector from "../artifact/Selector.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameCollectionFetcher from "./GameCollectionFetcher.js";
import GameDetailFetcher from "./GameDetailFetcher.js";
import GameSummaryFetcher from "./GameSummaryFetcher.js";

const GameLoader = {};

GameLoader.load = store =>
  new Promise(resolve => {
    // Load from the internet.
    const start0 = Date.now();

    GameLoader.loadCollections(store).then(() => {
      const end0 = Date.now();
      store.dispatch(ActionCreator.setCollectionTime(end0 - start0));
      const start1 = Date.now();

      GameLoader.loadGameSummaries(store).then(gameSummaryMap => {
        const end1 = Date.now();
        store.dispatch(ActionCreator.setSummaryTime(end1 - start1));
        const start2 = Date.now();

        GameLoader.loadGameDetails(store, gameSummaryMap).then(() => {
          const end2 = Date.now();
          store.dispatch(ActionCreator.setDetailTime(end2 - start2));
          resolve();
        });
      });
    });
  });

GameLoader.loadCollections = store =>
  new Promise(resolve => {
    const receiveCollection = ({ userId, collectionIds }) => {
      if (collectionIds.length > 0) {
        store.dispatch(ActionCreator.addUserCollection(userId, collectionIds));
      }

      if (Selector.isCollectionsLoaded(store.getState())) {
        const gameToUsers = Selector.gameToUsers(store.getState());
        resolve(gameToUsers);
      }
    };

    const usernames = ASelector.usernames();
    usernames.forEach(username => {
      GameCollectionFetcher.fetchData(username).then(receiveCollection);
    });
  });

GameLoader.loadGameDetails = (store, gameSummaryMap) =>
  new Promise(resolve => {
    const receiveDetailData = newGameDetailMap => {
      store.dispatch(ActionCreator.addGameDetails(newGameDetailMap));

      if (Selector.isDetailsLoaded(store.getState())) {
        const gameDetailMap = Selector.gameDetailMap(store.getState());
        resolve(gameDetailMap);
      }
    };

    // Fetch a game detail for each game summary.
    const keys = Object.keys(gameSummaryMap);

    const needGameDetailIds = keys.filter(
      key => Selector.findGameDetailById(store.getState(), key) === undefined,
      this
    );

    if (needGameDetailIds.length > 0) {
      const numPerCall = 50;
      const count = Math.ceil(needGameDetailIds.length / numPerCall);

      for (let i = 0; i < count; i += 1) {
        const start = numPerCall * i;
        const max = Math.min(numPerCall, needGameDetailIds.length);
        const end = start + max;
        GameDetailFetcher.fetchData(needGameDetailIds.slice(start, end)).then(receiveDetailData);
      }
    }
  });

GameLoader.loadGameSummaries = store =>
  new Promise(resolve => {
    const receiveSummaryData = newGameSummaryMap => {
      store.dispatch(ActionCreator.addGameSummaries(newGameSummaryMap));

      if (Selector.isSummariesLoaded(store.getState())) {
        const gameSummaryMap = Selector.gameSummaryMap(store.getState());
        resolve(gameSummaryMap);
      }
    };

    const pageCount = Selector.pageCount(store.getState());

    for (let i = 1; i <= pageCount; i += 1) {
      GameSummaryFetcher.fetchData(i).then(receiveSummaryData);
    }
  });

export default GameLoader;
