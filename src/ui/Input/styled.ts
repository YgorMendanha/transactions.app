import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: box-shadow 0.18s ease, border-color 0.18s ease;
  caret-color: ${({ theme }) => theme.colors.textSecondary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 6px 18px rgba(63, 32, 186, 0.08);
  }
`;
