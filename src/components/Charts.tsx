import React, { useMemo } from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart as ReLineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import type { ITransaction } from "@/types/transaction";
import styled, { useTheme } from "styled-components";
import { useWindowSize } from "@/hooks/useWindowSize";

const ChartsWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
  grid-column: 1 / -1;
  width: 100%;
  margin-top: 0px;
  overflow-x: auto;
  padding: 0px 10px;
  p {
    font-weight: bold;
    margin-top: 20px;
  }
`;

const ChartsContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  p {
    font-weight: bold;
    margin-top: 20px;
  }
`;

function prepareChartDataOptimized(data: ITransaction[], targetPoints = 1000) {
  const parseAmount = (amountStr: string | number) => {
    const n = Number(amountStr) || 0;
    return n / 100;
  };

  const industryMap = new Map<string, { deposit: number; withdraw: number }>();
  const accountMap = new Map<string, { deposit: number; withdraw: number }>();
  const deltas: { ts: number; delta: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    const tx = data[i];
    const amt = parseAmount(tx.amount);

    // === Industry aggregation ===
    const ind = (tx.industry ?? "Unknown").toString();
    if (!industryMap.has(ind))
      industryMap.set(ind, { deposit: 0, withdraw: 0 });
    const curInd = industryMap.get(ind)!;
    if (tx.transaction_type === "deposit") curInd.deposit += amt;
    else curInd.withdraw += amt;

    // === Account aggregation (saldo) ===
    const acc = (tx.account ?? "Unknown").toString().trim() || "Unknown";
    if (!accountMap.has(acc)) accountMap.set(acc, { deposit: 0, withdraw: 0 });
    const curAcc = accountMap.get(acc)!;
    if (tx.transaction_type === "deposit") curAcc.deposit += amt;
    else curAcc.withdraw += amt;

    // === Timeline deltas ===
    const ts =
      typeof tx.date === "number" ? tx.date : new Date(tx.date).getTime();
    const delta = tx.transaction_type === "deposit" ? amt : -amt;
    if (!Number.isFinite(ts)) continue;
    deltas.push({ ts, delta });
  }

  // === Bar chart data ===
  const barChartData = Array.from(industryMap.entries()).map(
    ([industry, v]) => ({
      industry,
      deposit: v.deposit,
      withdraw: v.withdraw,
    })
  );

  // === Heatmap data (saldo por conta) ===
  const heatmapData = Array.from(accountMap.entries())
    .map(([account, v]) => ({
      account,
      balance: v.deposit - v.withdraw,
    }))
    .sort((a, b) => b.balance - a.balance); // do maior para o menor saldo

  // === Line chart data ===
  deltas.sort((a, b) => a.ts - b.ts);
  const N = deltas.length;
  const finalLine: { date: string; balance: number }[] = [];

  if (N === 0) return { barChartData, lineChartData: [], heatmapData };

  if (N <= targetPoints) {
    let cumulative = 0;
    for (let i = 0; i < N; i++) {
      cumulative += deltas[i].delta;
      finalLine.push({
        date: new Date(deltas[i].ts).toLocaleDateString("pt-BR"),
        balance: cumulative,
      });
    }
  } else {
    const minTs = deltas[0].ts;
    const maxTs = deltas[N - 1].ts;
    const range = Math.max(1, maxTs - minTs);
    const bucketMs = Math.ceil(range / targetPoints);

    const buckets = new Map<
      number,
      { tsSum: number; deltaSum: number; count: number }
    >();
    for (let i = 0; i < N; i++) {
      const { ts, delta } = deltas[i];
      const idx = Math.floor((ts - minTs) / bucketMs);
      const cur = buckets.get(idx);
      if (!cur) buckets.set(idx, { tsSum: ts, deltaSum: delta, count: 1 });
      else {
        cur.tsSum += ts;
        cur.deltaSum += delta;
        cur.count += 1;
      }
    }

    let cumulative = 0;
    const keys = Array.from(buckets.keys()).sort((a, b) => a - b);
    for (let k = 0; k < keys.length; k++) {
      const b = buckets.get(keys[k])!;
      const avgTs = Math.round(b.tsSum / b.count);
      cumulative += b.deltaSum;
      finalLine.push({
        date: new Date(avgTs).toLocaleDateString("pt-BR"),
        balance: cumulative,
      });
    }
  }

  return { barChartData, lineChartData: finalLine, heatmapData };
}

export const Charts = ({ data }: { data: ITransaction[] }) => {
  const theme = useTheme();
  const { width } = useWindowSize();
  const mobileDesign = width < 500;

  const { barChartData, lineChartData, heatmapData } = useMemo(() => {
    return prepareChartDataOptimized(data, 1200);
  }, [data]);

  const currencyFormatter = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return (
    <>
      <ChartsWrapper>
        <p>Total deposits and withdrawals per sector</p>
        <ChartsContainer>
          <ResponsiveContainer
            width="100%"
            minWidth={800}
            height={mobileDesign ? 300 : 450}
          >
            <ReBarChart
              data={barChartData}
              margin={{ top: 20, right: 60, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="industry"
                interval={0}
                angle={-20}
                stroke={theme.colors.text}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke={theme.colors.text}
                tickFormatter={currencyFormatter}
              />
              <Tooltip
                contentStyle={{ backgroundColor: theme.colors.background }}
                formatter={(v) => currencyFormatter(Number(v))}
              />
              <Legend />
              <Bar dataKey="deposit" fill="#4caf50" />
              <Bar dataKey="withdraw" fill="#f44336" />
            </ReBarChart>
          </ResponsiveContainer>
        </ChartsContainer>
      </ChartsWrapper>

      <ChartsWrapper>
        <p>Total balance over time</p>
        <ChartsContainer>
          <ResponsiveContainer
            width="100%"
            minWidth={800}
            height={mobileDesign ? 300 : 450}
          >
            <ReLineChart
              data={lineChartData}
              margin={{ top: 20, right: 50, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                stroke={theme.colors.text}
                dataKey="date"
                interval={Math.max(0, Math.floor(lineChartData.length / 8))}
              />
              <YAxis
                stroke={theme.colors.text}
                tickFormatter={currencyFormatter}
              />
              <Tooltip
                contentStyle={{ backgroundColor: theme.colors.background }}
                formatter={(v) => currencyFormatter(Number(v))}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={theme.colors.secondary}
                dot={false}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </ChartsContainer>
      </ChartsWrapper>

      <ChartsWrapper>
        <p>Net balance of each account</p>
        <ChartsContainer>
          <ResponsiveContainer
            width="100%"
            minWidth={800}
            height={mobileDesign ? 600 : 800}
          >
            <ReBarChart
              layout="vertical"
              data={heatmapData}
              margin={{ top: 20, right: 50, left: 50, bottom: 5 }}
            >
              <XAxis
                type="number"
                stroke={theme.colors.text}
                tickFormatter={currencyFormatter}
              />
              <YAxis
                stroke={theme.colors.text}
                type="category"
                angle={-10}
                tick={{ fontSize: 12 }}
                dataKey="account"
              />
              <Tooltip
                contentStyle={{ backgroundColor: theme.colors.background }}
                formatter={(value) => currencyFormatter(Number(value))}
              />
              <Bar dataKey="balance" fill="#03a9f4" />
            </ReBarChart>
          </ResponsiveContainer>
        </ChartsContainer>
      </ChartsWrapper>
    </>
  );
};
