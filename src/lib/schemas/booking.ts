import { formatMpesaPhoneNumber } from "@/utils/mpesa";
import { z } from "zod";
export const BookingSchema = z
  .object({
    apartmentId: z.string().min(1, "Apartment selection is required"),
    startDate: z
      .date({
        required_error: "A start date is required.",
      })
      .refine((date) => date >= new Date(), {
        message: "Start date cannot be in the past",
      }),
    endDate: z.date({
      required_error: "An end date is required.",
    }),
    paymentType: z.enum(["rent", "deposit", "fee"]),
    isRecurring: z.boolean().optional(),
    phoneNumber: z
      .string()
      .regex(/^2547\d{8}$/, "Invalid M-Pesa phone number format (2547XXXXXXXX)")
      .transform((num) => formatMpesaPhoneNumber(num)),
    totalAmount: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid currency format")
      .transform(Number)
      .refine((n) => n > 0, "Amount must be greater than 0"),
    confirmationCode: z
      .string()
      .regex(/^\d{6}$/, "Must be a 6-digit code")
      .optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      if (["rent", "deposit"].includes(data.paymentType)) {
        return !!data.totalAmount;
      }
      return true;
    },
    {
      message: "Total amount is required for this payment type",
      path: ["totalAmount"],
    }
  );


export type BookingFormValues = z.infer<typeof BookingSchema>;