import styled from "styled-components";

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Card = ({ children }: { children: React.ReactNode }) => (
  <CardContainer>{children}</CardContainer>
);
