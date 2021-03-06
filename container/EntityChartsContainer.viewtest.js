import GameDetail from "../artifact/GameDetail.js";

import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";

import EntityChartsContainer from "./EntityChartsContainer.js";

const createStore1 = () => {
  const store = Redux.createStore(Reducer.root);
  store.dispatch(ActionCreator.addUserCollection(0, Object.keys(GameDetail)));
  store.dispatch(
    ActionCreator.addUserCollection(1, [
      74,
      478,
      1294,
      1406,
      2398,
      2448,
      2651,
      9209,
      25669,
      30549,
      36218,
      40849,
      51811,
      58708,
      66690,
      90850,
      104006,
      106662,
      123260,
      125921,
      136223,
      137136,
      137166,
      143789,
      143884,
      145196,
      161936,
      172225,
      198928,
      204053,
      221107
    ])
  );
  store.dispatch(
    ActionCreator.addUserCollection(2, [
      1198,
      2453,
      3090,
      3122,
      20022,
      28143,
      29368,
      34499,
      34583,
      37111,
      38453,
      40210,
      54043,
      66121,
      77423,
      84876,
      92932,
      94288,
      95338,
      98113,
      98634,
      100092,
      102104,
      102652,
      102875,
      103885,
      107933,
      110193,
      112064,
      114351,
      117929,
      119640,
      121900,
      123695,
      123755,
      123759,
      123763,
      123764,
      124185,
      126951,
      129430,
      129431,
      129432,
      129433,
      129480,
      130715,
      132020,
      133167,
      133597,
      134388,
      134389,
      134396,
      134946,
      137773,
      139413,
      140917,
      142527,
      142545,
      142546,
      142547,
      142875,
      146574,
      146757,
      146766,
      147020,
      147723,
      148259,
      150376,
      153130,
      153527,
      154493,
      154766,
      154767,
      154768,
      154769,
      156416,
      156770,
      160464,
      161031,
      161032,
      162886,
      163676,
      163686,
      163745,
      164165,
      164166,
      164168,
      164169,
      164313,
      164340,
      164665,
      166702,
      166704,
      166707,
      166708,
      168927,
      168928,
      168929,
      169017,
      169018,
      169786,
      170728,
      172680,
      173899,
      174565,
      175283,
      175284,
      175285,
      175287,
      176058,
      176742,
      176744,
      176819,
      176820,
      177163,
      177608,
      178862,
      180593,
      180695,
      181682,
      181683,
      182369,
      182370,
      182371,
      182373,
      182374,
      182930,
      183562,
      183966,
      183967,
      190087,
      198786,
      199451,
      199727,
      200454,
      201038,
      201039,
      201310,
      201311,
      201312,
      201313,
      201875,
      204853,
      205637,
      207580,
      207581,
      207582,
      208071,
      208072,
      208545,
      209728,
      210025,
      212317,
      212350,
      212351,
      212734,
      215510,
      216556,
      217973,
      219054,
      221725,
      223421,
      223422,
      223423,
      223555,
      224363,
      228391,
      233977,
      235365,
      235604,
      235605,
      235606,
      235607,
      235608,
      237192,
      237391,
      246718
    ])
  );
  store.dispatch(
    ActionCreator.addUserCollection(3, [
      13,
      258,
      325,
      891,
      926,
      2807,
      4101,
      4103,
      20022,
      23010,
      26696,
      27760,
      34691,
      40692,
      40770,
      40834,
      54998,
      65244,
      66098,
      68448,
      92539,
      104557,
      110794,
      111661,
      113294,
      125403,
      133993,
      135378,
      137166,
      144419,
      148228,
      155703,
      176173,
      192951
    ])
  );

  store.dispatch(ActionCreator.addGameDetails(Object.values(GameDetail)));

  return store;
};

const entityName = "Categories";
// const entityName = "Designers";
// const entityName = "Mechanics";
// const entityName = "bogus";

const store = createStore1();
store.dispatch(ActionCreator.setDisplayTab(entityName));

const container = React.createElement(EntityChartsContainer, { entityName });
const element = React.createElement(ReactRedux.Provider, { store }, container);

ReactDOM.render(element, document.getElementById("panel"));
