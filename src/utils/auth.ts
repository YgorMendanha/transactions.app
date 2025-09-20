import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "YM";

export const AuthValidation = (token?: string) => {
  try {
    if (!token) {
      redirect("/");
    }
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
};
