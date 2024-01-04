import * as Yup from "yup";

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().min(8).required("Please enter your password"),
});
