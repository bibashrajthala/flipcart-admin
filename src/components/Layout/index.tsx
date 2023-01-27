import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/index";

interface Props {
  children?: JSX.Element | string;
  sidebar?: boolean;
}

const Layout = (props: Props) => {
  const { sidebar } = props;
  return (
    <div>
      <Header />

      {sidebar ? (
        <div className="grid grid-cols-[200px_minmax(900px,_1fr)] mt-16">
          {/* header height is 4rem(64 px) so margintop of it is mt-16=4rem=64px and sidebar is 100vh-4rem so that header + sidebar is 100vh */}
          <aside className="bg-gray-200 shadow-inner sticky top-0 left-0 bottom-0 min-h-[calc(100vh-4rem)]">
            <Sidebar />
          </aside>
          <main className="border border-red-500 border-solid p-5">
            Container
            <Outlet />
          </main>
        </div>
      ) : (
        <main className="flex items-center justify-center p-10 mt-16">
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default Layout;
