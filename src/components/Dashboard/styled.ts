import styled, { keyframes } from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: var(--sidebar-width, 150px) 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - var(--sidebar-width, 150px));
`;

export const ContentWrapper = styled.div`
  padding: 20px;
  display: grid;
  gap: 20px;
  overflow-y: auto;
  max-height: calc(100vh - var(--header-height, 130px));
  width: 100%;
  box-sizing: border-box;

  grid-template-columns: repeat(1, 1fr); /* padrão: 1 coluna no mobile */

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr); /* tablets pequenos */
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr); /* tablets maiores */
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); /* desktops */
  }

  & > * {
    min-width: 0;
  }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: 10px auto;
`;

export const TransactionsTableWrapper = styled.div`
  grid-column: 1 / -1;
  width: 100%;
  margin-top: 0px;
`;
