import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";

interface Props {
  children?: JSX.Element | string;
}

const Layout = (props: Props) => {
  return (
    <div>
      <Header />
      <div className="h-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
