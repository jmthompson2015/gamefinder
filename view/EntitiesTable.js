import ReactUtils from "./ReactUtilities.js";

const BGG_SRC = "../resource/BoardGameGeek16.png";

const createImageLink = (src, href, className = "imageBlock") => {
  const image = ReactDOMFactories.img({ className, src });

  return ReactDOMFactories.a({ key: src, href, target: "_blank" }, image);
};

class EntitiesTable extends React.PureComponent {
  render() {
    const { entities, url } = this.props;

    const mapFunction = entity => {
      const href = url + entity.id;
      const link = createImageLink(BGG_SRC, href);
      const cell = ReactUtils.createCell([entity.name, link]);

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
