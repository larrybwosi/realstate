// actions/booking.ts
"use server";

import { db } from "@/lib/db";
import { BookingSchema } from "@/lib/schemas/booking";
import { getMpesaToken } from "@/actions/mpesa";
import { PaymentType } from "@prisma/client";
import { z } from "zod";
interface MpesaStkResponse {
  CheckoutRequestID: string;
  MerchantRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  errorCode?: string;
  errorMessage?: string;
}

const paymentDescriptions: Record<PaymentType, string> = {
  rent: "Monthly Rent Payment",
  deposit: "Security Deposit Payment",
  fee: "Additional Fees Payment",
};

export async function initiateMpesaPayment({
  paymentType,
  amount,
  phone
}: {
    phone: string;
    amount: number;
    paymentType: PaymentType;
}): Promise<MpesaStkResponse> {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, -5);

  if (!process.env.MPESA_SHORTCODE || !process.env.MPESA_PASSKEY) {
    throw new Error("M-Pesa configuration missing");
  }

  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const response = await fetch(
    `${process.env.MPESA_API_URL}/stkpush/v1/processrequest`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getMpesaToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: `${process.env.NEXTAUTH_URL}/api/mpesa-callback`,
        AccountReference: `APARTMENT-${paymentType.toUpperCase()}`,
        TransactionDesc: paymentDescriptions[paymentType],
      }),
    }
  );

  const responseData: MpesaStkResponse = await response.json();

  if (!response.ok || responseData.errorCode) {
    throw new Error(
      responseData.errorMessage || `MPesa API error: ${response.statusText}`
    );
  }

  return responseData;
}
export async function handleBooking(formData: z.infer<typeof BookingSchema>) {
  // Validate form data
  console.log(formData)
  const result = BookingSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.errors.map((e) => e.message).join(", "),
      details: result.error.flatten(),
    };
  }

  console.log({
    phone: result.data.phoneNumber,
    amount: Number(result.data.totalAmount),
    paymentType: result.data.paymentType,
  });
  try {
    // Initiate M-Pesa payment
    const mpesaResponse = await initiateMpesaPayment({
      phone: result.data.phoneNumber,
      amount: Number(result.data.totalAmount),
      paymentType: result.data.paymentType,
    });

    if (mpesaResponse.errorCode) {
      throw new Error(
        mpesaResponse.errorMessage || "Payment initiation failed"
      );
    }

    // Create booking and payment records
    const booking = await db.booking.create({
      data: {
        apartmentId: parseInt(result.data.apartmentId),
        startDate: new Date(result.data.startDate),
        endDate: new Date(result.data.endDate),
        paymentType: result.data.paymentType,
        isRecurring: result.data.isRecurring,
        totalAmount: Number(result.data.totalAmount),
        phoneNumber: result.data.phoneNumber,
        checkoutId: mpesaResponse.CheckoutRequestID,
        status: "PENDING",
        payments: {
          create: {
            amount: Number(result.data.totalAmount),
            currency: "KES",
            type: result.data.paymentType,
            method: "mpesa",
            status: "PENDING",
            checkoutId: mpesaResponse.CheckoutRequestID,
            phoneNumber: result.data.phoneNumber,
          },
        },
      },
      include: { payments: true },
    });

    return {
      success: true,
      checkoutId: mpesaResponse.CheckoutRequestID,
      bookingId: booking.id,
      paymentId: booking.payments[0].id,
    };
  } catch (error) {
    console.error("Booking error:", error);
    return {
      error: error instanceof Error ? error.message : "Booking failed",
      details: error,
    };
  }
}
