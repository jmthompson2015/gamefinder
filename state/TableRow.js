import ASelector from "../artifact/Selector.js";

const TableRow = {};

TableRow.create = ({ gameSummary, gameDetail, users }) => {
  // gameSummary optional.
  // users optional.
  if (gameSummary && gameSummary.id !== gameDetail.id) {
    throw new Error(
      `ID mismatch: gameSummary.id = ${gameSummary.id} gameDetail.id = ${gameDetail.id}`
    );
  }

  const { boardGameRank1, geekRating1, id } = gameSummary;
  const {
    averageWeight,
    bestWithPlayers,
    boardGameRank: boardGameRank2,
    geekRating: geekRating2,
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

  const boardGameRank = boardGameRank1 || boardGameRank2;
  const geekRating = geekRating1 || geekRating2;

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

export default TableRow;
