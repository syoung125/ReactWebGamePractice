const React = require("react");

/* class를 사용한 경우 */
class GuGuDan extends React.Component {
  state = {
    num1: Math.ceil(Math.random() * 9),
    num2: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.num1 * this.state.num2 === parseInt(this.state.value)) {
      this.setState((prevState) => {
        return {
          result: `정답 : ${prevState.num1 * prevState.num2}`,
          num1: Math.ceil(Math.random() * 9),
          num2: Math.ceil(Math.random() * 9),
          value: "",
        };
      });
    } else {
      this.setState({ result: "땡", value: "" });
    }
    this.input.focus();
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <p>
          {this.state.num1} 곱하기 {this.state.num2}는?
        </p>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={(c) => {
              this.input = c;
            }}
            type="number"
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <input type="submit" value="입력" />
        </form>
        <p>{this.state.result}</p>
      </div>
    );
  }
}

/* 
[HOOK을 사용한 경우]
-> 코드 자체가 짧아짐 
-> state가 바뀌면 함수 전체가 다시 실행됨 (조금 느려질 수 있음)
*/

// const GuGuDan = () => {
//   const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
//   const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
//   const [value, setValue] = React.useState("");
//   const [result, setResult] = React.useState("");
//   const inputRef = React.useRef(null);

//   const onChangeInput = (e) => {
//     setValue(e.target.value);
//   };

//   const onSubmitForm = (e) => {
//     e.preventDefault();
//     if (first * second === parseInt(value)) {
//       setResult(`정답 : ${value}`);
//       setFirst(Math.ceil(Math.random() * 9));
//       setSecond(Math.ceil(Math.random() * 9));
//       setValue("");
//     } else {
//       setResult("땡");
//       setValue("");
//     }
//     inputRef.current.focus();
//   };

//   return (
//     <div>
//       <p>
//         {first} 곱하기 {second}는?
//       </p>
//       <form onSubmit={onSubmitForm}>
//         <input
//           ref={inputRef}
//           type="number"
//           value={value}
//           onChange={onChangeInput}
//         />
//         <button>입력</button>
//       </form>
//       <p>{result}</p>
//     </div>
//   );
// };

/*
추가적으로 리액트에서는 js 문법과 헷갈릴 수 있기 떄문에 몇몇 키워드를 다르게 쓴다.
class -> className
for -> htmlFor

** 주의! Hook 사용 시에는 state를 쪼개서 사용 
-> 왜냐하면 한꺼번에 쓰면 변수 값 변경시 모든 변수값 다 바꿔함 (일부만 바꿀경우 나머지 변수가 없어짐) 
*/

module.exports = GuGuDan;
