const R = require("ramda");

const FileLoader = require("./FileLoader.js");
const FileWriter = require("./FileWriter.js");

const DesignerGenerator = {};

const INPUT_FILE = "GameDetail.json";
const PROPERTY = "designers";
const OUTPUT_FILE = "../artifact/Designer.js";
const HEADER = `const Designer = `;
const FOOTER = `

Object.freeze(Designer);

export default Designer;`;

DesignerGenerator.convert = () => {
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
      const newItem = pipeFunction(item);
      return R.assoc(newItem.id, newItem, accum);
    };
    const itemMap = R.reduce(reduceFunction2, {}, allItem);

    const content = `${HEADER}${JSON.stringify(itemMap, null, "  ")}${FOOTER}`;
    FileWriter.writeFile(OUTPUT_FILE, content);
  });
};

DesignerGenerator.convert();
