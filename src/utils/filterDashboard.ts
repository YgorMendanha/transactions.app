import { ITransaction } from "@/types/transaction";
import dayjs from "dayjs";

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

  const toMs = (v?: string | number | Date): number | undefined => {
    if (v === undefined || v === null || v === "") return undefined;
    if (typeof v === "number" && Number.isFinite(v)) return v;
    const s = String(v).trim();
    if (/^\d{10}$/.test(s)) return Number(s) * 1000;
    if (/^\d{13}$/.test(s)) return Number(s);
    const d = dayjs(s);
    return d.isValid() ? d.valueOf() : undefined;
  };

  const itemTs = data
    .map((d) => toMs(d.date))
    .filter((t): t is number => typeof t === "number" && !Number.isNaN(t));

  if (itemTs.length === 0) return [];

  const minTs = Math.min(...itemTs);
  const maxTs = Math.max(...itemTs);

  const startMs = toMs(startDate) ?? dayjs(minTs).startOf("day").valueOf();
  const endMs = toMs(endDate) ?? dayjs(maxTs).endOf("day").valueOf();

  const normalize = (v?: string | string[] | undefined): string[] | null => {
    if (v === undefined || v === null) return null;
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

  const result = data.filter((item) => {
    const ts = toMs(item.date);
    if (ts === undefined) return false;
    if (ts < startMs || ts > endMs) return false;
    if (!matches(accs, item.account)) return false;
    if (!matches(inds, item.industry)) return false;
    if (!matches(sts, item.state)) return false;
    if (!matches(types, item.transaction_type)) return false;
    return true;
  });

  return result.sort((a, b) => {
    const ta = toMs(a.date) ?? 0;
    const tb = toMs(b.date) ?? 0;
    return tb - ta;
  });
}
