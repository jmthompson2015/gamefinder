const Formatter = {};

Formatter.format = object => {
  if (Array.isArray(object)) {
    return Formatter.formatArray(object);
  }

  return Formatter.formatObject(object);
};

Formatter.formatArray = object => {
  if (Array.isArray(object)) {
    if (object.length === 1) {
      return Formatter.formatObject(object[0]);
    }

    if (object.length > 0) {
      const mapFunction = obj => Formatter.formatObject(obj);
      const newObjects = R.map(mapFunction, object);
      return `[${newObjects.join(", ")}]`;
    }
  }

  return undefined;
};

Formatter.formatEntities = entities => {
  if (Array.isArray(entities)) {
    if (entities.length === 1) {
      return entities[0].name;
    }

    if (entities.length > 0) {
      const mapFunction = entity => entity.name;
      const newEntities = R.map(mapFunction, R.sortBy(R.prop("name"), entities));
      return newEntities.join(", ");
    }
  }

  return undefined;
};

Formatter.formatObject = object => (object ? JSON.stringify(object, null, 1) : undefined);

export default Formatter;
