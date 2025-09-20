"use client";

import { OptionType, Select } from "@/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";

export const SelectFilter = ({
  options,
  filter,
}: {
  options: string[];
  filter: "account" | "industry" | "state" | "type";
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data: OptionType[] = options.map((o) => ({ label: o, value: o }));

  const addFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const existing = params.getAll(filter);

    if (existing.includes(value)) {
      const filtered = existing.filter((v) => v !== value);
      params.delete(filter);
      filtered.forEach((v) => params.append(filter, v));
    } else {
      params.append(filter, value);
    }

    router.push(`?${params.toString()}`);
  };

  const capitalized = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Select
      options={data}
      placeholder={capitalized(filter)}
      onChange={(e) => addFilter(e.target.value)}
    />
  );
};
