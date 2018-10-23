const R = require("ramda");

const FileLoader = require("./FileLoader.js");
const FileWriter = require("./FileWriter.js");

const GameDetailConverter = {};

const INPUT_FILE = "GameDetail.json";
const OUTPUT_FILE = "../artifact/GameDetail.js";
const HEADER = `const GameDetail = `;
const FOOTER = `

Object.freeze(GameDetail);

export default GameDetail;`;

const replaceCategories = gameDetail => {
  const categoryIds = R.map(category => category.id, gameDetail.categories);

  return R.pipe(
    R.dissoc("categories"),
    R.assoc("categoryIds", categoryIds)
  )(gameDetail);
};

const replaceDesigners = gameDetail => {
  const designerIds = R.map(designer => designer.id, gameDetail.designers);

  return R.pipe(
    R.dissoc("designers"),
    R.assoc("designerIds", designerIds)
  )(gameDetail);
};

const replaceMechanics = gameDetail => {
  const mechanicIds = R.map(mechanic => mechanic.id, gameDetail.mechanics);

  return R.pipe(
    R.dissoc("mechanics"),
    R.assoc("mechanicIds", mechanicIds)
  )(gameDetail);
};

GameDetailConverter.convert = () => {
  FileLoader.loadLocalFile(INPUT_FILE).then(data => {
    const gameDetails0 = JSON.parse(data);
    const gameDetails1 = R.map(gameDetail => replaceCategories(gameDetail), gameDetails0);
    const gameDetails2 = R.map(gameDetail => replaceDesigners(gameDetail), gameDetails1);
    const gameDetails = R.map(gameDetail => replaceMechanics(gameDetail), gameDetails2);

    const content = `${HEADER}${JSON.stringify(gameDetails, null, "  ")}${FOOTER}`;
    FileWriter.writeFile(OUTPUT_FILE, content);
  });
};

GameDetailConverter.convert();
