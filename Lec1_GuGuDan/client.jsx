const React = require("react");
const ReactDOM = require("react-dom");
const { hot } = require("react-hot-loader/root");

const GuGuDan = require("./GuGuDan");
const Hot = hot(GuGuDan);

ReactDOM.render(<Hot />, document.querySelector("#root"));
