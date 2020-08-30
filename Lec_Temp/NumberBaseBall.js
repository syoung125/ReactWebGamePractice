import React, { Component } from "react";
import Try from "./Try";

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
  // const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //   candidate.sort(function () {
  //     return 0.5 - Math.random();
  //   });
  //   console.log(candidate);
  //   return candidate.slice(0, 4);

  // 강좌 코드
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseBall extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value == this.state.answer.join("")) {
      this.setState({
        result: "홈런",
        tries: [
          ...this.state.tries, // 기존 배열에
          { try: this.state.value, result: "홈런!" }, // 새로 추가
        ],
      });
      alert("게임을 다시 시작합니다!");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(
            ","
          )}였습니다.`,
        });
        alert("게임을 다시 시작합니다!");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          result: `${strike} 스트라이크, ${ball} 볼입니다.`,
          tries: [
            ...this.state.tries,
            {
              try: this.state.value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ],
        });
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { result, value, answer, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput} />
          <button>입력</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도: `} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseBall;

/**
 * [NOTE]
 *
 * 리액트에서 반복문을 쓰는 법: map
 * --------------------------------------------------
 * 배열 추가 시 push 사용하면 안됨
 * -> 왜냐하면  리액트 redering 기준은 예전 state와 현재 state가 다를 때 인데,
 * arr1 = []
 * arr2 = [...arr1, 1]
 * 인 경우 arr1 === arr2 => false라서 rendering을 함
 *
 * 하지만,
 * arr = []
 * arr.push(1)
 * 인 경우 arr === arr => true
 *
 * 따라서 옛날 배열을 복사해서 새로운 배열을 만들어주는 방식을 사용해야 한다!!
 * --------------------------------------------------
 *
 *
 *
 *  */
