import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector, RootState } from "./store";

import Privateroutes from "./components/HOC/PrivateRoute";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import { isUserLoggedIn } from "./slices/auth/auth.slice";
import Orders from "./containers/Orders";
import Products from "./containers/Products";
import CategoriesList from "./containers/Categories";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (!isAuthenticated) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(isUserLoggedIn());
      }
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<Layout sidebar={true} />}>
          <Route path="/" element={<Privateroutes />}>
            <Route index element={<Home />} />
            <Route path="/category" element={<CategoriesList />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>
        <Route element={<Layout sidebar={false} />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
