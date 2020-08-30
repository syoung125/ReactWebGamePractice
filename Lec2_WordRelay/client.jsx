const React = require("react");
const ReactDom = require("react-dom");
const { hot } = require("react-hot-loader/root");

// const WordRelay = require("./WordRelay");
const WordRelayH = require("./WordRelayH");

// const Hot = hot(WordRelay);
const HotH = hot(WordRelayH);

ReactDom.render(<HotH />, document.querySelector("#root"));
