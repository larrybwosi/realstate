"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Search, DollarSign, PawPrint } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ApartmentSearch() {
  // State for filters with URL synchronization using nuqs
  const [priceRange, setPriceRange] = useQueryState("priceRange", {
    defaultValue: [0, 5000],
    parse: (value) => value.split(",").map(Number),
    serialize: (value) => value.join(","),
  });
  const [petsAllowed, setPetsAllowed] = useQueryState("petsAllowed", {
    defaultValue: false,
    parse: (value) => value === "true",
    serialize: (value) => value.toString(),
  });
  const [bedrooms, setBedrooms] = useQueryState("bedrooms", {
    defaultValue: "all",
  });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: "",
  });
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Search Apartments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location Search */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter city or zip code"
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms Filter */}
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select
                value={bedrooms}
                onValueChange={(value) => setBedrooms(value)}
              >
                <SelectTrigger id="bedrooms" className="w-full">
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="flex items-center space-x-4">
              <DollarSign className="w-4 h-4" />
              <Slider
                min={0}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                className="grow"
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Pets Allowed Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              id="pets-allowed"
              checked={petsAllowed}
              onCheckedChange={(value) => setPetsAllowed(value)}
            />
            <Label
              htmlFor="pets-allowed"
              className="flex items-center space-x-2"
            >
              <PawPrint className="w-4 h-4" />
              <span>Pets Allowed</span>
            </Label>
          </div>

          {/* Search Button */}
          <Button type="submit" className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Search Apartments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
