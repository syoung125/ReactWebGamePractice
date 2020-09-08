import React, { useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = ({ dispatch, rowIndex, cellIndex, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]); // [] 안에 cellData넣어줘야 적용!!!
  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
