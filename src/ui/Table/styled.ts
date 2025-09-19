import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
  grid-column: 1 / -1;
  width: 100%;
  margin-top: 0px;
  overflow-x: auto;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
  padding-bottom: 8px;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #6200ee;
  color: white;
  border-bottom: 1px solid #ddd;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const PaginationWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 12px 0;
  padding-bottom: 12px;

  width: 100%;
  display: flex;
  justify-content: center;
`;

export const PaginationInner = styled.div`
  display: inline-flex;
  gap: 8px;
  width: max-content;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  flex: 0 0 auto;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: ${({ $active }) => ($active ? "#6200ee" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#333")};
  cursor: pointer;
  margin: 0 4px;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#6200ee" : "#f0f0f0")};
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 12px;
  }
`;
