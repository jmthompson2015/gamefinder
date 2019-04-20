import ReactUtils from "./ReactUtilities.js";

const createLink = (href, name) => ReactDOMFactories.a({ key: name, href, target: "_blank" }, name);

class EntitiesTable extends React.PureComponent {
  render() {
    const { entities, url } = this.props;

    const mapFunction = entity => {
      const href = url + entity.id;
      const link = createLink(href, entity.name);
      const cell = ReactUtils.createCell(link);

      return ReactUtils.createRow(cell, entity.name);
    };
    const rows = R.map(mapFunction, entities);

    return ReactUtils.createTable(rows, url, "bn gf-f-entity tl");
  }
}

EntitiesTable.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  url: PropTypes.string.isRequired
};

export default EntitiesTable;
