/* eslint no-console: ["error", { allow: ["log"] }] */

import DisplayTabs from "./DisplayTabs.js";

const myOnChange = source => {
  console.log(`myOnChange() source.checked ? ${source.checked} source.value = ${source.value}`);
};

const element = React.createElement(DisplayTabs, { onChange: myOnChange });
ReactDOM.render(element, document.getElementById("panel"));
