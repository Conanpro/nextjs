import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required")
    .max(50, "Email is too long"),
  password: yup
    .string()
    .min(4, "Password should be over 3 characters")
    .max(35, "Password is too long")
    .required("This field is required")
});

export const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required")
    .max(50, "Email is too long"),
  password: yup
    .string()
    .min(4, "Password should be over 3 characters")
    .required("This field is required")
    .max(35, "Password is too long"),
  username: yup
    .string()
    .required("This field is required")
    .matches(/\w/, "Please enter a valid username")
    .max(25, "Username is too long")
});
