"use client";

import { useEffect, useState } from "react";

import {
  createStaticRanges,
  DateRange,
  DateRangePicker,
} from "react-date-range";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useRouter } from "next/navigation";

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "@/ui/Button";
import { useTheme } from "styled-components";
import { WrapperDate } from "./styled";
import { useWindowSize } from "@/hooks/useWindowSize";

export interface FilterRevenuesExpensesInterface {
  status: { id: number; name: string; value: string }[];
}

export const initialStateFilterRevenuesExpenses: FilterRevenuesExpensesInterface =
  {
    status: [],
  };

const initialStateFilter = {
  filter: {
    startDate: new Date(),
    endDate: new Date(),
    key: "filter",
  },
};

export const SelectDate = () => {
  const router = useRouter();
  const theme = useTheme();
  const { width } = useWindowSize();

  const [dates, setDates] = useState(initialStateFilter);

  const customStaticRanges = createStaticRanges([
    {
      label: "Hoje",
      range: () => ({
        startDate: dayjs().toDate(),
        endDate: dayjs().toDate(),
      }),
      isSelected: (range) =>
        dayjs(range.startDate).isSame(dayjs(), "day") &&
        dayjs(range.endDate).isSame(dayjs(), "day"),
    },
    {
      label: "Semana Atual",
      range: () => ({
        startDate: dayjs().weekday(0).toDate(),
        endDate: dayjs().weekday(6).toDate(),
      }),

      isSelected: (range) =>
        dayjs(range.startDate).isSame(dayjs().weekday(0), "day") &&
        dayjs(range.endDate).isSame(dayjs().weekday(6), "day"),
    },
    {
      label: "Mês Atual",
      range: () => ({
        startDate: dayjs().startOf("month").toDate(),
        endDate: dayjs().endOf("month").toDate(),
      }),
      isSelected: (range) =>
        dayjs(range.startDate).isSame(dayjs().startOf("month"), "day") &&
        dayjs(range.endDate).isSame(dayjs().endOf("month"), "day"),
    },
    {
      label: "Mês Passado",
      range: () => {
        const lastMonth = dayjs().subtract(1, "month");
        return {
          startDate: lastMonth.startOf("month").toDate(),
          endDate: lastMonth.endOf("month").toDate(),
        };
      },
      isSelected: (range) => {
        const lastMonth = dayjs().subtract(1, "month");
        return (
          dayjs(range.startDate).isSame(lastMonth.startOf("month"), "day") &&
          dayjs(range.endDate).isSame(lastMonth.endOf("month"), "day")
        );
      },
    },
    {
      label: "Este Ano",
      range: () => ({
        startDate: dayjs().startOf("year").toDate(),
        endDate: dayjs().endOf("year").toDate(),
      }),
      isSelected: (range) =>
        dayjs(range.startDate).isSame(dayjs().startOf("year"), "day") &&
        dayjs(range.endDate).isSame(dayjs().endOf("year"), "day"),
    },
    {
      label: "Periodo Total",
      range: () => {
        return {
          startDate: dayjs().toDate(),
          endDate: dayjs().toDate(),
        };
      },
      isSelected: (range) =>
        dayjs(range.startDate).isSame(dayjs().startOf("year"), "day") &&
        dayjs(range.endDate).isSame(dayjs().endOf("year"), "day"),
    },
  ]);

  const onChange = (newDate: any) => {
    if (newDate["filter"]) {
      setDates({ filter: newDate["filter"] });
      const startDate = dayjs(newDate["filter"].startDate).toISOString();
      const endDate = dayjs(newDate["filter"].endDate).toISOString();
      router.push(`?start=${startDate}&end=${endDate}`);
    }
  };

  const mobileDesign = width < 800;

  return (
    <WrapperDate>
      {mobileDesign ? (
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          onChange={(item) => onChange(item)}
          ranges={[dates.filter]}
        />
      ) : (
        <DateRangePicker
          rangeColors={[theme.colors.primary]}
          onChange={(item) => onChange(item)}
          moveRangeOnFirstSelection={false}
          ranges={[dates.filter]}
          direction="horizontal"
          staticRanges={customStaticRanges}
        />
      )}
      <Button
        variant="default"
        onClick={() => {
          setDates(initialStateFilter);
          router.push(`?`);
        }}
        style={{ margin: "10px  0" }}
      >
        Resetar
      </Button>
    </WrapperDate>
  );
};
