import ASelector from "../artifact/Selector.js";

const GameDataState = {};

GameDataState.create = ({ gameSummary, gameDetail, users }) => {
  // users optional.
  if (gameSummary.id !== gameDetail.id) {
    throw new Error(
      `ID mismatch: gameSummary.id = ${gameSummary.id} gameDetail.id = ${gameDetail.id}`
    );
  }

  const { boardGameRank, geekRating, id } = gameSummary;
  const {
    averageWeight,
    bestWithPlayers,
    maxPlayers,
    maxPlayTime,
    minPlayers,
    minPlayTime,
    title,
    yearPublished,
    categoryIds,
    designerIds,
    mechanicIds
  } = gameDetail;

  return Immutable({
    averageWeight,
    bestWithPlayers,
    boardGameRank,
    geekRating,
    id,
    maxPlayers,
    maxPlayTime,
    minPlayers,
    minPlayTime,
    title,
    users,
    yearPublished,
    categories: ASelector.categoriesByIds(categoryIds),
    designers: ASelector.designersByIds(designerIds),
    mechanics: ASelector.mechanicsByIds(mechanicIds)
  });
};

export default GameDataState;
