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
  designers = [],
  categories = [],
  mechanics = []
}) =>
  Immutable({
    id,
    title,
    designers,
    yearPublished,
    minPlayers,
    maxPlayers,
    bestWithPlayers,
    minPlayTime,
    maxPlayTime,
    averageWeight,
    categories,
    mechanics
  });

Object.freeze(GameDetailState);

export default GameDetailState;
