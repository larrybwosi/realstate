"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, SquareIcon, Bed, Bath } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  price: z.number().positive({
    message: "Price must be a positive number.",
  }),
  squareFootage: z.number().positive({
    message: "Square footage must be a positive number.",
  }),
  bedrooms: z.number().positive({
    message: "Number of bedrooms must be a positive number.",
  }),
  bathrooms: z.number().positive({
    message: "Number of bathrooms must be a positive number.",
  }),
  availableDate: z.date({
    required_error: "Available date is required.",
  }),
});

export function BasicInfo({
  onNext,
  onBack,
  initialData,
}: {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      price: 0,
      squareFootage: 0,
      bedrooms: 1,
      bathrooms: 1,
      availableDate: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a catchy title for your listing"
                  {...field}
                  className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </FormControl>
              <FormDescription>
                Create an attractive title that highlights the best features of
                your apartment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rent</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      className="pl-8 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Enter the monthly rent for your apartment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="squareFootage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Square Footage</FormLabel>
                <FormControl>
                  <div className="relative">
                    <SquareIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      className="pl-8 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Specify the total square footage of your apartment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      className="pl-8 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Enter the number of bedrooms in your apartment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="number"
                      className="pl-8 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Specify the number of bathrooms available.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="availableDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Available From</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                        !field.value && "text-muted-foreground"
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
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="rounded-md border dark:border-gray-700"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date from which the apartment will be available for
                move-in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="w-24"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="w-32 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
