import EntityUtils from "../state/EntityUtilities.js";
import Selector from "../state/Selector.js";

import EntityChartsPanel from "../view/EntityChartsPanel.js";

const createEntityMap = (gameDetails, entityName) =>
  R.cond([
    [R.equals("Categories"), R.always(EntityUtils.createCategoryMap(gameDetails))],
    [R.equals("Designers"), R.always(EntityUtils.createDesignerMap(gameDetails))],
    [R.equals("Mechanics"), R.always(EntityUtils.createMechanicMap(gameDetails))],
    [
      R.T,
      () => {
        throw new Error(`Unknown entityName: ${entityName}`);
      }
    ]
  ])(entityName);

const entityToCountFunction = entityMap => (accum, entityId) => {
  const item = entityMap[entityId];
  return R.assoc(entityId, item.count, accum);
};

const userEntityToCount = (state, allGameIds, entityName, userId) => {
  const userGameIds = Selector.userGames(state, userId);
  const gameIds = R.intersection(allGameIds, userGameIds);
  const gameDetails = R.map(gameId => Selector.gameDetail(state, gameId), gameIds);
  const entityMap = createEntityMap(gameDetails, entityName);

  return R.reduce(entityToCountFunction(entityMap), {}, Object.keys(entityMap));
};

const mapStateToProps = (state, ownProps) => {
  const { entityName } = ownProps;

  const allGameIds = R.map(row => row.id, Selector.filteredTableRows(state));
  const allGameDetails = R.map(gameId => Selector.gameDetail(state, gameId), allGameIds);
  const entityMap = createEntityMap(allGameDetails, entityName);

  const allToCount = R.reduce(entityToCountFunction(entityMap), {}, Object.keys(entityMap));
  const ghightshoeToCount = userEntityToCount(state, allGameIds, entityName, 1);
  const jmthompsonToCount = userEntityToCount(state, allGameIds, entityName, 2);
  const kmistrToCount = userEntityToCount(state, allGameIds, entityName, 3);
  const nicToCount = userEntityToCount(state, allGameIds, entityName, 4);

  const userToEntityToCount = {
    0: allToCount,
    1: ghightshoeToCount,
    2: jmthompsonToCount,
    3: kmistrToCount,
    4: nicToCount
  };

  return {
    entityMap,
    userToEntityToCount
  };
};

export default ReactRedux.connect(mapStateToProps)(EntityChartsPanel);
