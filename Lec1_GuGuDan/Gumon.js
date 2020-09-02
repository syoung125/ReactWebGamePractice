import React, { useState } from "react";
import Problem from "./Problem";

const Gumon = () => {
  const [problemNumber, setProblemNumber] = useState(10);

  const onSubmitBtn = () => {};

  return (
    <>
      <h1>구몬학습</h1>
      <Problem />
      <Problem />
      <Problem />
      <Problem />
      <Problem />
      <Problem />
      <Problem />
      <button>채점</button>
    </>
  );
};

export default Gumon;
