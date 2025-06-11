import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./App.css";
import { ToastContainer } from "react-toastify";

export default function App(): ReactNode {
  return (
    <div>
      <div className="flex-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <ToastContainer />
          <Outlet />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
