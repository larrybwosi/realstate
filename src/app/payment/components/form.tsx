"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Apartment } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { CheckCircle2, CreditCard, XCircle } from "lucide-react";
import { IconDeviceMobile } from "@tabler/icons-react";
import { useTheme } from "next-themes";

// Zod schemas
const cardSchema = z.object({
  number: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date"),
  cvc: z.string().regex(/^\d{3}$/, "Invalid CVC"),
});

const mpesaSchema = z.object({
  phone: z.string().regex(/^07\d{8}$/, "Invalid Kenyan phone number"),
  confirmationCode: z.string().min(6).max(6).optional(),
});

const paymentSchema = z.discriminatedUnion("method", [
  z.object({
    method: z.literal("card"),
    feeType: z.string(),
    ...cardSchema.shape,
  }),
  z.object({
    method: z.literal("mpesa"),
    feeType: z.string(),
    ...mpesaSchema.shape,
  }),
]);

type PaymentFormData = z.infer<typeof paymentSchema>;

interface ApartmentPaymentProps {
  apartment: Apartment;
}

export default function ApartmentPaymentPage({
  apartment,
}: ApartmentPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa">("card");
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [mpesaRequestId, setMpesaRequestId] = useState<string | null>(null);

  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: "card",
    },
  });

  const selectedFeeType = watch("method");
  const isRentPayment = watch("feeType") === "rent";

  const onSubmit = async (data: PaymentFormData) => {
    if (data.method === "mpesa") {
      setShowConfirmationModal(true);
      setPaymentStatus("idle");
      // Simulate M-Pesa request
      setMpesaRequestId(Math.random().toString(36).substr(2, 9));
      return;
    }
    // Handle card payment
    console.log("Card payment data:", data);
  };

  const handleMpesaConfirmation = async (data: {
    confirmationCode: string;
  }) => {
    setPaymentStatus("processing");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPaymentStatus("success");
      setTimeout(() => setShowConfirmationModal(false), 2000);
    } catch (error) {
      setPaymentStatus("error");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Confirmation Modal - Updated with dark: modifiers */}
        {showConfirmationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="rounded-xl p-6 max-w-md w-full bg-white dark:bg-gray-800 shadow-2xl">
              {paymentStatus === "success" ? (
                <div className="text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                  <h3
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    Payment Successful!
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Your booking for {apartment.title} is confirmed.
                  </p>
                </div>
              ) : paymentStatus === "error" ? (
                <div className="text-center space-y-4">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                  <h3
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    Payment Failed
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Please check your confirmation code and try again.
                  </p>
                  <button
                    onClick={() => setPaymentStatus("idle")}
                    className={`w-full py-2 rounded-lg font-medium ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(handleMpesaConfirmation)}
                  className="space-y-4"
                >
                  <h3
                    className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"} mb-4`}
                  >
                    Confirm M-Pesa Payment
                  </h3>
                  <div>
                    <label
                      className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
                    >
                      Transaction Reference
                    </label>
                    <input
                      {...register("confirmationCode")}
                      className={`w-full p-3 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "border-gray-300"
                      } ${errors.confirmationCode ? "border-red-500" : ""}`}
                      placeholder="Enter M-Pesa confirmation code"
                    />
                    {errors.confirmationCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmationCode.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={paymentStatus === "processing"}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                      darkMode
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {paymentStatus === "processing" ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      "Confirm Payment"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 rounded-2xl lg:rounded-3xl shadow-xl dark:shadow-gray-800/25 overflow-hidden bg-white dark:bg-gray-800">
          {/* Apartment Details Section */}
          <div className="p-5 sm:p-6 md:p-8 space-y-6">
            <div className="aspect-video relative rounded-xl overflow-hidden">
              <Image
                src={urlFor(apartment.mainImage).width(800).height(450).url()}
                alt={apartment.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-5">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {apartment.title}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailItem
                  label="Unit"
                  value={`${apartment?.unit?.wing || ""} ${apartment?.unit?.unitNumber || ""}`}
                />
                <DetailItem
                  label="Floor"
                  value={apartment?.unit?.floorNumber}
                />
                <DetailItem
                  label="Bedrooms"
                  value={apartment.specifications.bedrooms}
                />
                <DetailItem
                  label="Bathrooms"
                  value={apartment.specifications.bathrooms}
                />
                <DetailItem
                  label="Size"
                  value={`${apartment.specifications.squareFootage} sqft`}
                />
                <DetailItem
                  label="Availability"
                  value={new Date(
                    apartment.rental.availableDate
                  ).toLocaleDateString()}
                />
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-gray-700 border border-blue-100 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  Rental Details
                </h3>
                <div className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                  <p>Price: ${apartment.rental.price}/month</p>
                  <p>Deposit: ${apartment.rental.deposit}</p>
                  <p>
                    Available:{" "}
                    {new Date(
                      apartment.rental.availableDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {apartment.amenities && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {apartment.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-gray-600 text-blue-800 dark:text-gray-100"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <div className="p-5 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-850">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Payment Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium text-gray-700 dark:text-gray-400`}
                    >
                      Payment Type
                    </label>
                    <select
                      {...register("feeType")}
                      className={`w-full p-3 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="rent">Monthly Rent</option>
                      <option value="security">Security Deposit</option>
                      <option value="maintenance">Maintenance Fee</option>
                    </select>
                  </div>

                  {isRentPayment && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium text-gray-700 dark:text-gray-400`}
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          className={`w-full p-3 rounded-lg ${
                            darkMode
                              ? "bg-gray-700 text-white border-gray-600"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium text-gray-700 dark:text-gray-400`}
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          className={`w-full p-3 rounded-lg ${
                            darkMode
                              ? "bg-gray-700 text-white border-gray-600"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Method Tabs */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 flex items-center justify-center p-3 rounded-lg ${
                      paymentMethod === "card"
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <CreditCard className="mr-2" /> Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`flex-1 flex items-center justify-center p-3 rounded-lg ${
                      paymentMethod === "mpesa"
                        ? darkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-500 text-white"
                        : darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <IconDeviceMobile className="mr-2" /> M-Pesa
                  </button>
                </div>

                {/* Payment Fields */}
                {paymentMethod === "card" ? (
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium text-gray-700 dark:text-gray-400`}
                      >
                        Card Number
                      </label>
                      <input
                        {...register("number", { shouldUnregister: true })}
                        placeholder="4242 4242 4242 4242"
                        className={`w-full p-3 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : "border-gray-300"
                        } ${errors.number?.message ? "border-red-500" : ""}`}
                      />
                      {errors.number?.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.number.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-sm font-medium text-gray-700 dark:text-gray-400`}
                        >
                          Expiry Date
                        </label>
                        <input
                          {...register("expiry", { shouldUnregister: true })}
                          placeholder="MM/YY"
                          className={`w-full p-3 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300  ${errors.expiry?.message ? "border-red-500" : ""}`}
                        />
                        {errors.expiry?.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.expiry.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium text-gray-700 dark:text-gray-400`}
                        >
                          CVC
                        </label>
                        <input
                          {...register("cvc", { shouldUnregister: true })}
                          placeholder="123"
                          className={`w-full p-3 rounded-lg ${
                            darkMode
                              ? "bg-gray-700 text-white border-gray-600"
                              : "border-gray-300"
                          } ${errors.cvc?.message ? "border-red-500" : ""}`}
                        />
                        {errors.cvc?.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cvc.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium text-gray-700 dark:text-gray-400`}
                      >
                        Phone Number
                      </label>
                      <input
                        {...register("phone", { shouldUnregister: true })}
                        placeholder="07XX XXX XXX"
                        className={`w-full p-3 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : "border-gray-300"
                        } ${errors.phone?.message ? "border-red-500" : ""}`}
                      />
                      {errors.phone?.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {showConfirmationCode && (
                      <div>
                        <label
                          className={`block text-sm font-medium text-gray-700 dark:text-gray-400`}
                        >
                          Confirmation Code
                        </label>
                        <input
                          {...register("confirmationCode", {
                            shouldUnregister: true,
                          })}
                          className={`w-full p-3 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 border-gray-300"
                          } ${errors.confirmationCode?.message ? "border-red-500" : ""}`}
                        />
                        {errors.confirmationCode?.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.confirmationCode.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`w-full p-4 rounded-lg font-semibold transition-colors ${
                  paymentMethod === "card"
                    ? "dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white bg-blue-500 hover:bg-blue-600 text-white"
                    : "dark:bg-green-600 dark:hover:bg-green-700 dark:text-white bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {paymentMethod === "card"
                  ? `Pay $${apartment.rental.price}`
                  : showConfirmationCode
                    ? "Confirm Payment"
                    : "Initiate M-Pesa Payment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
      <dt className="text-sm text-gray-600 dark:text-gray-400">{label}</dt>
      <dd className="mt-1 font-medium text-slate-900 dark:text-white">
        {value}
      </dd>
    </div>
  );
}
