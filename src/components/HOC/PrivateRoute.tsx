import { Outlet, Navigate } from "react-router-dom";

const Privateroutes = () => {
  const token = localStorage.getItem("token");
  // console.log(token);
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default Privateroutes;
