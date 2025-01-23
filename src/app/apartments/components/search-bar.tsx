"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`/apartments?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search apartments..."
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}
