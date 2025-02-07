import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

export const MaintenanceRequestSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum([
    "plumbing",
    "electrical",
    "hvac",
    "appliance",
    "structural",
  ]),
  priority: z.enum(["low", "medium", "high"]),
  images: z.array(z.string()).optional(),
  scheduledDate: z.date().optional(),
});

export const MaintenanceUpdateSchema = z.object({
  message: z.string().min(1, "Update message is required"),
  maintenanceRequestId: z.number(),
});

export const NotificationSchema = z.object({
  type: z.enum(["maintenance", "payment", "announcement"]),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  status: z.enum(["success", "warning", "info"]),
});

export const NotificationPreferencesSchema = z.object({
  maintenanceUpdates: z.boolean(),
  paymentReminders: z.boolean(),
  communityUpdates: z.boolean(),
});

// Types derived from Zod schemas
export type CreateUserInput = z.infer<typeof UserSchema>;
export type CreateMaintenanceRequestInput = z.infer<
  typeof MaintenanceRequestSchema
>;
export type CreateMaintenanceUpdateInput = z.infer<
  typeof MaintenanceUpdateSchema
>;
export type CreateNotificationInput = z.infer<typeof NotificationSchema>;
export type UpdateNotificationPreferencesInput = z.infer<
  typeof NotificationPreferencesSchema
>;
