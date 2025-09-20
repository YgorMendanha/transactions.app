import { ITransaction } from "@/types/transaction";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function looksLikeDateOnly(v?: string | number | Date) {
  if (v === undefined || v === null) return false;
  if (typeof v === "number") return false;
  const s = String(v).trim();
  return /^\d{4}[-/]\d{2}[-/]\d{2}$/.test(s);
}

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
    if (typeof v === "number" && Number.isFinite(v)) {
      if (v < 1e11) return Math.floor(v) * 1000;
      return Math.floor(v);
    }
    const s = String(v).trim();
    if (/^\d{10}$/.test(s)) return Number(s) * 1000;
    if (/^\d{13}$/.test(s)) return Number(s);
    const d = dayjs.utc(s);
    return d.isValid() ? d.valueOf() : undefined;
  };

  const startRaw = toMs(startDate);
  const endRaw = toMs(endDate);

  console.debug("[filterTransactions] startDate raw input:", startDate);
  console.debug("[filterTransactions] endDate raw input:", endDate);
  console.debug("[filterTransactions] startRaw(ms):", startRaw, startRaw ? new Date(startRaw).toISOString() : null);
  console.debug("[filterTransactions] endRaw(ms):", endRaw, endRaw ? new Date(endRaw).toISOString() : null);

  const itemTs = data
    .map((d) => toMs(d.date))
    .filter((t): t is number => typeof t === "number" && !Number.isNaN(t));

  if (itemTs.length === 0) {
    console.debug("[filterTransactions] nenhum timestamp válido em data");
    return [];
  }

  const minTs = Math.min(...itemTs);
  const maxTs = Math.max(...itemTs);

  let startMs = startRaw ?? dayjs.utc(minTs).startOf("day").valueOf();
  let endMs = endRaw ?? dayjs.utc(maxTs).endOf("day").valueOf();

  const startIsDateOnly = looksLikeDateOnly(startDate);
  const endIsDateOnly = looksLikeDateOnly(endDate);

  if (startRaw !== undefined && endRaw !== undefined) {
    if (startRaw === endRaw) {
      if (startIsDateOnly && endIsDateOnly) {
        const sDay = dayjs.utc(startRaw).format("YYYY-MM-DD");
        startMs = dayjs.utc(sDay).startOf("day").valueOf();
        endMs = dayjs.utc(sDay).endOf("day").valueOf();
        console.debug("[filterTransactions] expanded date-only equal inputs to UTC day:", sDay);
      } else {
        startMs = startRaw;
        endMs = endRaw;
        console.debug("[filterTransactions] equal inputs with time -> using instants as-is");
      }
    } else {
      if (startIsDateOnly && endIsDateOnly) {
        const sDay = dayjs.utc(startRaw).format("YYYY-MM-DD");
        const eDay = dayjs.utc(endRaw).format("YYYY-MM-DD");
        if (sDay === eDay) {
          startMs = dayjs.utc(sDay).startOf("day").valueOf();
          endMs = dayjs.utc(sDay).endOf("day").valueOf();
          console.debug("[filterTransactions] different instants but same date-only -> expanded to UTC day:", sDay);
        } else {
          startMs = startRaw;
          endMs = endRaw;
          console.debug("[filterTransactions] different date-only days -> using instants");
        }
      } else {
        startMs = startRaw;
        endMs = endRaw;
        console.debug("[filterTransactions] at least one input has time -> using instants");
      }
    }
  }

  console.debug("[filterTransactions] final window (ms):", startMs, endMs);
  console.debug("[filterTransactions] final window (ISO):", new Date(startMs).toISOString(), new Date(endMs).toISOString());

  const normalize = (v?: string | string[] | undefined): string[] | null => {
    if (v === undefined || v === null) return null;
    const arr = Array.isArray(v) ? v : [v];
    const cleaned = arr.map((x) => String(x).trim().toLowerCase()).filter(Boolean);
    return cleaned.length ? cleaned : null;
  };

  const accs = normalize(accounts);
  const inds = normalize(industries);
  const sts = normalize(states);
  const types = normalize(transactionTypes);

  const matches = (list: string[] | null, value?: unknown) => {
    if (!list) return true;
    return list.includes(String(value ?? "").trim().toLowerCase());
  };

  data.slice(0, 10).forEach((it, idx) => {
    const ts = toMs(it.date);
    console.debug(`[filterTransactions] sample[${idx}] raw date:`, it.date, "-> ts:", ts, ts ? new Date(ts).toISOString() : null);
  });

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

  const sorted = result.sort((a, b) => {
    const ta = toMs(a.date) ?? 0;
    const tb = toMs(b.date) ?? 0;
    return tb - ta;
  });

  console.debug("[filterTransactions] result count:", sorted.length);

  return sorted;
}
