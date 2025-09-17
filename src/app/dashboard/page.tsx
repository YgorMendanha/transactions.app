import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/dashboard/Dashboard";
import transactions from "@/db/transactions.json";
import { ITransaction } from "@/types/transaction";
import { AuthValidation } from "@/ultis/auth";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const auth = AuthValidation(token);
  if (!auth) {
    redirect("/");
  }

  const data: ITransaction[] = transactions as ITransaction[];
  const orderedData = data.sort((a, b) => b.date - a.date);

  return <DashboardPage data={orderedData} />;
}
