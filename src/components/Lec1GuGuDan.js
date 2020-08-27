import React from "react";

/* class를 사용한 경우 */
class Lec1GuGuDan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: Math.ceil(Math.random() * 9),
      num2: Math.ceil(Math.random() * 9),
      value: "",
      result: "",
    };
  }

  onsubmit = () => {
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
        {/* <form onSubmit={this.onsubmit}>  // submit하면 새로고침?? */}
        <input
          ref={(c) => {
            this.input = c;
          }}
          type="number"
          value={this.state.value}
          onChange={this.onChangeInput}
        />
        <input type="submit" value="입력" onClick={this.onsubmit} />
        {/* </form> */}
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

// const Lec1GuGuDan = () => {
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

export default Lec1GuGuDan;
