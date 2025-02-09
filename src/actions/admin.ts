import { db } from "@/lib/db";

interface AddFamilyMemberParams {
  familyHeadId: string;
  relationshipType: string;
  name?: string;
  dateOfBirth?: string;
  image?: string;
}

interface UpdateFamilyMemberParams {
  id: string;
  relationshipType?: string;
  name?: string;
  dateOfBirth?: string;
  userId?: string;
}

// Family Member Management Functions

export async function addFamilyMember(params: AddFamilyMemberParams) {
  const { familyHeadId, relationshipType, name, dateOfBirth, image } = params;

  // Verify that the family head exists
  const familyHead = await db.user.findUnique({
    where: { id: familyHeadId },
  });

  if (!familyHead) {
    throw new Error("Family head not found");
  }

  return await db.familyMember.create({
    data: {
      familyHeadId,
      relationshipType,
      name,
      dateOfBirth,
      image,
    },
  });
}

export async function removeFamilyMember(id: string) {
  // Verify that the family member exists
  const member = await db.familyMember.findUnique({
    where: { id },
  });

  if (!member) {
    throw new Error("Family member not found");
  }

  return db.familyMember.delete({
    where: { id },
  });
}

export async function updateFamilyMember(params: UpdateFamilyMemberParams) {
  const { id, relationshipType, name, dateOfBirth, userId } = params;

  // Verify that the family member exists
  const member = await db.familyMember.findUnique({
    where: { id },
  });

  if (!member) {
    throw new Error("Family member not found");
  }

  // If changing userId, verify that the new user isn't already a family member
  if (userId && userId !== member.userId) {
    const existingMember = await db.familyMember.findUnique({
      where: { userId },
    });

    if (existingMember) {
      throw new Error("User is already a family member");
    }
  }

  return db.familyMember.update({
    where: { id },
    data: {
      relationshipType,
      name,
      dateOfBirth,
      userId,
    },
  });
}

// Staff Management Functions
interface StaffMemberParams {
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
}

export async function addStaffMember(params: StaffMemberParams) {
  const { name, email, phoneNumber, role } = params;

  // Verify email is unique
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  return db.user.create({
    data: {
      name,
      email,
      phoneNumber,
      role,
      emailVerified: false, // Should be verified through proper channels
    },
  });
}

export async function removeStaffMember(id: string) {
  // Verify that the user exists and is a staff member
  const user = await db.user.findUnique({
    where: { id },
  });

  if (
    !user ||
    !user.role ||
    !["admin", "staff", "manager"].includes(user.role)
  ) {
    throw new Error("Staff member not found");
  }

  // Instead of deleting, you might want to deactivate the account
  return db.user.update({
    where: { id },
    data: {
      banned: true,
      banReason: "Staff member removed",
      banExpires: null, // Permanent ban
    },
  });
}

export async function updateStaffMember(
  id: string,
  params: Partial<StaffMemberParams>
) {
  const { name, email, phoneNumber, role } = params;

  // Verify that the user exists and is a staff member
  const user = await db.user.findUnique({
    where: { id },
  });

  if (
    !user ||
    !user.role ||
    !["admin", "staff", "manager"].includes(user.role)
  ) {
    throw new Error("Staff member not found");
  }

  // If changing email, verify it's unique
  if (email && email !== user.email) {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }
  }

  return db.user.update({
    where: { id },
    data: {
      name,
      email,
      phoneNumber,
      role,
    },
  });
}

// Utility function to get all family members for a family head
export async function getFamilyMembers(familyHeadId: string) {
  return db.familyMember.findMany({
    where: { familyHeadId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
    },
  });
}

// Utility function to get all staff members
export async function getAllStaffMembers() {
  return db.user.findMany({
    where: {
      role: {
        in: ["admin", "staff", "manager"],
      },
      banned: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: true,
    },
  });
}
