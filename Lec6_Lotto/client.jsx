import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

// import Lotto from "./Lotto";
// const Hot = hot(Lotto);

import LottoH from "./LottoH";
const Hot = hot(LottoH);

ReactDom.render(<Hot />, document.querySelector("#root"));
