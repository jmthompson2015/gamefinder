import Reducer from "../state/Reducer.js";

import DisplayTabContainer from "./DisplayTabContainer.js";

const store = Redux.createStore(Reducer.root);
const container = React.createElement(DisplayTabContainer);
const element = React.createElement(ReactRedux.Provider, { store }, container);

ReactDOM.render(element, document.getElementById("panel"));
