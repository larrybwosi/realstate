"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { differenceInDays, format } from "date-fns";
import { CalendarIcon, DollarSign, Home, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getApartment } from "@/actions/apartments";
import { Apartment } from "@/types";

const formSchema = z
  .object({
    startDate: z.date({
      required_error: "A start date is required.",
    }),
    endDate: z.date({
      required_error: "An end date is required.",
    }),
    depositAmount: z.number().min(100, "Deposit must be at least $100."),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  });

export default function BookingPage() {
  const router = useRouter();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    const fetchApartment = async () => {
      const data = await getApartment(slug as string);
      setApartment(data);
      setIsLoading(false);
    };
    fetchApartment();
  }, [slug]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      depositAmount: 100,
    },
  });

  const { watch } = form;
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !apartment) return 0;
    const days = differenceInDays(endDate, startDate);
    return days * apartment.rental?.price;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/book-apartment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apartmentId: apartment?._id,
          ...values,
          totalPrice: calculateTotalPrice(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Booking successful",
          description: "Your apartment has been booked successfully.",
        });
        router.push("/bookings");
      } else {
        throw new Error("Failed to book apartment");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to book apartment. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (!apartment)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Home className="w-16 h-16 mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Apartment not found</h1>
        <p className="text-muted-foreground mt-2">
          The apartment you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button className="mt-4" onClick={() => router.push("/apartments")}>
          View All Apartments
        </Button>
      </div>
    );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Book {apartment.title}
      </h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Apartment Details
            </CardTitle>
            <CardDescription>
              Review the details of your selected apartment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
              <Image
                src={urlFor(apartment.mainImage)
                  .width(450)
                  .format("webp")
                  .url()}
                alt={apartment.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-500" />
              {apartment.rental?.price}/month
            </h2>
            <p className="text-muted-foreground mt-2">
              {apartment.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Booking Details
            </CardTitle>
            <CardDescription>
              Fill in the details to book your stay
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                            disabled={(date) =>
                              date < new Date() ||
                              date > new Date(apartment.rental?.availableDate)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select your check-in date
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                            disabled={(date) => date <= startDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select your check-out date
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="depositAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deposit Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>Minimum deposit is $100</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-xl font-semibold">
                  Total Price: ${calculateTotalPrice()}
                </div>
                <Button type="submit" className="w-full">
                  Book Now
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
