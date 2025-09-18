import React from "react";
import { IconWrapper, StyledSelect, WrapperSelect } from "./styled";
import { ArrowDown } from "lucide-react";

export type OptionType = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: OptionType[];
  placeholder?: string;
  fullWidth?: boolean;
};

export const Select: React.FC<Props> = ({
  options,
  placeholder,
  fullWidth,
  children,
  ...rest
}) => {
  const hasValue = rest.value !== undefined && rest.value !== null;
  const hasDefault =
    rest.defaultValue !== undefined && rest.defaultValue !== null;
  const selectProps: any = { ...rest };
  if (placeholder && !hasValue && !hasDefault) selectProps.defaultValue = "";

  return (
    <WrapperSelect $full={!!fullWidth}>
      <StyledSelect
        {...selectProps}
        aria-label={rest["aria-label"] ?? placeholder}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((opt) => (
              <option
                key={String(opt.value)}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </option>
            ))
          : children}
      </StyledSelect>
      <IconWrapper>
        <ArrowDown />
      </IconWrapper>
    </WrapperSelect>
  );
};
