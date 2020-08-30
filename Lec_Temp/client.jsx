import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

// import NumberBaseBall from "./NumberBaseBall.js";
import NumberBaseBallH from "./NumberBaseBallH";

// const Hot = hot(NumberBaseBall);
const Hot = hot(NumberBaseBallH);

ReactDom.render(<Hot />, document.querySelector("#root"));
