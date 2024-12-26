"use client";

import { useState } from "react";
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
import { Search, DollarSign, PawPrint, } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ApartmentSearch() {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [petsAllowed, setPetsAllowed] = useState(false);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement search logic here
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Search Apartments</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter city or zip code"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select>
                <SelectTrigger id="bedrooms" className="w-full">
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select>
                <SelectTrigger id="bathrooms" className="w-full">
                  <SelectValue placeholder="Select bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="flex items-center space-x-4">
              <DollarSign className="w-4 h-4" />
              <Slider
                min={0}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="flex-grow"
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="pets-allowed"
              checked={petsAllowed}
              onCheckedChange={setPetsAllowed}
            />
            <Label
              htmlFor="pets-allowed"
              className="flex items-center space-x-2"
            >
              <PawPrint className="w-4 h-4" />
              <span>Pets Allowed</span>
            </Label>
          </div>
          <Button type="submit" className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Search Apartments
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
