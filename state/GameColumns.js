const GameColumns = [
  {
    key: "usernames",
    label: "Owner",
    className: "displayInlineBlock"
  },
  {
    key: "boardGameRank",
    label: "Board Game Rank",
    className: "numberCell"
  },
  {
    key: "title",
    label: "Title",
    className: "textCell"
  },
  {
    key: "designers",
    label: "Designer"
  },
  {
    key: "yearPublished",
    label: "Year Published",
    className: "numberCell"
  },
  {
    key: "geekRating",
    label: "Geek Rating",
    className: "numberCell"
  },
  {
    key: "minPlayers",
    label: "Min. Players",
    className: "numberCell"
  },
  {
    key: "maxPlayers",
    label: "Max. Players",
    className: "numberCell"
  },
  {
    key: "bestWithPlayers",
    label: "Best with Players",
    className: "numberCell"
  },
  {
    key: "minPlayTime",
    label: "Min. Play Time",
    className: "numberCell"
  },
  {
    key: "maxPlayTime",
    label: "Max. Play Time",
    className: "numberCell"
  },
  {
    key: "averageWeight",
    label: "Complexity",
    className: "numberCell"
  },
  {
    key: "categories",
    label: "Category"
  },
  {
    key: "mechanics",
    label: "Mechanic"
  }
];

GameColumns.findByKey = key => {
  const columns = R.filter(col => col.key === key, GameColumns);

  return columns.length > 0 ? columns[0] : undefined;
};

export default GameColumns;
