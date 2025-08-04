import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";

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
