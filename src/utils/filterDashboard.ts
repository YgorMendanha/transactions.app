import { ITransaction } from "@/types/transaction";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TZ = "America/Sao_Paulo";

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
    const d = dayjs(v).tz(DEFAULT_TZ);
    return d.isValid() ? d.valueOf() : undefined;
  };

  const startRaw = toMs(startDate);
  const endRaw = toMs(endDate);

  let startMs = startRaw ?? dayjs().tz(DEFAULT_TZ).startOf("day").valueOf();
  let endMs = endRaw ?? dayjs().tz(DEFAULT_TZ).endOf("day").valueOf();

  if (startRaw !== undefined && endRaw !== undefined && startRaw === endRaw) {
    const localDay = dayjs.tz(startRaw, DEFAULT_TZ).format("YYYY-MM-DD");
    startMs = dayjs.tz(localDay, DEFAULT_TZ).startOf("day").valueOf();
    endMs = dayjs.tz(localDay, DEFAULT_TZ).endOf("day").valueOf();
  }

  console.debug(
    `[filterTransactions] FILTER WINDOW SP: ${dayjs(startMs)
      .tz(DEFAULT_TZ)
      .format("YYYY-MM-DD HH:mm:ss")} → ${dayjs(endMs)
      .tz(DEFAULT_TZ)
      .format("YYYY-MM-DD HH:mm:ss")}`
  );
  console.debug(
    `[filterTransactions] FILTER WINDOW UTC: ${new Date(
      startMs
    ).toISOString()} → ${new Date(endMs).toISOString()}`
  );

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

  const result = data.filter((item, idx) => {
    const ts = toMs(item.date);
    const spDate = ts
      ? dayjs(ts).tz(DEFAULT_TZ).format("YYYY-MM-DD HH:mm:ss")
      : "invalid";

    const pass =
      ts !== undefined &&
      ts >= startMs &&
      ts <= endMs &&
      matches(accs, item.account) &&
      matches(inds, item.industry) &&
      matches(sts, item.state) &&
      matches(types, item.transaction_type);

    if (pass) {
      console.debug(
        `[${idx}] original: ${item.date} | timestamp: ${ts} | SP: ${spDate} | PASS FILTER: ${pass}`
      );
    }

    return pass;
  });

  return result.sort((a, b) => (toMs(b.date) ?? 0) - (toMs(a.date) ?? 0));
}
