import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useAppSelector, RootState, useAppDispatch } from "../../store";

import Input from "../../components/shared/Input";
import { UserRegisterData } from "../../types/types";
import { register } from "../../slices/user/user.slice";
import { spawn } from "child_process";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useAppSelector((state: RootState) => state.user);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as UserRegisterData;
  const [userData, setUserData] = useState(initialState);

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShow = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(register(userData));
  };

  if (user.loading) {
    <div>Loading ... </div>;
  }

  return (
    <div>
      {user.error ? <span>{user.error.message || user.error.error}</span> : ""}
      {user.message ? <span>{user.message}</span> : ""}
      <div className="w-full h-[80vh] max-w-lg flex items-center justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex gap-x-8">
            <Input
              type="text"
              name="firstName"
              // value=""
              placeholder="First Name"
              label="First Name"
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="text"
              name="lastName"
              value=""
              placeholder="Last Name"
              label="Last Name"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <Input
            type="email"
            name="email"
            // value=""
            placeholder="Email"
            label="Email"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type={passwordShown ? "text" : "password"}
            name="password"
            // value=""
            placeholder="password"
            label="Password"
            onChange={(e) => handleChange(e)}
            icon={
              passwordShown ? (
                <AiFillEyeInvisible
                  className="absolute text-xl right-3 bottom-2"
                  onClick={togglePasswordShow}
                />
              ) : (
                <AiFillEye
                  className="absolute text-xl right-3 bottom-2"
                  onClick={togglePasswordShow}
                />
              )
            }
          />
          <Input
            type={passwordShown ? "text" : "password"}
            name="confirmPassword"
            // value=""
            placeholder="password"
            label="Confirm Password"
            onChange={(e) => handleChange(e)}
            icon={
              passwordShown ? (
                <AiFillEyeInvisible
                  className="absolute text-xl right-3 bottom-2"
                  onClick={togglePasswordShow}
                />
              ) : (
                <AiFillEye
                  className="absolute text-xl right-3 bottom-2"
                  onClick={togglePasswordShow}
                />
              )
            }
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
