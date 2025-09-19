import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/dashboard/Dashboard";
import transactions from "@/db/transactions.json";
import { ITransaction } from "@/types/transaction";
import { AuthValidation } from "@/utils/auth";
import { filterTransactions } from "@/utils/filterDashboard";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Record<string, any> | Promise<Record<string, any>>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const params = await Promise.resolve(searchParams);

  const auth = AuthValidation(token);
  if (!auth) {
    redirect("/");
  }

  const data: ITransaction[] = transactions as ITransaction[];

  const result = filterTransactions({
    data: data.slice(0, 100),
    startDate: params.start,
    endDate: params.end,
    accounts: params.account,
    industries: params.industry,
    states: params.state,
    transactionTypes: params.type,
  });

  function buildFilterOptions(
    data: {
      account: string;
      industry: string;
      state: string;
      transaction_type: string;
    }[]
  ) {
    const accounts = new Set<string>();
    const industries = new Set<string>();
    const states = new Set<string>();
    const transaction_type = new Set<string>();

    data.forEach((d) => {
      if (d.account) accounts.add(d.account);
      if (d.industry) industries.add(d.industry);
      if (d.state) states.add(d.state);
      if (d.transaction_type) transaction_type.add(d.transaction_type);
    });

    return {
      account: Array.from(accounts),
      industry: Array.from(industries),
      state: Array.from(states),
      transaction_type: Array.from(transaction_type),
    };
  }

  const filterOptions = buildFilterOptions(data);

  return <DashboardPage format={result} filterOptions={filterOptions} />;
}
