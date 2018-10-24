const GameCollectionState = {};

GameCollectionState.create = ({ userId, gameIds = [] }) => Immutable({ userId, gameIds });

Object.freeze(GameCollectionState);

export default GameCollectionState;
