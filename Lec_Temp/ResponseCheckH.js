import React, { useState, useRef } from "react";

const ResponseCheckH = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");

      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // Random between 2-3mins
    } else if (state == "ready") {
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
    } else if (state == "now") {
      // 반응속도 체크
      endTime.current = new Date();
      setState("waiting");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
      setMessage("클릭해서 시작하세요");
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          평균시간: {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={onReset}>Reset</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheckH;

/**
 * 원래 ref는 dom에 접근할 때 쓰는데
 * hooks에서는 this의 속성들을 ref로 표현
 *
 * state와 ref의 차이
 * state가 변경 -> return 부분이 재실행됨
 * ref를 사용하는 이유: 불필요한 rendering을 막기 위해
 */
