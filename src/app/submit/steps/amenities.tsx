"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const amenities = [
  "Air Conditioning",
  "Balcony",
  "Dishwasher",
  "Elevator",
  "Fitness Center",
  "Furnished",
  "Garage",
  "Garden",
  "Hardwood Floors",
  "In-unit Laundry",
  "Internet",
  "Parking",
  "Pet-friendly",
  "Pool",
  "Security System",
  "Storage",
  "Walk-in Closet",
  "Washer/Dryer",
  "Wheelchair Accessible",
  "Wi-Fi",
];

const formSchema = z.object({
  amenities: z.array(z.string()).min(1, {
    message: "Please select at least one amenity.",
  }),
});

export function Amenities({
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
      amenities: [],
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
          name="amenities"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Amenities</FormLabel>
                <FormDescription>
                  Select all the amenities that apply to your apartment. These
                  features can make your listing more attractive to potential
                  tenants.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenities.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 dark:border-gray-700"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-gray-700 dark:text-gray-300">
                            {item}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
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
