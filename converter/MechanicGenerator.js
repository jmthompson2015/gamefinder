const R = require("ramda");

const CharacterConverter = require("./CharacterConverter.js");
const FileLoader = require("./FileLoader.js");
const FileWriter = require("./FileWriter.js");

const MechanicGenerator = {};

const INPUT_FILE = "GameDetail.json";
const PROPERTY = "mechanics";
const OUTPUT_FILE = "../artifact/Mechanic.js";
const HEADER = `const Mechanic = `;
const FOOTER = `

Object.freeze(Mechanic);

export default Mechanic;`;

MechanicGenerator.convert = () => {
  FileLoader.loadLocalFile(INPUT_FILE).then(data => {
    const gameToDetail = JSON.parse(data);
    const gameDetails = Object.values(gameToDetail);

    const reduceFunction1 = (accum, detail) =>
      detail[PROPERTY] ? R.concat(detail[PROPERTY], accum) : accum;
    const allItem = R.reduce(reduceFunction1, [], gameDetails);

    const pipeFunction = R.pipe(
      R.dissoc("type"),
      R.dissoc("count")
    );
    const reduceFunction2 = (accum, item) => {
      const newItem0 = pipeFunction(item);
      const newName = CharacterConverter.convert(newItem0.name);
      const newItem = R.assoc("name", newName, newItem0);
      return R.assoc(newItem.id, newItem, accum);
    };
    const itemMap = R.reduce(reduceFunction2, {}, allItem);

    const content = `${HEADER}${JSON.stringify(itemMap, null, "  ")}${FOOTER}`;
    FileWriter.writeFile(OUTPUT_FILE, content);
  });
};

MechanicGenerator.convert();
