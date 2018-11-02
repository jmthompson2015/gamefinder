/* eslint no-console: ["error", { allow: ["log", "error"] }] */

const R = require("ramda");
const FileLoader = require("./FileLoader.js");

const EntityReporter = {};

EntityReporter.report = () => {
  FileLoader.loadLocalFile("UserGame.json").then(data1 => {
    const userToGame = JSON.parse(data1);
    FileLoader.loadLocalFile("GameDetail.json").then(data2 => {
      const gameToDetail = JSON.parse(data2);
      const userIds = Object.keys(userToGame);
      const userToCategories = {};
      const userToMechanics = {};
      const categoryMap = {};
      const mechanicMap = {};

      R.forEach(userId => {
        const { gameIds } = userToGame[userId];

        R.forEach(gameId => {
          const gameDetail = gameToDetail[gameId];
          const categoryIds = R.map(category => category.id, gameDetail.categories);

          // 1042: Expansion for Base-game
          if (gameDetail.boardGameRank || !categoryIds.includes(1042)) {
            R.forEach(category => {
              if (userToCategories[userId] === undefined) {
                userToCategories[userId] = {};
              }
              const count = userToCategories[userId][category.id];
              userToCategories[userId][category.id] = count === undefined ? 1 : count + 1;
              categoryMap[category.id] = category;
            }, gameDetail.categories);

            R.forEach(mechanic => {
              if (userToMechanics[userId] === undefined) {
                userToMechanics[userId] = {};
              }
              const count = userToMechanics[userId][mechanic.id];
              userToMechanics[userId][mechanic.id] = count === undefined ? 1 : count + 1;
              mechanicMap[mechanic.id] = mechanic;
            }, gameDetail.mechanics);
          }
        }, gameIds);
      }, userIds);

      console.log("Entity Report");
      R.forEach(userId => {
        const categoryIds = Object.keys(userToCategories[userId]);
        categoryIds.sort((a, b) => userToCategories[userId][b] - userToCategories[userId][a]);
        R.forEach(categoryId => {
          console.log(
            `${userId} ${categoryId} ${categoryMap[categoryId].name} ${
              userToCategories[userId][categoryId]
            }`
          );
        }, categoryIds);
        console.log();

        const mechanicIds = Object.keys(userToMechanics[userId]);
        mechanicIds.sort((a, b) => userToMechanics[userId][b] - userToMechanics[userId][a]);
        R.forEach(mechanicId => {
          console.log(
            `${userId} ${mechanicId} ${mechanicMap[mechanicId].name} ${
              userToMechanics[userId][mechanicId]
            }`
          );
        }, mechanicIds);
        console.log();
      }, userIds);
    });
  });
};

EntityReporter.report();
