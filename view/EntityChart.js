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

class EntityChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { color, entityMap, entityToCount, title } = this.props;
    this.initializeChart(title, entityMap, entityToCount, color);
  }

  componentWillReceiveProps(nextProps) {
    const { chart } = this.state;
    chart.destroy();
    const { color, entityMap, entityToCount, title } = nextProps;
    this.initializeChart(title, entityMap, entityToCount, color);
  }

  componentWillUnmount() {
    const { chart } = this.state;
    if (chart) {
      chart.destroy();
    }
  }

  initializeChart(title, entityMap, entityToCount, color) {
    const data = createData(entityMap, entityToCount, color);
    const options = R.merge(OPTIONS, { title: { display: true, text: title } });

    const element = ReactDOM.findDOMNode(this);
    const ctx = element.getContext("2d");
    const chart = new Chart(ctx, { type: "horizontalBar", data, options });
    this.state.chart = chart;
  }

  render() {
    const { chartCanvasId } = this.props;

    return ReactDOMFactories.canvas({ key: chartCanvasId, id: chartCanvasId });
  }
}

EntityChart.propTypes = {
  entityMap: PropTypes.shape().isRequired,
  entityToCount: PropTypes.shape().isRequired,

  chartCanvasId: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string
};

EntityChart.defaultProps = {
  chartCanvasId: "chartCanvas",
  color: "red",
  title: "My Chart"
};

export default EntityChart;
