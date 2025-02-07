'use server';

import { revalidatePath } from "next/cache";
import {
  UserSchema,
  MaintenanceRequestSchema,
  MaintenanceUpdateSchema,
  NotificationSchema,
  NotificationPreferencesSchema,
  type CreateUserInput,
  type CreateMaintenanceRequestInput,
  type CreateNotificationInput,
  type UpdateNotificationPreferencesInput,
} from "@/lib/schemas/dashboard";
import { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Error handling
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// User Actions
export async function createUser(input: CreateUserInput) {
  try {
    const validatedData = UserSchema.parse(input);

    const user = await db.user.create({
      data: {
        ...validatedData,
        emailVerified: false, // Set default value
      },
    });

    revalidatePath("/profile");
    return { success: true, data: user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    throw error;
  }
}

export async function updateUser(id: string, input: Partial<CreateUserInput>) {
  try {
    const validatedData = UserSchema.partial().parse(input);

    const user = await db.user.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/dashboard");
    return { success: true, data: user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("User not found");
      }
    }
    throw error;
  }
}

// Maintenance Request Actions
export async function createMaintenanceRequest(
  input: CreateMaintenanceRequestInput
) {
  try {
    const validatedData = MaintenanceRequestSchema.parse(input);

    const session = await auth.api.getSession({
      headers: await headers()
    })

    if(!session?.user?.id) return

    const request = await db.maintenanceRequest.create({
      data: {
        ...validatedData,
        status: "pending",
        userId: session?.user.id,
        apartmentId: session.user.apartmentId|| ''
      },
    });

    // Create initial update
    await db.maintenanceUpdate.create({
      data: {
        message: "Request received",
        maintenanceRequestId: request.id,
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        type: "maintenance",
        title: "Maintenance Request Received",
        message: `Your request "${validatedData.title}" has been submitted`,
        status: "info",
        userId: session?.user.id,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: request };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    throw error;
  }
}

export async function updateMaintenanceRequest(
  id: number,
  status: string,
  assignedTo?: string,
  updateMessage?: string
) {
  try {
    const request = await db.maintenanceRequest.update({
      where: { id },
      data: {
        status,
        assignedTo,
      },
    });

    if (updateMessage) {
      const validatedUpdate = MaintenanceUpdateSchema.parse({
        message: updateMessage,
        maintenanceRequestId: id,
      });

      await db.maintenanceUpdate.create({
        data: validatedUpdate,
      });
    }

    revalidatePath("/maintenance");
    return { success: true, data: request };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("Maintenance request not found");
      }
    }
    throw error;
  }
}

export async function getMaintenanceRequests() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) return;

    const requests = await db.maintenanceRequest.findMany({
      where: { userId: session?.user?.id },
      include: {
        updates: true,
        apartment: {
          select: {
            title: true,
            apartmentNumber: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: requests };
  } catch (error) {
    throw error;
  }
}

// Notification Actions
export async function createNotification(input: CreateNotificationInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) return;

    const validatedData = NotificationSchema.parse(input);

    const notification = await db.notification.create({
      data: {
        ...validatedData,
        userId: session?.user.id,
      },
    });

    revalidatePath("/notifications");
    return { success: true, data: notification };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    throw error;
  }
}

export async function markNotificationAsRead(id: number) {
  try {
    const notification = await db.notification.update({
      where: { id },
      data: { read: true },
    });

    revalidatePath("/notifications");
    return { success: true, data: notification };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("Notification not found");
      }
    }
    throw error;
  }
}

export async function getUnreadNotifications(userId: string) {
  try {
    const notifications = await db.notification.findMany({
      where: {
        userId,
        read: false,
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: notifications };
  } catch (error) {
    throw error;
  }
}

// Notification Preferences Actions
export async function updateNotificationPreferences(
  input: UpdateNotificationPreferencesInput
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) return;

    const validatedData = NotificationPreferencesSchema.parse(input);

    const preferences = await db.notificationPreference.upsert({
      where: { userId: session?.user.id },
      update: {
        maintenanceUpdates: validatedData.maintenanceUpdates,
        paymentReminders: validatedData.paymentReminders,
        communityUpdates: validatedData.communityUpdates,
      },
      create: {
        ...validatedData,
        userId: session?.user.id,
      },
    });

    revalidatePath("/notifications");
    return { success: true, data: preferences };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    throw error;
  }
}
