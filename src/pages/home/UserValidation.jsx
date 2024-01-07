import * as Yup from "yup";

export const UserValidation = Yup.object().shape({
  user_email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter user's email address"),
  user_name: Yup.string().min(5).optional(),
});
