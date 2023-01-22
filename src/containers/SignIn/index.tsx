import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector, RootState } from "../../store";

import Input from "../../components/shared/Input";
import { login } from "../../slices/auth/auth.slice";
import { UserLoginData } from "../../types/types";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const initialValues = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState<UserLoginData>(initialValues);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShow = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = values;
    // console.log(user);
    dispatch(login(user));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full max-w-2xl h-[80vh] flex items-center justify-center">
      <form
        onSubmit={(e) => handleLoginSubmit(e)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
      >
        <Input
          type="email"
          name="email"
          value=""
          placeholder="Email"
          label="Email"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Input
          type={passwordShown ? "text" : "password"}
          name="password"
          value=""
          placeholder="password"
          label="Password"
          onChange={(e) => {
            handleChange(e);
          }}
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-1 px-4 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
