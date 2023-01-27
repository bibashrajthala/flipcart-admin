import React from "react";
// import { NavLink } from "react-router-dom";

import { SIDE_MENU } from "./constants";
import NavItem from "./NavItem";

const Sidebar = () => {
  return (
    <>
      {/* // <nav className="h-screen">
    //   <ul>
    //     <li>
    //       <NavLink to="/" className="navLink">
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/products" className="navLink">
    //         Products
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/orders" className="navLink">
    //         Orders
    //       </NavLink>
    //     </li>
    //   </ul>
    // </nav> */}

      <nav className="h-full bg-[#1e40af]">
        {SIDE_MENU.map((item, index) => {
          return <NavItem key={`${item.label}-${index}`} item={item} />;
        })}
      </nav>
    </>
  );
};

export default Sidebar;
