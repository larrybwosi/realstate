"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortOptions({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sort", value);
    router.replace(`/apartments?${params.toString()}`);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
      </SelectContent>
    </Select>
  );
}
