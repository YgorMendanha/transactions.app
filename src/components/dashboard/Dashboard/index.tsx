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
import { parseAmount } from "@/ultis/parseAmount";
import { formatCurrency } from "@/ultis/formatCurrency";

interface IDashboardCards {
  revenue: number;
  expenses: number;
  pendingTransactions: number;
  totalBalance: number;
}

export default function DashboardPage({ data }: { data: ITransaction[] }) {
  const [dashboardCards, setDashboardCards] = useState<IDashboardCards>({
    revenue: 0,
    expenses: 0,
    pendingTransactions: 0,
    totalBalance: 0,
  });

  const [loadingCard, setLoadingCard] = useState(true);

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
    const cards = calculateDashboardCards(data);
    setLoadingCard(false);
    setDashboardCards(cards);
  }, [data]);

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <Header />
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

          <TransactionsTable data={data} itemsPerPage={10} />
          <Charts data={data} />
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
}
