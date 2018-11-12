class InputPanel2 extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  createInputProps() {
    const { handleChange } = this;
    const { clientProps, name, type } = this.props;

    let answer = {
      name, // needed for radio
      onChange: handleChange,
      type
    };

    if (clientProps) {
      answer = R.merge(answer, clientProps);
    }

    return answer;
  }

  createRow(i, value, inputProps0) {
    const { initialValues: selected, labelFunction, type } = this.props;
    const label = labelFunction ? labelFunction(value) : value;

    const inputProps = inputProps0;
    inputProps.id = i;

    switch (type) {
      case InputPanel2.Type.CHECKBOX:
        inputProps.defaultChecked = R.filter(sel => sel.id === value.id, selected).length > 0;
        break;
      case InputPanel2.Type.RADIO:
        inputProps.defaultChecked = value === selected;
        break;
      case InputPanel2.Type.TEXT:
        inputProps.defaultValue = selected[i];
        break;
      default:
        throw new Error(`Unknown input type: ${type}`);
    }

    const input = ReactDOMFactories.input(inputProps);
    const cells = [];

    if (type === InputPanel2.Type.CHECKBOX || type === InputPanel2.Type.RADIO) {
      cells.push(
        ReactDOMFactories.td({ key: cells.length }, ReactDOMFactories.label({}, input, " ", label))
      );
    } else if (type === InputPanel2.Type.TEXT) {
      cells.push(ReactDOMFactories.td({ key: cells.length }, label));
      cells.push(ReactDOMFactories.td({ key: cells.length }, input));
    }

    return ReactDOMFactories.tr({ key: `row${value}${i}` }, cells);
  }

  handleChangeFunction(event) {
    const source = event.target;
    const { id } = source;
    let { initialValues: selected } = this.props;
    const { onChange, type, values } = this.props;
    const mySelected = values[id];

    switch (type) {
      case InputPanel2.Type.CHECKBOX:
        if (source.checked) {
          selected.push(mySelected);
        } else {
          selected = R.without([mySelected], selected);
        }
        break;
      case InputPanel2.Type.RADIO:
        selected = mySelected;
        break;
      case InputPanel2.Type.TEXT:
        selected[id] = source.value;
        break;
      default:
        throw new Error(`Unknown input type: ${type}`);
    }

    onChange(event, selected);
  }

  render() {
    const inputProps = this.createInputProps();
    const { panelClass, values } = this.props;

    const rows = values.map((value, i) => this.createRow(i, value, inputProps), this);

    return ReactDOMFactories.table({ className: panelClass }, ReactDOMFactories.tbody({}, rows));
  }
}

InputPanel2.Type = {
  CHECKBOX: "checkbox",
  RADIO: "radio",
  TEXT: "text"
};

InputPanel2.propTypes = {
  // Function called when the selection changes.
  onChange: PropTypes.func.isRequired,
  // Input type. (e.g. "checkbox", "radio", "text")
  type: PropTypes.string.isRequired,
  // Option values.
  values: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  // Client properties.
  clientProps: PropTypes.shape(),
  // Initial values.
  initialValues: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  // Function which returns the label for a value. Defaults to simply return the value.
  labelFunction: PropTypes.func,
  // Button name. (required for radio)
  name: PropTypes.string,
  // Panel CSS class.
  panelClass: PropTypes.string
};

InputPanel2.defaultProps = {
  clientProps: {},
  initialValues: undefined,
  labelFunction: value => value,
  name: "inputPanel2",
  panelClass: ""
};

export default InputPanel2;
