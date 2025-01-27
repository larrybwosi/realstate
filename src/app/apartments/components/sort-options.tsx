"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

export function SortOptions({ defaultValue }: { defaultValue?: string }) {
  const [sort, setSort] = useQueryState("sort");

  return (
    <Select value={sort || defaultValue || ""} onValueChange={setSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="featured">Featured First</SelectItem>
      </SelectContent>
    </Select>
  );
}