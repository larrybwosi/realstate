"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTheme } from "next-themes";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  locationDescription: z.string().optional(),
  propertyType: z.enum(["apartment", "house", "office", "other"]),
  size: z.number().min(1, {
    message: "Size must be at least 1 square foot/meter.",
  }),
  sizeUnit: z.enum(["sqft", "sqm"]),
  cleaningType: z.enum(["standard", "deep", "move-in-out", "custom"]),
  outsideCleaningServices: z.array(z.string()).optional(),
  date: z.date({
    required_error: "Please select a date for the cleaning.",
  }),
  time: z.string().min(1, {
    message: "Please select a time for the cleaning.",
  }),
  frequency: z.enum(["one-time", "weekly", "bi-weekly", "monthly"]),
  specialInstructions: z.string().optional(),
});

const outsideCleaningOptions = [
  { id: "lawn", label: "Lawn Mowing" },
  { id: "trimming", label: "Fence Trimming" },
  { id: "garden", label: "Garden Maintenance" },
  { id: "gutters", label: "Gutter Cleaning" },
];

export default function BookCleaningPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme()
  const darkMode = theme === 'dark' 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      locationDescription: "",
      propertyType: "apartment",
      size: 0,
      sizeUnit: "sqft",
      cleaningType: "standard",
      outsideCleaningServices: [],
      date: new Date(),
      time: "",
      frequency: "one-time",
      specialInstructions: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      alert("Booking submitted successfully!");
      form.reset();
    }, 2000);
  }

  return (
    <div
      className={cn(
        "min-h-screen py-12 px-4 sm:px-3 lg:px-8 transition-colors duration-200",
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-100 to-purple-100"
      )}
    >
      <Card
        className={cn(
          "max-w-4xl mx-auto",
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        )}
      >
        <CardHeader
          className={cn(
            "rounded-t-lg",
            darkMode
              ? "bg-gradient-to-r from-blue-900 to-purple-900"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          )}
        >
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">
              Book Your Cleaning Service
            </CardTitle>
          </div>
          <CardDescription
            className={darkMode ? "text-gray-300" : "text-blue-100"}
          >
            Fill out the form below to schedule your cleaning service
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className={darkMode ? "bg-gray-700 text-white" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          className={darkMode ? "bg-gray-700 text-white" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(123) 456-7890"
                          {...field}
                          className={darkMode ? "bg-gray-700 text-white" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin
                            className={cn(
                              "absolute left-3 top-1/2 transform -translate-y-1/2",
                              darkMode ? "text-gray-400" : "text-gray-400"
                            )}
                          />
                          <Input
                            className={cn(
                              "pl-10",
                              darkMode ? "bg-gray-700 text-white" : ""
                            )}
                            placeholder="123 Main St, City, State, ZIP"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="locationDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special details about your location? (e.g., parking instructions, access codes)"
                        className={cn(
                          "resize-none",
                          darkMode ? "bg-gray-700 text-white" : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription
                      className={darkMode ? "text-gray-400" : ""}
                    >
                      Provide any additional information that may help our
                      cleaners locate or access your property.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={darkMode ? "bg-gray-700 text-white" : ""}
                          >
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          className={darkMode ? "bg-gray-700 text-white" : ""}
                        >
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Home
                              className={cn(
                                "absolute left-3 top-1/2 transform -translate-y-1/2",
                                darkMode ? "text-gray-400" : "text-gray-400"
                              )}
                            />
                            <Input
                              type="number"
                              className={cn(
                                "pl-10",
                                darkMode ? "bg-gray-700 text-white" : ""
                              )}
                              placeholder="Size"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sizeUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={
                                darkMode ? "bg-gray-700 text-white" : ""
                              }
                            >
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            className={darkMode ? "bg-gray-700 text-white" : ""}
                          >
                            <SelectItem value="sqft">sq ft</SelectItem>
                            <SelectItem value="sqm">sq m</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cleaningType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cleaning Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={darkMode ? "bg-gray-700 text-white" : ""}
                          >
                            <SelectValue placeholder="Select cleaning type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          className={darkMode ? "bg-gray-700 text-white" : ""}
                        >
                          <SelectItem value="standard">
                            Standard Cleaning
                          </SelectItem>
                          <SelectItem value="deep">Deep Cleaning</SelectItem>
                          <SelectItem value="move-in-out">
                            Move In/Out Cleaning
                          </SelectItem>
                          <SelectItem value="custom">
                            Custom Cleaning
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={darkMode ? "bg-gray-700 text-white" : ""}
                          >
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          className={darkMode ? "bg-gray-700 text-white" : ""}
                        >
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="outsideCleaningServices"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Outside Cleaning Services
                      </FormLabel>
                      <FormDescription
                        className={darkMode ? "text-gray-400" : ""}
                      >
                        Select any additional outside cleaning services you
                        need.
                      </FormDescription>
                    </div>
                    {outsideCleaningOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="outsideCleaningServices"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value!,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel
                                className={cn(
                                  "font-normal",
                                  darkMode ? "text-white" : ""
                                )}
                              >
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                                darkMode ? "bg-gray-700 text-white" : ""
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className={cn(
                            "w-auto p-0",
                            darkMode ? "bg-gray-700" : ""
                          )}
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={darkMode ? "bg-gray-700 text-white" : ""}
                          >
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          className={darkMode ? "bg-gray-700 text-white" : ""}
                        >
                          <SelectItem value="morning">
                            Morning (8AM - 12PM)
                          </SelectItem>
                          <SelectItem value="afternoon">
                            Afternoon (12PM - 4PM)
                          </SelectItem>
                          <SelectItem value="evening">
                            Evening (4PM - 8PM)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special instructions or requests?"
                        className={cn(
                          "resize-none",
                          darkMode ? "bg-gray-700 text-white" : ""
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription
                      className={darkMode ? "text-gray-400" : ""}
                    >
                      Please provide any additional information that may be
                      helpful for our cleaning team.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={cn(
                  "w-full",
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Book Cleaning Service"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
