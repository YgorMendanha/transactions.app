import styled from "styled-components";

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;

  min-width: 0;
  min-height: 0;

  overflow: hidden;

  word-break: break-word;
  overflow-wrap: anywhere;

  & * {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal;
  }
`;

export const Card = ({ children }: { children: React.ReactNode }) => (
  <CardContainer>{children}</CardContainer>
);
