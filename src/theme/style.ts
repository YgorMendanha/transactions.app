import styled from "styled-components";

export const BtnChangeTheme = styled.button`
  position: fixed;
  top: 10px;
  right: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.05) rotate(5deg);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }
`;
