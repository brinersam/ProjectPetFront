import { useState, type ReactNode } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import TicTacToe from "../components/TicTacToe/TicTacToe";
import "./MainPage.css";

export default function MainPage() {
  const [count, setCount] = useState(0);

  return <RenderHtml />;

  function RenderHtml(): ReactNode {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <h1>Vite + React</h1>
        <TicTacToe />
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    );
  }
}
