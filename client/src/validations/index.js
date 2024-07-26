// login schema
import * as yup from "yup";

export const loginSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "minimum of 6 characters mandatory"),
  });
};

export const registerLevelOneSchema = () => {
  return yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    mobile: yup.string().required("Mobile number is required"),
    checkbox1: yup.boolean().oneOf([true], "Please accept the T&C"),
  });
};

export const registerLevelTwoSchema = () => {
  return yup.object().shape({
    organisationName: yup.string().required("Organisation Name is required"),
    counrty: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    orderTypeInterested: yup.string().required("Order type is required"),
    organisationType: yup.string().required("Organisation type is required"),
  });
};
