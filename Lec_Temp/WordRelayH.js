const React = require("react");
const { useState, useRef } = React;
const WordRelayH = () => {
  const [word, setWord] = useState("고서영");
  const [value, setValue] = useState();
  const [result, setResult] = useState();
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setValue("");
      inputRef.current.focus();
    } else {
      setResult("땡");
      setValue("");
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onRefInput = (c) => {
    inputRef = c;
  };

  return (
    <>
      <div>{word}</div>
      {/* <form onSubmit={this.onSubmitForm}> */}
      <input ref={inputRef} value={value} onChange={onChangeInput} />
      <button onClick={onSubmitForm}>입력!</button>
      {/* </form> */}
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelayH;
