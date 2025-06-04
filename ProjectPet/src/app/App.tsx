import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./App.css";

export default function App(): ReactNode {
  return (
    <div className="flex-wrapper">
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
