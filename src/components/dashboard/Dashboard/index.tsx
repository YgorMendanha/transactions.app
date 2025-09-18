"use client";

import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { Card } from "../Card";
import { ITransaction } from "@/types/transaction";
import { useEffect, useState } from "react";
import {
  ContentWrapper,
  DashboardContainer,
  MainContent,
  Spinner,
} from "./styled";
import { TransactionsTable } from "@/ui/Table";
import { Charts } from "../Charts";
import { parseAmount } from "@/utils/parseAmount";
import { formatCurrency } from "@/utils/formatCurrency";
interface IDashboardCards {
  revenue: number;
  expenses: number;
  pendingTransactions: number;
  totalBalance: number;
}

interface IDashboarPage {
  filterOptions: {
    account: string[];
    industry: string[];
    state: string[];
    transaction_type: string[];
  };
  format: ITransaction[];
}

export default function DashboardPage({
  filterOptions,
  format,
}: IDashboarPage) {
  const [dashboardCards, setDashboardCards] = useState<IDashboardCards>({
    revenue: 0,
    expenses: 0,
    pendingTransactions: 0,
    totalBalance: 0,
  });

  const [loadingCard, setLoadingCard] = useState(true);

  const [dataTable, setDataTable] = useState<ITransaction[]>(format);

  function calculateDashboardCards(data: ITransaction[]): IDashboardCards {
    const now = Date.now();

    const revenue = data
      .filter((tx) => tx.transaction_type === "deposit")
      .reduce((sum, tx) => sum + parseAmount(tx.amount), 0);

    const expenses = data
      .filter((tx) => tx.transaction_type === "withdraw")
      .reduce((sum, tx) => sum + parseAmount(tx.amount), 0);

    const pendingTransactions = data.filter(
      (tx) => Number(tx.date) > now
    ).length;

    const totalBalance = revenue - expenses;

    return {
      revenue,
      expenses,
      pendingTransactions,
      totalBalance,
    };
  }

  useEffect(() => {
    const cards = calculateDashboardCards(format);
    setLoadingCard(false);
    setDashboardCards(cards);
    setDataTable(format);
  }, [format]);

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <Header filterOptions={filterOptions} />
        <ContentWrapper>
          <Card>
            Revenue:{" "}
            {loadingCard ? <Spinner /> : formatCurrency(dashboardCards.revenue)}
          </Card>
          <Card>
            Expenses:{" "}
            {loadingCard ? (
              <Spinner />
            ) : (
              formatCurrency(dashboardCards.expenses)
            )}
          </Card>
          <Card>
            Pending:
            {loadingCard ? (
              <Spinner />
            ) : (
              formatCurrency(dashboardCards.pendingTransactions)
            )}
          </Card>
          <Card>
            Total Balance:
            {loadingCard ? (
              <Spinner />
            ) : (
              formatCurrency(dashboardCards.totalBalance)
            )}
          </Card>

          <TransactionsTable data={dataTable} itemsPerPage={10} />
          {dataTable.length > 0 && <Charts data={dataTable} />}
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
}
