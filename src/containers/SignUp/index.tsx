import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Input from "../../components/shared/Input";

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShow = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="w-full h-[80vh] max-w-lg flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-full">
        <div className="flex gap-x-8">
          <Input
            type="text"
            name="firstName"
            value=""
            placeholder="First Name"
            label="First Name"
            onChange={(e) => {}}
          />
          <Input
            type="text"
            name="lastName"
            value=""
            placeholder="Last Name"
            label="Last Name"
            onChange={(e) => {}}
          />
        </div>

        <Input
          type="email"
          name="email"
          value=""
          placeholder="Email"
          label="Email"
          onChange={(e) => {}}
        />
        <Input
          type={passwordShown ? "text" : "password"}
          name="password"
          value=""
          placeholder="password"
          label="Password"
          onChange={(e) => {}}
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
