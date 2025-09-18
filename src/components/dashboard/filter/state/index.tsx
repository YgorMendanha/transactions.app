"use client";

import { OptionType, Select } from "@/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";

export const StateFilter = ({ options }: { options: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data: OptionType[] = options.map((o) => ({ label: o, value: o }));

  const addFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const existing = params.getAll("state");

    if (existing.includes(value)) {
      const filtered = existing.filter((v) => v !== value);
      params.delete("state");
      filtered.forEach((v) => params.append("state", v));
    } else {
      params.append("state", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      placeholder="State"
      options={data}
      onChange={(e) => addFilter(e.target.value)}
    />
  );
};
