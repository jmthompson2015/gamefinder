import EntityFilter from "./EntityFilter.js";
import GameColumns from "./GameColumns.js";
import RangeFilter from "./RangeFilter.js";

const DefaultFilters = {
  entityColumns: [],
  rangeColumns: []
};

DefaultFilters.create = () => {
  const filters = {};

  DefaultFilters.entityColumns.forEach(column => {
    const values = [];
    const filter = EntityFilter.create({ columnKey: column.key, values });
    filters[column.key] = filter;
  });

  DefaultFilters.rangeColumns.forEach(column => {
    const minValue = 1;
    const maxValue = 10;
    let filter;

    switch (column.key) {
      case "boardGameRank":
        filter = RangeFilter.create({ columnKey: column.key, minValue: 1, maxValue: 100 });
        break;
      case "yearPublished":
        filter = RangeFilter.create({ columnKey: column.key, minValue: 2007, maxValue: 2017 });
        break;
      case "geekRating":
        filter = RangeFilter.create({
          columnKey: column.key,
          isMinEnabled: true,
          minValue: 7,
          maxValue: 10
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

    filters[column.key] = filter;
  });

  return filters;
};

DefaultFilters.initialize = () => {
  DefaultFilters.entityColumns.push(GameColumns[0]); // usernames
  DefaultFilters.entityColumns.push(GameColumns[3]); // designers
  DefaultFilters.entityColumns.push(GameColumns[12]); // categories
  DefaultFilters.entityColumns.push(GameColumns[13]); // mechanics

  DefaultFilters.rangeColumns.push(GameColumns[1]); // boardGameRank
  DefaultFilters.rangeColumns.push(GameColumns[4]); // yearPublished
  DefaultFilters.rangeColumns.push(GameColumns[5]); // geekRating
  DefaultFilters.rangeColumns.push(GameColumns[6]); // minPlayers
  DefaultFilters.rangeColumns.push(GameColumns[7]); // maxPlayers
  DefaultFilters.rangeColumns.push(GameColumns[8]); // bestWithPlayers
  DefaultFilters.rangeColumns.push(GameColumns[9]); // minPlayTime
  DefaultFilters.rangeColumns.push(GameColumns[10]); // maxPlayTime
  DefaultFilters.rangeColumns.push(GameColumns[11]); // averageWeight
};

DefaultFilters.initialize();

export default DefaultFilters;
