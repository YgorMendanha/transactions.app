import { useState } from "react";
import {
  PageButton,
  PaginationInner,
  PaginationWrapper,
  Table,
  TableContainer,
  TableWrapper,
  Td,
  Th,
} from "./styled";
import { ITransaction } from "@/types/transaction";

interface TransactionsTableProps {
  data: ITransaction[];
  itemsPerPage?: number;
}

export const TransactionsTable = ({
  data,
  itemsPerPage = 10,
}: TransactionsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  function getPaginationPages(current: number, total: number, maxVisible = 5) {
    const pages = [];

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total - 1) pages.push("...");

      pages.push(total);
    }

    return pages;
  }

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <TableContainer>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Account</Th>
              <Th>Industry</Th>
              <Th>Type</Th>
              <Th>Amount</Th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((tx, index) => (
              <tr key={index}>
                <Td>{new Date(Number(tx.date)).toLocaleDateString()}</Td>
                <Td>{tx.account}</Td>
                <Td>{tx.industry}</Td>
                <Td
                  style={{
                    color: tx.transaction_type === "deposit" ? "green" : "red",
                  }}
                >
                  {tx.transaction_type}
                </Td>
                <Td>
                  {Number(tx.amount).toLocaleString("en-US", {
                    style: "currency",
                    currency: tx.currency.toUpperCase(),
                  })}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <PaginationWrapper>
        <PaginationInner>
          <PageButton
            onClick={() => setCurrentPage(Math.max(currentPage - 10, 1))}
            disabled={currentPage === 1}
          >
            &lt; &lt;
          </PageButton>
          <PageButton
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </PageButton>
          {pages.map((p) => (
            <PageButton key={p} $active={p === currentPage}>
              {p}
            </PageButton>
          ))}
          <PageButton
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </PageButton>
          <PageButton
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 10, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </PageButton>
        </PaginationInner>
      </PaginationWrapper>
    </TableContainer>
  );
};
