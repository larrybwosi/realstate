'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const appointmentSchema = z.object({
  visitorName: z.string().min(2, "Name must be at least 2 characters"),
  appointmentTime: z
    .string()
    .refine(
      (val) => new Date(val) > new Date(),
      "Appointment time must be in the future"
    ),
  duration: z.enum(["30", "60", "90"]),
  type: z.enum(["GUEST", "MAINTENANCE", "DELIVERY", "TOUR"]),
  description: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  apartmentId: number;
  onSubmit: (
    data: AppointmentFormData & { apartmentId: number }
  ) => Promise<void>;
}

export default function AppointmentForm({
  apartmentId,
  onSubmit
}: AppointmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const handleFormSubmit = async (data: AppointmentFormData) => {
    await onSubmit({ ...data, apartmentId });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Schedule Appointment
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visitor Name
          </label>
          <input
            {...register("visitorName")}
            className={`w-full px-3 py-2 border rounded-md ${errors.visitorName ? "border-red-500" : "border-gray-300"}`}
            placeholder="John Doe"
          />
          {errors.visitorName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.visitorName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Time
          </label>
          <input
            type="datetime-local"
            {...register("appointmentTime")}
            className={`w-full px-3 py-2 border rounded-md ${errors.appointmentTime ? "border-red-500" : "border-gray-300"}`}
            min={new Date().toISOString().slice(0, 16)}
          />
          {errors.appointmentTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.appointmentTime.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <select
              {...register("duration")}
              className={`w-full px-3 py-2 border rounded-md ${errors.duration ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="90">90</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visit Type
            </label>
            <select
              {...register("type")}
              className={`w-full px-3 py-2 border rounded-md ${errors.type ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="GUEST">Guest</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="DELIVERY">Delivery</option>
              <option value="TOUR">Tour</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes (optional)
          </label>
          <textarea
            {...register("description")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Any special requirements or notes..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
        </button>
      </form>
    </div>
  );
}
