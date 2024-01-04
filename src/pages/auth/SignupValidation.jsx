import * as Yup from "yup";

export const SignupValidation = Yup.object().shape({
  email: Yup.string().min(3).required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
  firstName: Yup.string().min(3).required("Please enter your first name"),
  lastName: Yup.string().min(3).required("Please enter your last name"),
});
