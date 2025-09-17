import styled, { keyframes } from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
`;

export const MainContent = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  overflow-y: auto;
  max-height: calc(100vh - 60px);
  gap: 20px;
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
