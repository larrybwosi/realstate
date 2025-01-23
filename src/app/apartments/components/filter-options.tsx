"use client";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function FilterOptions({
  defaultValues,
}: {
  defaultValues: {
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
}) {
  const router = useRouter();

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(window.location.search);
    params.set("minPrice", formData.get("minPrice") as string);
    params.set("maxPrice", formData.get("maxPrice") as string);
    params.set("bedrooms", formData.get("bedrooms") as string);
    params.set("bathrooms", formData.get("bathrooms") as string);
    router.replace(`/apartments?${params.toString()}`);
  };

  return (
    <form onSubmit={handleFilter} className="space-y-6">
      <div>
        <Label>Price Range</Label>
        <Slider
          defaultValue={[
            Number(defaultValues.minPrice || 0),
            Number(defaultValues.maxPrice || 5000),
          ]}
          min={0}
          max={5000}
          step={100}
          name="priceRange"
        />
        <div className="flex gap-2 mt-2">
          <Input
            type="number"
            name="minPrice"
            placeholder="Min"
            defaultValue={defaultValues.minPrice}
          />
          <Input
            type="number"
            name="maxPrice"
            placeholder="Max"
            defaultValue={defaultValues.maxPrice}
          />
        </div>
      </div>
      <div>
        <Label>Bedrooms</Label>
        <Input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          defaultValue={defaultValues.bedrooms}
        />
      </div>
      <div>
        <Label>Bathrooms</Label>
        <Input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          defaultValue={defaultValues.bathrooms}
        />
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  );
}
