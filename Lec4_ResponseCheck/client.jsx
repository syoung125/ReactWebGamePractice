import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

// import ResponseCheck from "./ResponseCheck";
// const Hot = hot(ResponseCheck);

import ResponseCheckH from "./ResponseCheckH";
const Hot = hot(ResponseCheckH);

ReactDom.render(<Hot />, document.querySelector("#root"));
