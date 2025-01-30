'use client';
import { useQueryState } from "nuqs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedCallback } from "use-debounce";

type FilterDefaultValues = {
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  categoryType?: string;
  amenities?: string[];
  exposure?: string;
  status?: string;
  features?: string[];
  petsAllowed?: boolean;
  furnished?: boolean;
};

export function FilterOptions({
  defaultValues,
  categories,
  amenityOptions,
}: {
  defaultValues: FilterDefaultValues;
  categories: { type: string; name: string }[];
  amenityOptions: string[];
}) {
  const [minPrice, setMinPrice] = useQueryState("minPrice");
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice");
  const [bedrooms, setBedrooms] = useQueryState("bedrooms");
  const [bathrooms, setBathrooms] = useQueryState("bathrooms");
  const [categoryType, setCategoryType] = useQueryState("categoryType");
  const [amenities, setAmenities] = useQueryState("amenities");
  const [exposure, setExposure] = useQueryState("exposure");
  const [status, setStatus] = useQueryState("status");
  const [petsAllowed, setPetsAllowed] = useQueryState("petsAllowed");
  const [furnished, setFurnished] = useQueryState("furnished");

  // Debounced update functions
  const debouncedSetMinPrice = useDebouncedCallback(setMinPrice, 300);
  const debouncedSetMaxPrice = useDebouncedCallback(setMaxPrice, 300);
  const debouncedSetBedrooms = useDebouncedCallback(setBedrooms, 300);
  const debouncedSetBathrooms = useDebouncedCallback(setBathrooms, 300);

  const handleAmenitiesChange = (checked: boolean, value: string) => {
    const currentAmenities = amenities ? amenities.split(",") : [];
    let newAmenities;

    if (checked) {
      newAmenities = [...currentAmenities, value];
    } else {
      newAmenities = currentAmenities.filter((a) => a !== value);
    }

    setAmenities(newAmenities.join(","));
  };

  const handleReset = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setBedrooms(null);
    setBathrooms(null);
    setCategoryType(null);
    setAmenities(null);
    setExposure(null);
    setStatus(null);
    setPetsAllowed(null);
    setFurnished(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Category Type</Label>
        <Select value={categoryType || ""} onValueChange={setCategoryType}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.type} value={category.type}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Price Range</Label>
        <Slider
          defaultValue={[
            Number(minPrice || defaultValues?.minPrice || 0),
            Number(maxPrice || defaultValues?.maxPrice || 5000),
          ]}
          min={0}
          max={5000}
          step={100}
          onValueChange={(value) => {
            debouncedSetMinPrice(value[0].toString());
            debouncedSetMaxPrice(value[1].toString());
          }}
        />
        <div className="flex gap-2 mt-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice || ""}
            onChange={(e) => debouncedSetMinPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={(e) => debouncedSetMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Bedrooms</Label>
          <Input
            type="number"
            value={bedrooms || ""}
            onChange={(e) => debouncedSetBedrooms(e.target.value)}
          />
        </div>
        <div>
          <Label>Bathrooms</Label>
          <Input
            type="number"
            value={bathrooms || ""}
            onChange={(e) => debouncedSetBathrooms(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Exposure</Label>
        <RadioGroup value={exposure || ""} onValueChange={setExposure}>
          {["North", "South", "East", "West"].map((dir) => (
            <div key={dir} className="flex items-center space-x-2">
              <RadioGroupItem value={dir} id={dir} />
              <Label htmlFor={dir}>{dir}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label>Status</Label>
        <Select value={status || ""} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
            <SelectItem value="maintenance">Under Maintenance</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-2">
          {amenityOptions?.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={amenities?.includes(amenity)}
                onCheckedChange={(checked) =>
                  handleAmenitiesChange(checked as boolean, amenity)
                }
              />
              <Label htmlFor={amenity}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="petsAllowed"
          checked={petsAllowed === "true"}
          onCheckedChange={(checked) => setPetsAllowed(checked ? "true" : null)}
        />
        <Label htmlFor="petsAllowed">Pets Allowed</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="furnished"
          checked={furnished === "true"}
          onCheckedChange={(checked) => setFurnished(checked ? "true" : null)}
        />
        <Label htmlFor="furnished">Furnished</Label>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleReset}
      >
        Reset Filters
      </Button>
    </div>
  );
}
