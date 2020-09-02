import React, { useState, useRef } from "react";
import { render } from "react-dom";

function getOperationStr(randNum) {
  switch (randNum) {
    case 1:
      return "더하기";
    case 2:
      return "빼기";
    case 3:
      return "곱하기";
    case 4:
      return "나누기";
    default:
      return "더하기";
  }
}

const Problem = () => {
  const [opNum, setOpNum] = useState(Math.ceil(Math.random() * 4));
  const [opStr, setOpStr] = useState(getOperationStr(opNum));
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const checkAnswer = () => {
    let answer = 0;
    switch (opNum) {
      case 1:
        answer = first + second;
        break;
      case 2:
        answer = first - second;
        break;
      case 3:
        answer = first * second;
        break;
      case 4:
        answer = first / second;
        break;
      default:
        answer = first + second;
        break;
    }
    return answer;
  };

  const onSubmitAnswer = () => {
    const answer = checkAnswer();
    if (answer === parseFloat(value)) setResult("정답: " + answer);
    else setResult("틀림: " + answer);
  };

  return (
    <>
      <h3>
        {first} {opStr} {second} 는?
      </h3>
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={onChangeInput}
      />
      <button onClick={onSubmitAnswer}>입력!</button>
      <p>{result}</p>
    </>
  );
};

export default Problem;
