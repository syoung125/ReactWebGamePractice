import React, { useState, useRef, useEffect, memo } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSPH = memo(() => {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const interval = useRef();

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    // console.log('컴포넌트가 화면에 나타남');
    interval.current = setInterval(changeHand, 100);
    return () => {
      // componentWillUnmount (cleanup)
      // console.log('컴포넌트가 화면에서 사라짐');
      clearTimeout(interval.current);
    };
  }, [imgCoord]); // 배열: 클로저 문제 해결, 꼭 useEffect를 다시 실행할 값만 넣어야 함

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord == rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord == rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("졌습니다.");
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
});

export default RSPH;

/**
 * Hooks에는 life cycle이 없음
 *
 * useEffect: 화면이 랜더링 되고 난 후 실행, resizing "후" 발생
 * useLayoutEffect: 화면 resizing 하기 "전" 발생
 */

/**
 *                          result, imgCoord, score
 * componentDidMount
 * componentDidUpdate
 * componentWillUnmount
 *
 * class에서 -> 가로
 * useEffect -> hooks -> 세로 (각 한개씩만 다룰 수 있음)
 */
