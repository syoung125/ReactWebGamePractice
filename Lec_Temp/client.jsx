import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import TicTacToe from "./TicTacToe";
const Hot = hot(TicTacToe);

ReactDom.render(<Hot />, document.querySelector("#root"));
