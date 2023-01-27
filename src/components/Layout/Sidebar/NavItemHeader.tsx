import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaChevronCircleDown } from "react-icons/fa";

import { SideMenu } from "./constants";

interface Props {
  item: SideMenu;
}

const resolveLinkPath = (childTo: string, parentTo: string) =>
  `${parentTo}/${childTo}`;

const NavItemHeader = (props: Props) => {
  const { item } = props;
  const { label, Icon, to: headerToPath, children } = item;
  const location = useLocation();

  const [expanded, setExpand] = useState(
    location.pathname.includes(headerToPath)
  );

  const onExpandChange = () => {
    // e.preventDefault();
    setExpand((expanded) => !expanded);
  };

  return (
    <>
      <button
        className="px-3 py-5 no-underline flex items-center hover:bg-[#1e3a8a] w-full outline-none border-0 bg-transparent cursor-pointer"
        onClick={onExpandChange}
      >
        {Icon && <Icon className="text-[#d1d5db] w-6 h-6 mr-4" />}
        <span className="text=[#d1d5db]">{label}</span>
        <FaChevronCircleDown
          className={`text-[#d1d5db] w-6 h-6 ml-auto transition-all duration-200 ${
            expanded && "rotate-180"
          }`}
        />
      </button>

      {/* if nav item has children */}
      {expanded && (
        <div className="bg-[#37456e]">
          {children?.map((item, index) => {
            const key = `${item.label}-${index}`;

            const { label, Icon, children } = item;

            if (children) {
              return (
                <div key={key}>
                  <NavItemHeader
                    item={{
                      ...item,
                      to: resolveLinkPath(item.to, props.item.to),
                    }}
                  />
                </div>
              );
            }

            //   if nav item doesnot have children
            return (
              <NavLink
                key={key}
                to={resolveLinkPath(item.to, props.item.to)}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-5 no-underline flex items-center hover:bg-[#1e3a8a] text-[#dbeafe] bg-[#1e3a8a]"
                    : "px-3 py-5 no-underline flex items-center hover:bg-[#1e3a8a]"
                }
              >
                {Icon && <Icon className="text-[#d1d5db] w-6 h-6 mr-4" />}
                <span className="text=[#d1d5db]">{label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NavItemHeader;
