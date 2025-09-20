import { ITransaction } from "@/types/transaction";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function filterTransactions({
  data,
  startDate,
  endDate,
  accounts,
  industries,
  states,
  transactionTypes,
}: {
  data: ITransaction[];
  startDate?: string | number | Date;
  endDate?: string | number | Date;
  accounts?: string | string[];
  industries?: string | string[];
  states?: string | string[];
  transactionTypes?: string | string[];
}): ITransaction[] {
  if (!data || data.length === 0) return [];

  const normalize = (v?: string | string[] | undefined): string[] | null => {
    if (!v) return null;
    const arr = Array.isArray(v) ? v : [v];
    const cleaned = arr
      .map((x) => String(x).trim().toLowerCase())
      .filter(Boolean);
    return cleaned.length ? cleaned : null;
  };

  const accs = normalize(accounts);
  const inds = normalize(industries);
  const sts = normalize(states);
  const types = normalize(transactionTypes);

  const matches = (list: string[] | null, value?: unknown) => {
    if (!list) return true;
    return list.includes(
      String(value ?? "")
        .trim()
        .toLowerCase()
    );
  };

  const start = startDate ? dayjs.utc(startDate).startOf("day") : undefined;
  const end = endDate ? dayjs.utc(endDate).endOf("day") : undefined;

  const result = data.filter((item) => {
    const date = dayjs.utc(item.date);

   
    if ((start && date.isBefore(start)) || (end && date.isAfter(end))) {
      return false;
    }

    if (!matches(accs, item.account)) return false;
    if (!matches(inds, item.industry)) return false;
    if (!matches(sts, item.state)) return false;
    if (!matches(types, item.transaction_type)) return false;

    return true;
  });

  return result.sort((a, b) => dayjs.utc(b.date).diff(dayjs.utc(a.date)));
}
