import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useAppSelector, RootState } from "../../store";

interface Props {
  children?: JSX.Element | string;
}

const Layout = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div>
      <Header />

      {isAuthenticated ? (
        <div className="grid grid-cols-[200px_minmax(900px,_1fr)]">
          <div className="bg-gray-200 shadow-inner sticky top-0 left-0 bottom-0">
            SideBar
          </div>
          <div className="border border-red-500 border-solid p-5">
            Container
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-10">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
