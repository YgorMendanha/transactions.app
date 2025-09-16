import styled from "styled-components";

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.4s normal;
  background: ${({ theme }) => theme.colors.secondary};
  color: #ffffff;
  box-shadow: 0 0px 10px ${({ theme }) => theme.colors.primary};
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
