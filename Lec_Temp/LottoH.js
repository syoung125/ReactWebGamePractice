import React, { useState, useRef, useEffect } from "react";
import Ball from "./Ball";

// state 안쓰면 분리하기!
function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  // 1-45 무작위 순서로 정렬
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1]; // 그중 맨마지막 숫자
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // 그중 앞에서 6개 -> 오름차순으로 정렬
  return [...winNumbers, bonusNumber];
}

const LottoH = () => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  const timeouts = useRef([]);

  useEffect(() => {
    runTimeouts();
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 같음
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

  const runTimeouts = () => {
    // let을 사용하면 클로저 문제가 안남
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);

    timeouts.current = [];
  };

  return (
    <>
      <div>당첨숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스</div>
      <div>{bonus && <Ball number={bonus} />}</div>
      {redo && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  );
};

export default LottoH;

// Hooks 동작 완료, But getWinNumbers가 계속 실행되는 문제!!
