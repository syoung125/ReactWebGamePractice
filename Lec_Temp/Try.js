import React, { PureComponent, memo } from "react";

class Try extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState, nextContext){
  //   // 컴포넌트가 복잡한 경우 이거 사용
  // }

  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

// const Try = memo(({ tryInfo }) => {
//   return (
//     <li>
//       <div>{tryInfo.try}</div>
//       <div>{tryInfo.result}</div>
//     </li>
//   );
// });

export default Try;

/**
 * PureComponent로 바꾸면 숫자 입력시에는 이 컴포넌트들이 다시 랜더링 되지 않음
 * Hook은 memo사용
 * 자식들이 pureComponent나 memo면 부모에도 적용해도 된다.
 */
