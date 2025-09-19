import styled from "styled-components";

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;

  min-width: 0; /* evita overflow no grid */
  min-height: 0;

  overflow: hidden;

  /* quebra strings longas (urls, ids, etc) */
  word-break: break-word;
  overflow-wrap: anywhere;

  /* aplica truncamento em todos os textos dentro */
  & * {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* máximo 2 linhas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal;
  }
`;

/* export */
export const Card = ({ children }: { children: React.ReactNode }) => (
  <CardContainer>{children}</CardContainer>
);
