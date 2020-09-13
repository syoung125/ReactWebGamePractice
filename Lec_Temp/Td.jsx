import React, { useCallback, memo, useContext, useMemo } from "react";
import {
  CODE,
  TableContext,
  OPEN_CELL,
  CLICK_MINE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
} from "./MineSearch";

const getTdStyle = (data) => {
  switch (data) {
    case CODE.NORMAL:
    case CODE.MINE:
      return { background: "#444" };
    case CODE.CLICK_MINE:
    case CODE.OPENED:
      return { background: "white" };
    case CODE.QUESTINO_MINE:
    case CODE.QUESTION:
      return { background: "yellow" };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return { background: "red" };
    default:
      return { background: "white" };
  }
};

const getTdText = (data) => {
  switch (data) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICK_MINE:
      return "펑";
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "!";
    case CODE.QUESTINO_MINE:
    case CODE.QUESTION:
      return "?";
    default:
      return data || ""; // 0 인 경우 빈칸으로
  }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, halted, dispatch } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
        break;
      case CODE.NORMAL:
      case CODE.FLAG:
      case CODE.QUESTION:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        break;
      case CODE.MINE:
      case CODE.FLAG_MINE:
      case CODE.QUESTINO_MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        break;
      default:
        break;
    }
    console.log(rowIndex, cellIndex);
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault(); //우클릭 시 메뉴가 안뜨게 하기 위해서
      if (halted) {
        return;
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
          break;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
          break;
        case CODE.QUESTINO_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
          break;
        default:
          break;
      }
      console.log("RClick:", rowIndex, cellIndex);
    },
    [tableData[rowIndex][cellIndex], halted]
  );

  console.log("td rendered");
  // useMemo를 사용하면 위의 함수는 계속 호출되더라도
  // 실제 랜더링은 해당값이 변할 때만 render
  return useMemo(
    () => (
      <RealTd
        onClickTd={onClickTd}
        onRightClickTd={onRightClickTd}
        data={tableData[rowIndex][cellIndex]}
      />
    ),
    [tableData[rowIndex][cellIndex]]
  );
});

const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
  console.log("real td rendered");
  return (
    <td
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(data)}
    </td>
  );
});

export default Td;

/**
 * onContextMenu에서 오른쪽클릭 구현
 */
