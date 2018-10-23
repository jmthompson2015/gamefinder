import Category from "./Category.js";
import Designer from "./Designer.js";
import GameDetail from "./GameDetail.js";
import Mechanic from "./Mechanic.js";
import User from "./User.js";

const Selector = {};

Selector.categoriesByIds = ids => {
  const reduceFunction = (accum, id) => {
    const category = Selector.category(id);
    return category ? R.append(category, accum) : accum;
  };
  return R.reduce(reduceFunction, [], ids);
};

Selector.designersByIds = ids => {
  const reduceFunction = (accum, id) => {
    const designer = Selector.designer(id);
    return designer ? R.append(designer, accum) : accum;
  };
  return R.reduce(reduceFunction, [], ids);
};

Selector.mechanicsByIds = ids => {
  const reduceFunction = (accum, id) => {
    const mechanic = Selector.mechanic(id);
    return mechanic ? R.append(mechanic, accum) : accum;
  };
  return R.reduce(reduceFunction, [], ids);
};

Selector.userByName = name => {
  const users = R.filter(user => name === user.name, Object.values(User));
  return users.length > 0 ? users[0] : undefined;
};

Selector.userIds = () => R.map(user => user.id, Object.values(User));

Selector.usernames = () => R.map(user => user.name, Object.values(User));

Selector.usersByIds = ids => {
  const reduceFunction = (accum, id) => {
    const user = Selector.user(id);
    return user ? R.append(user, accum) : accum;
  };
  return R.reduce(reduceFunction, [], ids);
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
Selector.category = id => Category[id];

Selector.designer = id => Designer[id];

Selector.gameDetail = id => GameDetail[id];

Selector.mechanic = id => Mechanic[id];

Selector.user = id => User[id];

export default Selector;
