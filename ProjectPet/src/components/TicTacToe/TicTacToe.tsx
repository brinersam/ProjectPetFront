import {
  useState,
  type JSX,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import "./TicTacToe.css";

export default function TicTacToe() {
  return (
    <>
      <Game />
    </>
  );
}

function Game(): ReactNode {
  const boardWidth = 3;
  const boardHeigth = 3;
  const [isXTurn, setisXTurn] = useState(true);
  const [winner, setWinner] = useState("");
  const [history, setHistory] = useState(InitBoard());
  const cells = history[history.length - 1];

  return (
    <>
      <div>
        {StatusHtml()}
        {BoardHtml()}
      </div>
      <div>{TimeTravelHtml()}</div>
    </>
  );

  function OnSquareClicked(id: number) {
    if (cells[id] || winner) return;

    const newCells = cells.slice();

    newCells[id] = isXTurn ? "X" : "O";
    setisXTurn(!isXTurn);

    const newHistory = history.slice();
    newHistory.push(newCells);
    setHistory(newHistory);
    const winningPlayer: string | null = calculateWinner(newCells);
    if (winningPlayer) OnWinner(winningPlayer);
  }

  function OnWinner(winner: string) {
    if (!winner) return;
    setWinner(winner);
  }

  function InitBoard(): Array<Array<string>> {
    const board = Array(boardWidth * boardHeigth).fill(null);
    const history = [];
    history.push(board);
    return history;
  }

  function CurrentPlayerHtml(): ReactNode {
    return <>Current turn: {isXTurn ? "X" : "O"}</>;
  }

  function WinnerHtml(): ReactNode {
    if (!winner) return <div></div>;
    return <div>"Winner is {winner}"</div>;
  }

  function StatusHtml(): ReactNode {
    if (winner) return WinnerHtml();
    else return CurrentPlayerHtml();
  }

  function TimeTravelHtml(): ReactNode {
    const html: JSX.Element[] = [];

    for (let turnIdx = 0; turnIdx < history.length - 1; turnIdx++) {
      if (history[turnIdx] == null) break;
      html.push(
        <button key={turnIdx} onClick={() => SetBoardToTurn(turnIdx)}>
          Go before turn #{turnIdx + 1}
        </button>
      );
    }
    return html;
  }

  function SetBoardToTurn(turnIdx: number): void {
    let newHistory: null | Array<Array<string>> = null;
    if (turnIdx <= 0) newHistory = InitBoard();
    else {
      newHistory = history.slice();
      newHistory.length = turnIdx + 1;
    }
    setHistory(newHistory);
  }

  function BoardHtml(): ReactNode {
    const html = [];
    for (let yidx = 0; yidx < boardHeigth; yidx++) {
      html.push(
        <BoardRow
          rangeStart={boardWidth * yidx + 1}
          rangeEnd={boardWidth * (yidx + 1)}
          data={cells}
          key={yidx}
          clickFun={OnSquareClicked}
        />
      );
    }
    return html;
  }

  function calculateWinner(squares: Array<string>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
}

interface BoardRowArgs {
  rangeStart: number;
  rangeEnd: number;
  data: Array<string>;
  clickFun: (x: number) => void;
}

function BoardRow({ rangeStart, rangeEnd, data, clickFun }: BoardRowArgs) {
  const cellIds: Array<number> = Array.from(
    { length: Number(rangeEnd) - Number(rangeStart) + 1 },
    (_, i) => Number(rangeStart) + i - 1
  ); // array of indecies calculated using ranges (rangeStart,rangeEnd)

  return (
    <>
      <div className="board-BoardRow">
        {cellIds.map((key) => (
          <Square clickFun={() => clickFun(key)} key={key} value={data[key]} />
        ))}
      </div>
    </>
  );
}

interface SquareArgs {
  value: string;
  clickFun: MouseEventHandler<HTMLButtonElement>;
}

function Square({ clickFun, value }: SquareArgs) {
  return (
    <button onClick={clickFun} className="square">
      {value}
    </button>
  );
}
