// app/api/mpesa-callback/route.ts
import { db } from "@/lib/db";
import { addMonths } from "date-fns";
import { NextResponse } from "next/server";
import { BookingStatus, PaymentStatus } from "@prisma/client";

interface MpesaCallbackMetadataItem {
  Name: string;
  Value: string | number;
}

interface MpesaCallback {
  Body: {
    stkCallback: {
      CheckoutRequestID: string;
      ResultCode: string;
      CallbackMetadata?: {
        Item: MpesaCallbackMetadataItem[];
      };
    };
  };
}

export async function POST(request: Request) {
  try {
    const data: MpesaCallback = await request.json();
    const callbackData = data.Body.stkCallback;
    const checkoutId = callbackData.CheckoutRequestID;
    const resultCode = callbackData.ResultCode;

    const booking = await db.booking.findUnique({
      where: { checkoutId },
      include: { payments: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (resultCode === "0") {
      const metadata = callbackData.CallbackMetadata?.Item || [];
      const getMetadataValue = (name: string) =>
        metadata.find((item) => item.Name === name)?.Value;

      const mpesaReceipt = getMetadataValue("MpesaReceiptNumber") as string;
      const amount = Number(getMetadataValue("Amount"));
      const phoneNumber = getMetadataValue("PhoneNumber") as string;

      if (!mpesaReceipt || isNaN(amount)) {
        throw new Error("Invalid callback metadata");
      }

      await db.$transaction([
        db.booking.update({
          where: { checkoutId },
          data: {
            status: BookingStatus.CONFIRMED,
            mpesaReceiptNumber: mpesaReceipt,
            ...(booking.isRecurring && {
              nextPaymentDate: addMonths(new Date(), 1),
            }),
          },
        }),
        db.payment.updateMany({
          where: { checkoutId },
          data: {
            status: PaymentStatus.CONFIRMED,
            mpesaReceipt,
            transactionId: mpesaReceipt,
            amount,
            phoneNumber: phoneNumber || booking.phoneNumber,
          },
        }),
      ]);
    } else {
      await db.$transaction([
        db.booking.update({
          where: { checkoutId },
          data: { status: BookingStatus.FAILED },
        }),
        db.payment.updateMany({
          where: { checkoutId },
          data: { status: PaymentStatus.FAILED },
        }),
      ]);
    }

    return NextResponse.json({ status: "Processed" });
  } catch (error) {
    console.error("Callback processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
