import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Header = () => (
  <HeaderContainer>
    <div>Dashboard</div>
  </HeaderContainer>
);
