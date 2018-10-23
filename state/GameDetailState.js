const GameDetailState = {};

GameDetailState.create = ({
  id,
  title,
  yearPublished,
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
    title,
    yearPublished,
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
