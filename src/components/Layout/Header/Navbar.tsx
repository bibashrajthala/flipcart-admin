import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { logout } from "../../../slices/auth/auth.slice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSignOut = () => {
    dispatch(logout());
  };

  const renderLoggedInComponents = () => {
    return (
      <div>
        <button className="navLink" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    );
  };
  const renderNotLoggedInComponents = () => {
    return (
      <ul className="flex gap-x-10 items-center  ">
        <li>
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
    );
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-4 py-2 absolute top-0 left-0 right-0 z-10 h-16">
      <h1>
        <Link to="/" className="text-xl">
          Admin Dashboard
        </Link>
      </h1>

      {isAuthenticated
        ? renderLoggedInComponents()
        : renderNotLoggedInComponents()}
    </nav>
  );
};

export default Navbar;
