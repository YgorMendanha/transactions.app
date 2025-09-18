import { ButtonHTMLAttributes } from "react";
import { StyledButton, Variant } from "./styled";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  ...rest
}) => {
  return (
    <StyledButton {...rest} variant={variant}>
      {children}
    </StyledButton>
  );
};
