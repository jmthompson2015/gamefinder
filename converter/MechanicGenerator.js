const R = require("ramda");

const FileLoader = require("./FileLoader.js");
const FileWriter = require("./FileWriter.js");

const MechanicGenerator = {};

const INPUT_FILE = "GameDetail.json";
const PROPERTY = "mechanics";
const OUTPUT_FILE = "../artifact/Mechanic.js";
const HEADER = `const Mechanic = `;
const FOOTER = `

export default Mechanic;`;

MechanicGenerator.convert = () => {
  FileLoader.loadLocalFile(INPUT_FILE).then(data => {
    const gameDetailMap = JSON.parse(data);
    const gameDetails = Object.values(gameDetailMap);

    const reduceFunction1 = (accum, detail) =>
      detail[PROPERTY] ? R.concat(detail[PROPERTY], accum) : accum;
    const allItem = R.reduce(reduceFunction1, [], gameDetails);

    const pipeFunction = R.pipe(
      R.dissoc("type"),
      R.dissoc("count")
    );
    const reduceFunction2 = (accum, item) => {
      const newItem = pipeFunction(item);
      return R.assoc(newItem.id, newItem, accum);
    };
    const itemMap = R.reduce(reduceFunction2, {}, allItem);

    const content = `${HEADER}${JSON.stringify(itemMap, null, "  ")}${FOOTER}`;
    FileWriter.writeFile(OUTPUT_FILE, content);
  });
};

MechanicGenerator.convert();