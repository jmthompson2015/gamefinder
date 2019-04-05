import User from "../artifact/User.js";

import ChartComponent from "./ChartComponent.js";
import ReactUtils from "./ReactUtilities.js";

const comparator = (entityMap, entityToCount) => (a, b) => {
  let answer = entityToCount[b] - entityToCount[a];

  if (answer === 0 && entityMap[a] && entityMap[b]) {
    const nameA = entityMap[a].name;
    const nameB = entityMap[b].name;

    if (nameA === nameB) {
      answer = 0;
    } else if (nameA < nameB) {
      answer = -1;
    } else {
      answer = 1;
    }
  }

  return answer;
};

const createBackgroundColor = (color, size) => Array.from(Array(size), () => color);

const createData = (entityMap, entityToCount, color) => {
  const keys0 = Object.keys(entityToCount);
  const keys = R.map(key => parseInt(key, 10), keys0);
  const filteredKeys = keys;
  const sortedKeys0 = filteredKeys;
  sortedKeys0.sort(comparator(entityMap, entityToCount));
  const sortedKeys = sortedKeys0.slice(0, 15);
  const labels = R.map(key => {
    if (entityMap === undefined) {
      throw new Error("entityMap === undefined");
    }
    if (entityMap[key] === undefined) {
      throw new Error(`entityMap[${key}] === undefined`);
    }
    return entityMap[key].name;
  }, sortedKeys);
  const sortedValues = R.map(key => entityToCount[key], sortedKeys);
  const backgroundColor = createBackgroundColor(color, sortedKeys.length);

  return {
    labels,
    datasets: [{ backgroundColor, data: sortedValues }]
  };
};

const OPTIONS = Immutable({
  legend: { display: false },
  maintainAspectRatio: true,
  responsive: false,
  scales: {
    xAxes: [{ ticks: { beginAtZero: true } }],
    yAxes: [{ ticks: { beginAtZero: true } }]
  }
});

class EntityChartsPanel extends React.PureComponent {
  render() {
    const { entityMap, userToEntityToCount } = this.props;

    const userIds = R.map(key => parseInt(key, 10), Object.keys(userToEntityToCount));
    const reduceFunction = (accum, userId) => {
      const chartCanvasId = `chartCanvas${userId}`;
      const entityToCount = userToEntityToCount[userId];
      const title = userId === 0 ? "All" : User[userId].name;
      const color = R.cond([
        [R.equals(1), R.always("red")],
        [R.equals(2), R.always("green")],
        [R.equals(3), R.always("blue")],
        [R.equals(4), R.always("gold")],
        [R.T, R.always("gray")]
      ])(userId);
      const data = createData(entityMap, entityToCount, color);
      const options = R.merge(OPTIONS, { title: { display: true, text: title } });
      const element = React.createElement(ChartComponent, {
        key: chartCanvasId,
        chartCanvasId,
        data,
        options
      });
      return R.append(element, accum);
    };
    const cells = R.reduce(reduceFunction, [], userIds);

    return ReactUtils.createFlexboxWrap(cells, "entityChartsPanel", "bg-white");
  }
}

EntityChartsPanel.propTypes = {
  entityMap: PropTypes.shape().isRequired,
  userToEntityToCount: PropTypes.shape().isRequired
};

export default EntityChartsPanel;
