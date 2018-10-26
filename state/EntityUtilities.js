import Category from "../artifact/Category.js";
import Designer from "../artifact/Designer.js";
import Mechanic from "../artifact/Mechanic.js";

const EntityUtilities = {};

const concatEntityIds = idProperty => (accum, detail) => R.concat(accum, detail[idProperty]);

const createIdToCount = R.countBy(r => r);

const createObj = (type, idToCount, id) => ({ name: type[id].name, count: idToCount[id] });

const createMap = (details, idProperty, type) => {
  const ids = R.reduce(concatEntityIds(idProperty), [], details);
  const idToCount = createIdToCount(ids);
  const reduceFunction = (accum, id) => R.assoc(id, createObj(type, idToCount, id), accum);

  return R.reduce(reduceFunction, {}, ids);
};

EntityUtilities.createCategoryMap = details => createMap(details, "categoryIds", Category);

EntityUtilities.createDesignerMap = details => createMap(details, "designerIds", Designer);

EntityUtilities.createMechanicMap = details => createMap(details, "mechanicIds", Mechanic);

export default EntityUtilities;
