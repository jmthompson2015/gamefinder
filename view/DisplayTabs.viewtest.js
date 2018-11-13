/* eslint no-console: ["error", { allow: ["log"] }] */

import DisplayTabs from "./DisplayTabs.js";

let selected = "Game Table";

const doRender = () => {
  const myOnChange = value => {
    console.log(`myOnChange() value = ${value}`);
    selected = value;
    doRender();
  };
  const element = React.createElement(DisplayTabs, { onChange: myOnChange, selected });
  ReactDOM.render(element, document.getElementById("panel"));
};

doRender();
