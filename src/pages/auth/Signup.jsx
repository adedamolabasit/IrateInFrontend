import { useState } from "react";
import { useFormik } from "formik";
import { SignupValidation } from "./SignupValidation";
import { signup } from "../../services/AuthService";
import { STATE, alertSuccess, alertError } from "../../utils";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};
const Signup = () => {
  const [status, setStatus] = useState(STATE.IDLE);
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      setStatus(STATE.LOADING);

      const userObj = {
        email: values.email,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
      };
      const response = await signup(userObj);
      setStatus(STATE.SUCCESS);
      if (response.data.success && !response.data.data) {
        alertError(response.data.message);
        return;
      }
      alertSuccess("Sign up Successfull");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      alertError(
        err?.response?.data?.message || "Something went wrong, try again"
      );
      setStatus(STATE.ERROR);
      console.log(status)
    }
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    validationSchema: SignupValidation,
    initialValues: initialValues,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  return (
    <div className="w-full self-start">
      <h2 className="text-center font-medium text-2xl">Sign Up</h2>
      <p className="text-center mb-[3.7vh]">Create an account</p>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-[2.22vh] ">
          <label htmlFor="email" className=" text-sm text-[#4F4F4F]">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="bg-[#F8F8F8] py-[0.8vh] px-[1rem] outline-none border border-[#E0E0E0] rounded-[0.5rem] text-[#333] "
          />
          {errors.email && (
            <small className="text-red-600">{errors.email}</small>
          )}
        </div>
        <div className="flex flex-col mb-[2.22vh] ">
          <label htmlFor="firstName" className=" text-sm text-[#4F4F4F]">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={values.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="bg-[#F8F8F8] py-[0.8vh] px-[1rem] outline-none border border-[#E0E0E0] rounded-[0.5rem] text-[#333] "
          />
          {errors.firstName && (
            <small className="text-red-600">{errors.firstName}</small>
          )}
        </div>
        <div className="flex flex-col mb-[2.22vh] ">
          <label htmlFor="lastName" className=" text-sm text-[#4F4F4F]">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={values.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="bg-[#F8F8F8] py-[0.8vh] px-[1rem] outline-none border border-[#E0E0E0] rounded-[0.5rem] text-[#333] "
          />
          {errors.lastName && (
            <small className="text-red-600">{errors.lastName}</small>
          )}
        </div>
        <div className="flex flex-col mb-[2.22vh] ">
          <label htmlFor="password" className=" text-sm text-[#4F4F4F]">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="bg-[#F8F8F8] py-[0.8vh] px-[1rem] outline-none border border-[#E0E0E0] rounded-[0.5rem] text-[#333] "
          />
          {errors.password && (
            <small className="text-red-600">{errors.password}</small>
          )}
        </div>
        <p className="font-semibold text-[#F9A242] "><a href="/login" > Sign In </a> </p>
        <button
          className="mt-[3.7vh] bg-[#0B468C] w-full py-[0.74vh] rounded-[0.5rem] text-white hover:bg-opacity-90 font-semibold "
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
