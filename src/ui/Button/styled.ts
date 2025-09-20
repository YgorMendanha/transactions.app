import styled from "styled-components";

export type Variant = "default" | "primary" | "secondary";

export const StyledButton = styled.button<{ $variant?: Variant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  background: ${({ theme, $variant }) =>
    $variant === "primary"
      ? theme.colors.primary
      : $variant === "secondary"
      ? theme.colors.secondary
      : theme.colors.background};

  box-shadow: ${({ theme, $variant }) =>
    $variant === "primary"
      ? `0 0 10px ${theme.colors.secondary}`
      : $variant === "secondary"
      ? `0 0 10px ${theme.colors.primary}`
      : "none"};

  transition: ${({ $variant }) =>
    $variant === "default" ? "none" : "transform 0.3s ease"};

  &:hover {
    transform: ${({ $variant }) =>
      $variant !== "default" ? "scale(1.05)" : ""};
  }

  &:active {
    transform: ${({ $variant }) =>
      $variant !== "default" ? "translateY(0)" : ""};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
