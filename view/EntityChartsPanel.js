import User from "../artifact/User.js";

import EntityChart from "./EntityChart.js";
import ReactUtils from "./ReactUtilities.js";

class EntityChartsPanel extends React.Component {
  render() {
    const { entityMap, isDisplayed, userToEntityToCount } = this.props;

    if (isDisplayed) {
      const userIds = R.map(key => parseInt(key, 10), Object.keys(userToEntityToCount));
      const reduceFunction = (accum, userId) => {
        const chartCanvasId = `chartCanvas${userId}`;
        const entityToCount = userToEntityToCount[userId];
        const title = userId === 0 ? "All" : User[userId].name;
        const color = R.cond([
          [R.equals(1), R.always("red")],
          [R.equals(2), R.always("green")],
          [R.equals(3), R.always("blue")],
          [R.T, R.always("gray")]
        ])(userId);
        const element = React.createElement(EntityChart, {
          key: chartCanvasId,
          chartCanvasId,
          color,
          entityMap,
          entityToCount,
          title
        });
        return R.append(element, accum);
      };
      const cells = R.reduce(reduceFunction, [], userIds);

      return ReactUtils.createFlexboxWrap(cells, "entityChartsPanel", "bg-white");
    }

    return ReactDOMFactories.span({ key: "entityChartsPanel" }, " ");
  }
}

EntityChartsPanel.propTypes = {
  entityMap: PropTypes.shape().isRequired,
  isDisplayed: PropTypes.bool.isRequired,
  userToEntityToCount: PropTypes.shape().isRequired
};

export default EntityChartsPanel;
