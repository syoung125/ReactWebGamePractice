import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // Random between 2-3mins
    } else if (state == "ready") {
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요.",
      });
    } else if (state == "now") {
      // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          result: [...prevState.result, this.endTime - this.startTime],
          message: "클릭해서 시작하세요",
        };
      });
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <div>
        평균시간: {result.reduce((a, c) => a + c) / result.length}
        ms
      </div>
    );
  };

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;

/**
 * React에서는 for과 if를 못쓴다..ㅠ
 * false, undefined, null은 jsx에서 태그없음을 의미
 *
 * react에서 조건문 -> 삼항연산자 또는 &&으로
 * -> 지저분하다? 함수로 뺌
 *
 * ----------------------------
 * state가 바뀌면 rendering이 다시 되지만,
 * 그냥 this.변수가 바뀌면 rendering 안됨
 *
 */
