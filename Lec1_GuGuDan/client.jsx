import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

// import GuGuDan from "./GuGuDan";
// const Hot = hot(GuGuDan);

import Gumon from "./Gumon";
const Hot = hot(Gumon);

ReactDOM.render(<Hot />, document.querySelector("#root"));
