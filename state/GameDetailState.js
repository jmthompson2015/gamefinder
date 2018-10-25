const GameDetailState = {};

GameDetailState.create = ({
  id,
  boardGameRank,
  title,
  yearPublished,
  geekRating,
  minPlayers,
  maxPlayers,
  bestWithPlayers,
  minPlayTime,
  maxPlayTime,
  averageWeight,
  categoryIds = [],
  designerIds = [],
  mechanicIds = []
}) =>
  Immutable({
    id,
    boardGameRank,
    title,
    yearPublished,
    geekRating,
    minPlayers,
    maxPlayers,
    bestWithPlayers,
    minPlayTime,
    maxPlayTime,
    averageWeight,
    categoryIds,
    designerIds,
    mechanicIds
  });

Object.freeze(GameDetailState);

export default GameDetailState;
