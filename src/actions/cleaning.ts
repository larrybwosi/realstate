"use server";

import { client } from "@/sanity/lib/client";


export async function fetchCleanerData(cleanerId: string) {
  try {
    const cleaner = await client.fetch(
      `*[_type == "cleaningPersonnel" && _id == $cleanerId][0]`,
      { cleanerId }
    );
    return { success: true, data: cleaner };
  } catch (error) {
    console.error("Error fetching cleaner data:", error);
    return { success: false, error: "Failed to fetch cleaner data" };
  }
}

export async function updateCleanerProfile(cleanerId: string, data: any) {
  try {
    const result = await client.patch(cleanerId).set(data).commit();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating cleaner profile:", error);
    return { success: false, error: "Failed to update cleaner profile" };
  }
}

export async function fetchAvailableJobs() {
  try {
    const jobs = await client.fetch(
      '*[_type == "cleaningJob" && status == "requested"]'
    );
    return { success: true, data: jobs };
  } catch (error) {
    console.error("Error fetching available jobs:", error);
    return { success: false, error: "Failed to fetch available jobs" };
  }
}

export async function applyForJob(jobId: string, cleanerId: string) {
  try {
    const result = await client
      .patch(jobId)
      .set({
        status: "assigned",
        assignedTo: { _ref: cleanerId, _type: "reference" },
      })
      .commit();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error applying for job:", error);
    return { success: false, error: "Failed to apply for job" };
  }
}
