/* eslint no-console: ["error", { allow: ["log"] }] */

import ChartComponent from "./ChartComponent.js";

const labels = ["1001", "1002", "1008"];
const dataItems1 = [4, 3, 2];
const data1 = {
  labels,
  datasets: [{ backgroundColor: "red", data: dataItems1 }]
};
const dataItems2 = [8, 6, 4];
const data2 = {
  labels,
  datasets: [{ backgroundColor: "blue", data: dataItems2 }]
};

const options1 = {
  legend: { display: false },
  maintainAspectRatio: true,
  responsive: false,
  scales: {
    xAxes: [{ ticks: { beginAtZero: true } }],
    yAxes: [{ ticks: { beginAtZero: true } }]
  }
};
const options2 = {
  maintainAspectRatio: true,
  responsive: false
};

const type = "horizontalBar";

let myData = data1;
let myOptions = options1;

const renderChart = () => {
  const element = React.createElement(ChartComponent, { data: myData, options: myOptions, type });
  ReactDOM.render(element, document.getElementById("panel"));
};

document.getElementById("updateDataButton").onclick = () => {
  console.log(`updateDataButton onclick() myData = ${myData.datasets[0].data}`);
  myData = myData === data2 ? data1 : data2;
  renderChart();
};

document.getElementById("updateOptionsButton").onclick = () => {
  console.log(`updateOptionsButton onclick() myOptions = ${JSON.stringify(myOptions)}`);
  myOptions = myOptions === options2 ? options1 : options2;
  renderChart();
};

renderChart();
