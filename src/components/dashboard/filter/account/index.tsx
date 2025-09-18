"use client";

import { OptionType, Select } from "@/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";

export const AccountFilter = ({ options }: { options: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data: OptionType[] = options.map((o) => ({ label: o, value: o }));

  const addFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const existing = params.getAll("account");

    if (existing.includes(value)) {
      const filtered = existing.filter((v) => v !== value);
      params.delete("account");
      filtered.forEach((v) => params.append("account", v));
    } else {
      params.append("account", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      options={data}
      placeholder="Account"
      onChange={(e) => addFilter(e.target.value)}
    />
  );
};
