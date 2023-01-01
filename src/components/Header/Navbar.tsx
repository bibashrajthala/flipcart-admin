import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-16 py-2">
      <h1>
        <Link to="/" className="text-xl">
          Admin Dashboard
        </Link>
      </h1>
      <ul className="flex gap-x-10 items-center ">
        <li>
          {" "}
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "navLink"
            }
          >
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "navLink"
            }
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
