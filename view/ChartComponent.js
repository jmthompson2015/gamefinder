// see https://stackoverflow.com/questions/43434609/use-chartjs-with-reactjs
// see https://stackoverflow.com/questions/24785713/chart-js-load-totally-new-data

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    // Create chart.
    const { data, options, type } = this.props;

    const element = this.canvasRef.current;
    const context = element.getContext("2d");
    const chart = new Chart(context, { type, data, options });
    this.setState({ chart });
  }

  componentDidUpdate(prevProps) {
    // Update chart.
    const { data, options } = this.props;
    const { data: prevData, options: prevOptions } = prevProps;

    if (data !== prevData) {
      const { chart } = this.state;
      chart.config.data = data;
      chart.update();
    }

    if (options !== prevOptions) {
      const { chart } = this.state;
      chart.options = options;
      chart.update();
    }
  }

  componentWillUnmount() {
    // Delete chart.
    const { chart } = this.state;

    if (chart) {
      chart.destroy();
    }
  }

  render() {
    const { chartCanvasId } = this.props;

    return ReactDOMFactories.canvas({
      key: chartCanvasId,
      ref: this.canvasRef
    });
  }
}

ChartComponent.propTypes = {
  data: PropTypes.shape().isRequired,
  options: PropTypes.shape().isRequired,

  chartCanvasId: PropTypes.string,
  type: PropTypes.string
};

ChartComponent.defaultProps = {
  chartCanvasId: "chartCanvas",
  type: "horizontalBar"
};

export default ChartComponent;
