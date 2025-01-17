'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Building2, MapPin, DollarSign, Home, BedDouble, Bath, 
  Ruler, Camera, Upload, Wifi, Car, Dumbbell, TreePine,
  UtensilsCrossed, Tv, Fan, CalendarDays, X
} from 'lucide-react';

const ApartmentSubmissionForm = () => {
  const [images, setImages] = useState<any>([]);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState();
  
  const amenities = [
    { id: 'wifi', label: 'Wi-Fi', icon: <Wifi className="h-4 w-4" /> },
    { id: 'parking', label: 'Parking', icon: <Car className="h-4 w-4" /> },
    { id: 'gym', label: 'Gym', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 'garden', label: 'Garden', icon: <TreePine className="h-4 w-4" /> },
    { id: 'kitchen', label: 'Kitchen', icon: <UtensilsCrossed className="h-4 w-4" /> },
    { id: 'tv', label: 'TV', icon: <Tv className="h-4 w-4" /> },
    { id: 'ac', label: 'AC', icon: <Fan className="h-4 w-4" /> },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      description: ''
    }));
    setImages([...images, ...newImages]);
  };

  const handleImageDescription = (index, description) => {
    const newImages = [...images];
    newImages[index].description = description;
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-2 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg dark:bg-zinc-900">
          <CardHeader className="space-y-2">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Submit Your Apartment for Review
              </CardTitle>
            </div>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              Complete the form below to have your apartment featured on our website. 
              Please provide detailed information and high-quality images to showcase your property.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-zinc-900 dark:text-zinc-50">Property Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Luxury Downtown Apartment"
                      className="w-full dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-zinc-900 dark:text-zinc-50">Monthly Rent</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      <Input 
                        id="price" 
                        type="number" 
                        placeholder="2000"
                        className="pl-10 dark:bg-zinc-800 dark:border-zinc-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableFrom" className="text-zinc-900 dark:text-zinc-50">Available From</Label>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal dark:bg-zinc-800 dark:border-zinc-700"
                        >
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-zinc-900 dark:text-zinc-50">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                    <Input 
                      id="address" 
                      placeholder="Full address"
                      className="pl-10 dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox id={amenity.id} />
                      <Label 
                        htmlFor={amenity.id}
                        className="text-zinc-900 dark:text-zinc-50 flex items-center gap-2"
                      >
                        {amenity.icon}
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Details Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Property Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms" className="text-zinc-900 dark:text-zinc-50">Bedrooms</Label>
                    <div className="relative">
                      <BedDouble className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      <Input 
                        id="bedrooms" 
                        type="number" 
                        placeholder="2"
                        className="pl-10 dark:bg-zinc-800 dark:border-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms" className="text-zinc-900 dark:text-zinc-50">Bathrooms</Label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      <Input 
                        id="bathrooms" 
                        type="number" 
                        placeholder="2"
                        className="pl-10 dark:bg-zinc-800 dark:border-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size" className="text-zinc-900 dark:text-zinc-50">Square Footage</Label>
                    <Input 
                      id="size" 
                      type="number" 
                      placeholder="1000"
                      className="dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-zinc-900 dark:text-zinc-50">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a detailed description of your property..."
                    className="h-32 dark:bg-zinc-800 dark:border-zinc-700"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Property Images
                </h3>

                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <h4 className="text-zinc-700 dark:text-zinc-300">Drop your images here</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Upload high-quality images (max 10 images)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button 
                      variant="outline" 
                      className="mt-2 dark:bg-zinc-800 dark:border-zinc-700"
                      onClick={() => document?.getElementById('image-upload')?.click()}
                    >
                      Select Files
                    </Button>
                  </div>
                </div>

                {/* Image Previews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative border rounded-lg p-4 dark:border-zinc-700">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg mb-2"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-zinc-900/50 hover:bg-zinc-900/70"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4 text-white" />
                      </Button>
                      <Textarea
                        placeholder="Describe this image..."
                        value={image.description}
                        onChange={(e) => handleImageDescription(index, e.target.value)}
                        className="mt-2 h-20 dark:bg-zinc-800 dark:border-zinc-700"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  Submit Property for Review
                </Button>
              </div>

              {/* Success Message */}
              {submitted && (
                <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-800 dark:text-green-100">
                  <AlertDescription>
                    Your property has been successfully submitted for review! We'll get back to you soon.
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApartmentSubmissionForm;