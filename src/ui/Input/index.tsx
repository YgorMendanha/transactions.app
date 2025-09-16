import React, { InputHTMLAttributes } from "react";
import { StyledInput } from "./styled";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props) => {
  return <StyledInput {...props} />;
};
