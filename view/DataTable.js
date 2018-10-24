class DataTable extends React.Component {
  constructor(props) {
    super(props);

    // Factories.
    this.Table = React.createFactory(Reactable.Table);
    this.Tr = React.createFactory(Reactable.Tr);
    this.Td = React.createFactory(Reactable.Td);
  }

  createRow(data, key) {
    const { columns } = this.props;

    const mapFunction = column => {
      const value = this.determineValue(column, data);
      const cell = this.determineCell(column, data, value);
      return this.Td(
        { key: column.key + data.id, className: column.className, column: column.key, value },
        cell === undefined ? "" : cell
      );
    };
    const cells = R.map(mapFunction, columns);

    return this.Tr({ key }, cells);
  }

  createTable(rowData) {
    const { columns } = this.props;

    const mapFunction = data => this.createRow(data, data.id);
    const rows = R.map(mapFunction, rowData);

    return this.Table({ className: "dataTable", columns, sortable: true }, rows);
  }

  determineCell(column, data, value) {
    let answer;
    const { cellFunctions } = this.props;

    if (cellFunctions && cellFunctions[column.key]) {
      answer = cellFunctions[column.key](data);
    } else {
      answer = value;
    }

    return answer;
  }

  determineValue(column, data) {
    let answer;
    const { valueFunctions } = this.props;

    if (valueFunctions && valueFunctions[column.key]) {
      answer = valueFunctions[column.key](data);
    } else {
      answer = data[column.key];
    }

    return answer;
  }

  render() {
    const { rowData } = this.props;
    const table = this.createTable(rowData);

    const rows = [];

    const rowCount = `Row Count: ${rowData.length}`;
    rows.push(
      ReactDOMFactories.tr(
        { key: rows.length },
        ReactDOMFactories.td({ className: "rowCount" }, rowCount)
      )
    );
    rows.push(ReactDOMFactories.tr({ key: rows.length }, ReactDOMFactories.td({}, table)));
    rows.push(
      ReactDOMFactories.tr(
        { key: rows.length },
        ReactDOMFactories.td({ className: "rowCount" }, rowCount)
      )
    );

    return ReactDOMFactories.table({}, ReactDOMFactories.tbody({}, rows));
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf().isRequired,
  rowData: PropTypes.arrayOf().isRequired,

  cellFunctions: PropTypes.shape(),
  valueFunctions: PropTypes.shape()
};

DataTable.defaultProps = {
  cellFunctions: {},
  valueFunctions: {}
};

export default DataTable;
