import React from "react";
import { NavLink } from "react-router-dom";
import NavItemHeader from "./NavItemHeader";

import { SideMenu } from "./constants";

interface Props {
  item: SideMenu;
}

const NavItem = (props: Props) => {
  const { label, Icon, to, children } = props.item;

  // if nav item has children
  if (children) {
    return <NavItemHeader item={props.item} />;
  }

  // if nav item doesnot have children
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "px-3 py-5 no-underline flex items-center hover:bg-[#1e3a8a] text-[#dbeafe] bg-[#1e3a8a]"
          : "px-3 py-5 no-underline flex items-center hover:bg-[#1e3a8a]"
      }
      //   activeClassName={style.activeNavItem}
    >
      {Icon && <Icon className="text-[#d1d5db] w-6 h-6 mr-4" />}
      <span className="text=[#d1d5db]">{label}</span>
    </NavLink>
  );
};

export default NavItem;
