import React, { useReducer, createContext, useMemo } from "react";
import Table from "./Table";
import Form from "./Form";

/**** 8-6, 8-7 아직 안들음 */

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTINO_MINE: -4,
  FLAG_MINE: -5,
  CLICK_MINE: -6,
  OPENED: 0, // 0이상이면 다 opened, 지뢰개수
};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: false,
});

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
  halted: false,
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });

  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  // NORMAL로 초기화
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
};

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED;
      // 주변 지뢰 개수 구하기
      let around = [];
      if (tableData[action.row - 1]) {
        around = around.concat(
          tableData[action.row - 1][action.cell - 1],
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1]
        );
      }
      // 질문!!!!
      around = around.concat(
        tableData[action.row][action.cell - 1],
        tableData[action.row][action.cell + 1]
      );
      if (tableData[action.row + 1]) {
        around = around.concat(
          tableData[action.row + 1][action.cell - 1],
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1]
        );
      }
      const count = around.filter((v) =>
        [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTINO_MINE].includes(v)
      ).length;
      console.log(count);
      tableData[action.row][action.cell] = count;
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICK_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTINO_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTINO_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(() => ({ tableData, halted, dispatch }), [
    tableData,
    halted,
  ]); // dispatch는 항상 같으므로 input에 안써도 됨

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;

/**
 * 지금까지 dispatch 를 넘겨줄때 component에 인자로 전달전달했음
 *
 * contextAPI는 한번 설정하면 자식 component에서 dispatch 바로 사용 가능
 * disptach를 전달하려는(데이터에 접근하려는) 컴포넌트들을 provider로 묶음
 * -> 자식에서 useContext를 사용하여 접근
 *
 * <TableContext.Provider value={{ tableData, dispatch }}>
 * 이렇게 사용 -> 새로운 객체가 생성 -> 그 자식들 모두 rerendering => 따라서 캐싱을 한번 해줘야 함
 */
