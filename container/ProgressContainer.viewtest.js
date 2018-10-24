import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";

import ProgressContainer from "./ProgressContainer.js";

const store = Redux.createStore(Reducer.root);
store.dispatch(ActionCreator.setCollectionTime(12));
store.dispatch(ActionCreator.setSummaryTime(16));
store.dispatch(ActionCreator.setDetailTime(24));

const container = React.createElement(ProgressContainer);
const element = React.createElement(ReactRedux.Provider, { store }, container);

ReactDOM.render(element, document.getElementById("panel"));
