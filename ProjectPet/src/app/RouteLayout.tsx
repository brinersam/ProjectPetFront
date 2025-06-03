import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export default function RouteLayoutHtml(): ReactNode {
  return (
    <div>
      {/* <Header/> */}
      <Outlet />
    </div>
  );
}
