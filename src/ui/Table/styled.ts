import styled from "styled-components";

export const TableWrapper = styled.div`
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

export const Table = styled.table`
  width: 100%;
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
  display: flex;
  justify-content: center;
  margin: 20px 0px;
  gap: 8px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: ${({ $active }) => ($active ? "#6200ee" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#333")};
  cursor: pointer;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#6200ee" : "#f0f0f0")};
  }
`;
