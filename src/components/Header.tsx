"use client";

import styled from "styled-components";
import { Tooltip } from "@/ui/Tooltip";
import { useEffect, useState, useCallback, useRef } from "react";
import dayjs from "dayjs";
import { Button } from "@/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";
import { SelectDate, SelectFilter } from "./Filter";

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  @media (min-width: 720px) {
    padding-right: 70px;
  }
`;

const TopRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  @media (max-width: 720px) {
    height: 40px;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;

  @media (max-width: 720px) {
    justify-content: space-between;
  }
`;

const TagsRow = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 6px;
  overflow-x: auto;
  flex-wrap: wrap;
  justify-content: flex-start;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 6px;
  }
`;

const TagFilter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 10px 15px;
  border-radius: 999px;
  background: ${({ theme }) => `${theme.colors.primary}22`};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
  flex-shrink: 0;
`;

const TagMain = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 720px) {
    max-width: 100px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TagType = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 6px;
  background: ${({ theme }) => `${theme.colors.primary}33`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  + span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    @media (max-width: 720px) {
      max-width: 100%;
    }
  }
`;

const TagClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  line-height: 1;
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
`;

type TagItem = {
  type: "account" | "industry" | "state" | "type";
  value: string;
};

export const Header = ({
  filterOptions,
}: {
  filterOptions: {
    account: string[];
    industry: string[];
    state: string[];
    transaction_type: string[];
  };
}) => {
  const [labelCalendar, setLabelCalendar] = useState("Total Period");

  const searchParams = useSearchParams();
  const router = useRouter();

  const dateIni = searchParams.get("start") ?? "";
  const dateFim = searchParams.get("end") ?? "";

  const accountFilter = searchParams.getAll("account");
  const industryFilter = searchParams.getAll("industry");
  const stateFilter = searchParams.getAll("state");
  const typeFilter = searchParams.getAll("type");

  const combinedTags: TagItem[] = [
    ...accountFilter.map((v) => ({ type: "account" as const, value: v })),
    ...industryFilter.map((v) => ({ type: "industry" as const, value: v })),
    ...stateFilter.map((v) => ({ type: "state" as const, value: v })),
    ...typeFilter.map((v) => ({ type: "type" as const, value: v })),
  ];

  useEffect(() => {
    if (!dateIni && !dateFim) {
      setLabelCalendar("Total Period");
      return;
    }

    const start = dayjs(dateIni);
    const end = dayjs(dateFim);

    const isSameYear =
      start.isValid() &&
      end.isValid() &&
      start.isSame(dayjs().startOf("year"), "day") &&
      end.isSame(dayjs().endOf("year"), "day");

    if (isSameYear) {
      setLabelCalendar("This Year");
      return;
    }

    const lastMonth = dayjs().subtract(1, "month");
    const isLastMonth =
      start.isValid() &&
      end.isValid() &&
      start.isSame(lastMonth.startOf("month"), "day") &&
      end.isSame(lastMonth.endOf("month"), "day");

    if (isLastMonth) {
      setLabelCalendar("Last Month");
      return;
    }

    const isSameMonth =
      start.isValid() &&
      end.isValid() &&
      start.isSame(dayjs().startOf("month"), "day") &&
      end.isSame(dayjs().endOf("month"), "day");

    if (isSameMonth) {
      setLabelCalendar("Current Month");
      return;
    }

    const isSameWeek =
      start.isValid() &&
      end.isValid() &&
      start.isSame(dayjs().weekday(0), "day") &&
      end.isSame(dayjs().weekday(6), "day");

    if (isSameWeek) {
      setLabelCalendar("Current Week");
      return;
    }

    const today =
      start.isValid() &&
      end.isValid() &&
      start.isSame(dayjs(), "day") &&
      end.isSame(dayjs(), "day");

    if (today) {
      setLabelCalendar("Today");
      return;
    }

    if (start.isValid() && end.isValid()) {
      // Formato inglês MM/DD
      setLabelCalendar(`${start.format("MM/DD")} - ${end.format("MM/DD")}`);
    } else {
      setLabelCalendar("Total Period");
    }
  }, [dateIni, dateFim]);

  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const setHeaderVar = () => {
      const h = headerRef.current?.offsetHeight ?? 0;

      document.documentElement.style.setProperty("--header-height", `${h}px`);
    };

    const update = () => requestAnimationFrame(setHeaderVar);

    update();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      ro = new ResizeObserver(update);
      ro.observe(headerRef.current);
    }

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      if (ro) ro.disconnect();
    };
  }, []);

  const removeFilter = useCallback(
    (type: TagItem["type"], value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.getAll(type).filter((v) => v !== value);
      params.delete(type);
      existing.forEach((v) => params.append(type, v));
      const qs = params.toString();

      router.push(`?${qs}`);
    },
    [searchParams, router]
  );

  return (
    <HeaderContainer ref={headerRef}>
      <TopRow>
        <Title>Dashboard</Title>

        <Controls>
          <ControlGroup>
            <SelectFilter filter="account" options={filterOptions.account} />
            <SelectFilter filter="industry" options={filterOptions.industry} />
            <SelectFilter filter="state" options={filterOptions.state} />
            <SelectFilter
              filter="type"
              options={filterOptions.transaction_type}
            />
            <Tooltip content={<SelectDate />}>
              <Button $variant="default">{labelCalendar}</Button>
            </Tooltip>
          </ControlGroup>
        </Controls>
      </TopRow>

      {/* Tags */}
      {combinedTags.length > 0 && (
        <TagsRow aria-label="Filtros aplicados">
          {combinedTags.map((tag) => (
            <TagFilter key={`${tag.type}-${tag.value}`}>
              <TagMain>
                <TagType>{tag.type}</TagType>
                <span>{tag.value}</span>
              </TagMain>
              <TagClose
                aria-label={`Remover filtro ${tag.value}`}
                onClick={() => removeFilter(tag.type, tag.value)}
              >
                ×
              </TagClose>
            </TagFilter>
          ))}
        </TagsRow>
      )}
    </HeaderContainer>
  );
};
