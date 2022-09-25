import { array, InferType, ObjectSchema, string } from "yup";

const user = {
  name: string().required("Name is required"),
  email: string().required("Email is required"),
  regNo: string().required("Registration number is required"),
  domain: array().of(string().required()).required("Domain is required"),
};

export const userSchema = new ObjectSchema(user);
export type User = InferType<typeof userSchema>;
