import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./styled";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export const Button: React.FC<Props> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
