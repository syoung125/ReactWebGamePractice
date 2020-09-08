import React, { Component } from "react";

const SPEED = 100;

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
  console.log("computerChoice");
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: rspCoords.바위,
    activate: true,
  };

  interval;

  componentDidMount() {
    console.log("componentDidMount");

    // 컴포넌트가 첫 랜더링 된 후
    this.interval = setInterval(this.changeHand, SPEED);
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate");
    // 리랜더링 후
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // 컴포넌트가 제거되기 전
    clearInterval(this.interval);
  }

  changeHand = () => {
    console.log("changeHand");
    const { imgCoord } = this.state;
    // console.log(imgCoord);
    // 비동기 함수에서 바깥 변수를 참조 -> 클로저 문제
    if (imgCoord === rspCoords.바위) {
      this.setState({ imgCoord: rspCoords.가위 });
    } else if (imgCoord == rspCoords.가위) {
      this.setState({ imgCoord: rspCoords.보 });
    } else if (imgCoord == rspCoords.보) {
      this.setState({ imgCoord: rspCoords.바위 });
    }
  };

  onClickBtn = (choice) => () => {
    this.setState({ activate: false });
    console.log("onClickBtn");
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    this.temp = this.interval;
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다.",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다.",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다.",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      console.log("setTimeout");
      this.interval = setInterval(this.changeHand, SPEED);
      this.setState({ activate: true });
    }, 2000);
  };

  render() {
    const { result, score, imgCoord, activate } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        ></div>
        <div>
          <button
            id="rock"
            className="btn"
            onClick={activate ? this.onClickBtn("바위") : () => {}}
          >
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={activate ? this.onClickBtn("가위") : () => {}}
          >
            가위
          </button>
          <button
            id="paper"
            className="btn"
            onClick={activate ? this.onClickBtn("보") : () => {}}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;

/**
 * render 함수가 실행 -> react가 component를 dom에 붙임
 * -> 이때 특정한 동작을 할 수 있음(componentDidMount)
 *
 * render가 처음 성공적으로 실행 -> componentDidMount 실행
 * component가 제거되기 직전 -> componentWillUnmount 실행
 *
 *
 * 클래스 - 리액트 라이프사이클
 * : constructor -> render -> ref -> componentDidMount
 *  -> (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
 *  -> 부모가 나를 없앨 때 -> componentWillUnmount -> 소멸
 *
 *
 * onClickBtn에 onClick = {() => this.onClickBtn("보")} 이면
 * onClickBtn = (choice) => () => {} 이렇게 바꾸고
 * onClick = {this.onClickBtn("보")} 이렇게 써도 됨
 */
