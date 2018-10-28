import EntityFilter from "./EntityFilter.js";
import GameColumns from "./GameColumns.js";
import RangeFilter from "./RangeFilter.js";

const DefaultFilters = {};

DefaultFilters.entityColumns = Immutable([
  GameColumns[0], // usernames
  GameColumns[3], // designers
  GameColumns[12], // categories
  GameColumns[13] // mechanics
]);

DefaultFilters.rangeColumns = Immutable([
  GameColumns[1], // boardGameRank
  GameColumns[4], // yearPublished
  GameColumns[5], // geekRating
  GameColumns[6], // minPlayers
  GameColumns[7], // maxPlayers
  GameColumns[8], // bestWithPlayers
  GameColumns[9], // minPlayTime
  GameColumns[10], // maxPlayTime
  GameColumns[11] // averageWeight
]);

const createEntityFilters = () =>
  R.reduce(
    (accum, column) => {
      const filter = EntityFilter.create({ columnKey: column.key });
      return R.assoc(column.key, filter, accum);
    },
    {},
    DefaultFilters.entityColumns
  );

const createRangeFilters = () =>
  R.reduce(
    (accum, column) => {
      const minValue = 1;
      const maxValue = 10;
      let filter;

      switch (column.key) {
        case "boardGameRank":
          filter = RangeFilter.create({ columnKey: column.key, minValue, maxValue: 100 });
          break;
        case "yearPublished":
          filter = RangeFilter.create({ columnKey: column.key, minValue: 2007, maxValue: 2017 });
          break;
        case "geekRating":
          filter = RangeFilter.create({
            columnKey: column.key,
            isMinEnabled: true,
            minValue: 7,
            maxValue
          });
          break;
        case "minPlayers":
          filter = RangeFilter.create({
            columnKey: column.key,
            minValue: 2,
            isMaxEnabled: true,
            maxValue: 3
          });
          break;
        case "maxPlayers":
          filter = RangeFilter.create({
            columnKey: column.key,
            isMinEnabled: true,
            minValue: 4,
            maxValue: 6
          });
          break;
        case "bestWithPlayers":
          filter = RangeFilter.create({ columnKey: column.key, minValue: 3, maxValue: 4 });
          break;
        case "minPlayTime":
          filter = RangeFilter.create({
            columnKey: column.key,
            isMinEnabled: true,
            minValue: 30,
            maxValue: 90
          });
          break;
        case "maxPlayTime":
          filter = RangeFilter.create({
            columnKey: column.key,
            minValue: 30,
            isMaxEnabled: true,
            maxValue: 90
          });
          break;
        case "averageWeight":
          filter = RangeFilter.create({
            columnKey: column.key,
            isMinEnabled: true,
            minValue: 1.5,
            isMaxEnabled: true,
            maxValue: 3.2
          });
          break;
        default:
          filter = RangeFilter.create({ columnKey: column.key, minValue, maxValue });
      }

      return R.assoc(column.key, filter, accum);
    },
    {},
    DefaultFilters.rangeColumns
  );

DefaultFilters.create = () => {
  const entityFilters = createEntityFilters();
  const rangeFilters = createRangeFilters();

  return R.merge(entityFilters, rangeFilters);
};

export default DefaultFilters;
