"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInMonths, format, addMonths } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { BookingSchema } from "@/lib/schemas/booking";
import { cn } from "@/lib/utils";
import { Apartment } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleBooking } from "@/actions/booking";

export default function BookingForm({ apartment }: { apartment: Apartment }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "failed" | "requires_confirmation"
  >();

  useEffect(() => {
    if (checkoutId) {
      const interval = setInterval(async () => {
        const response = await fetch(
          `/api/payment/status?checkoutId=${checkoutId}`
        );
        const { status } = await response.json();

        if (status === "CONFIRMED") {
          setPaymentStatus("success");
          clearInterval(interval);
          setIsLoading(false);
          router.push("/bookings");
        } else if (status === "FAILED") {
          setPaymentStatus("failed");
          clearInterval(interval);
          setIsLoading(false);
        } else if (status === "REQUIRES_CONFIRMATION") {
          setPaymentStatus("requires_confirmation");
          setRequiresConfirmation(true);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [checkoutId, router]);

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      paymentType: "rent",
      isRecurring: false,
    },
  });

  const { watch } = form;
  const paymentType = watch("paymentType");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const isRecurring = watch("isRecurring");

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !apartment) return 0;

    if (paymentType === "deposit") {
      return apartment.rental.deposit || 0;
    }

    const months = differenceInMonths(endDate, startDate);
    return Math.max(1, months) * apartment.rental?.price;
  };

  async function onSubmit(values: z.infer<typeof BookingSchema>) {
    setIsLoading(true);
    console.log(values)
    try {
      const response = await handleBooking(values)

      console.log(response)

      if (response.success) {
          setCheckoutId(response.checkoutId);
          setRequiresConfirmation(true);
        } else {
          // router.push("/bookings");
        }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Payment failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Payment Details
        </CardTitle>
        <CardDescription>
          Complete your booking and payment details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rent">Monthly Rent</SelectItem>
                      <SelectItem value="deposit">Security Deposit</SelectItem>
                      <SelectItem value="fee">Other Fees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {paymentType === "rent" && (
              <FormField
                control={form.control}
                name="isRecurring"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4"
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">
                      Set up recurring monthly payments
                    </FormLabel>
                  </FormItem>
                )}
              />
            )}

            {paymentType !== "deposit" && (
              <>
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {paymentType === "rent"
                          ? "Start Date"
                          : "Effective Date"}
                      </FormLabel>
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
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!isRecurring && (
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>M-Pesa Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="2547XXXXXXXX" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your M-Pesa registered number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {requiresConfirmation && (
              <FormField
                control={form.control}
                name="confirmationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 6-digit M-Pesa code"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Check your phone for the M-Pesa confirmation code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="text-xl font-semibold">
              Total Amount: KSh {calculateTotalPrice()}
            </div>

            <button
              type="submit"
              className="w-full"
              disabled={isLoading || paymentStatus === "success"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {requiresConfirmation
                    ? "Confirming Payment..."
                    : "Processing Payment..."}
                </>
              ) : requiresConfirmation ? (
                "Confirm Payment"
              ) : (
                "Initiate M-Pesa Payment"
              )}
            </button>

            {paymentStatus === "requires_confirmation" && (
              <div className="text-yellow-600">
                Check your phone to complete payment
              </div>
            )}
            {paymentStatus === "success" && (
              <div className="text-green-600">
                Payment confirmed! Redirecting...
              </div>
            )}
            {paymentStatus === "failed" && (
              <div className="text-red-600">
                Payment failed. Please try again.
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
