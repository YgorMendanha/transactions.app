"use client";

import { OptionType, Select } from "@/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";

export const IndustryFilter = ({ options }: { options: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data: OptionType[] = options.map((o) => ({ label: o, value: o }));

  const addFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const existing = params.getAll("industry");

    if (existing.includes(value)) {
      const filtered = existing.filter((v) => v !== value);
      params.delete("industry");
      filtered.forEach((v) => params.append("industry", v));
    } else {
      params.append("industry", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      placeholder="Industry"
      options={data}
      onChange={(e) => addFilter(e.target.value)}
    />
  );
};
