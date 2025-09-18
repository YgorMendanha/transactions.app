"use client";

import { OptionType, Select } from "@/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";

export const TypeFilter = ({ options }: { options: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data: OptionType[] = options.map((o) => ({ label: o, value: o }));

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("type", value);
    } else {
      params.delete("type");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      placeholder="Type"
      options={data}
      value={searchParams.get("type") ?? ""}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};
