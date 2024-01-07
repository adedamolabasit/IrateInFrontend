import { useState } from "react";
import google from "../../assets/auth/google.svg";
import { useFormik } from "formik";
import { LoginValidation } from "./LoginValidation";
import { signin } from "../../services/AuthService";
import { STATE, alertSuccess, alertError } from "../../utils";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

export function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [status, setStatus] = useState(STATE.IDLE);

  const handleLogin = async (values) => {
    const userObj = {
      email: values.email,
      password: values.password,
    };
    try {
      setStatus(STATE.LOADING);
      const response = await signin(userObj);
      setStatus(STATE.SUCCESS);
      if (response.data.success && !response.data.data) {
        alertError(response.data.message);
        return;
      }
      console.log(response.data,'yyy')
      await auth.initUser(response.data);
      alertSuccess(response.data.message);
      console.log(status)
      navigate("/");
    } catch (err) {
      console.log(err,"p")
      alertError(
        err?.response?.data?.non_field_errors[0] || "Something went wrong, try again"
      );
      setStatus(STATE.ERROR);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    validationSchema: LoginValidation,
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
      handleLogin(values);
    },
  });

  return (
    <div className="w-full self-start">
      <h2 className="text-center font-medium text-2xl">👋Welcome back</h2>
      <p className="text-center mb-[3.7vh]">Login to your account</p>

      <h3 className="flex items-center justify-center gap-2 text-center border border-[#E0E0E0] rounded-[0.5rem] py-[0.5rem] w-full mb-[7.4vh] text-[#0B468C] cursor-pointer ">
        <img src={google} alt="" />
        Continue with Google
      </h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-[2.22vh] ">
          <label htmlFor="email text-sm text-[#4F4F4F]">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="bg-[#F8F8F8] py-[0.8vh] px-[1rem] outline-none border border-[#E0E0E0] rounded-[0.5rem] text-[#333] "
          />
          {errors.email && <small>{errors.email}</small>}
        </div>
        <div className="flex flex-col mb-[2.22vh] ">
          <label htmlFor="email text-sm text-[#4F4F4F]">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="bg-[#F8F8F8] py-[0.8vh] px-[1rem] outline-none border border-[#E0E0E0] rounded-[0.5rem] text-[#333] "
          />
          {errors.password && <small>{errors.password}</small>}
        </div>
        <p className="font-semibold text-[#F9A242] "><a href="/signup" > Signup </a> </p>
        <button
          className="mt-[3.7vh] bg-[#0B468C] w-full py-[0.74vh] rounded-[0.5rem] text-white hover:bg-opacity-90 font-semibold "
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
