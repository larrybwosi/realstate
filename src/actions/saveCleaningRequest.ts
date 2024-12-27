import { client } from "@/sanity/lib/client";


export async function saveCleaningRequest(data: any) {
  try {
    const result = await client.fetch({
      _type: "cleaningRequest",
      ...data,
    });
    return { success: true, id: result._id };
  } catch (error) {
    console.error("Error saving cleaning request:", error);
    return { success: false, error: "Failed to save cleaning request" };
  }
}
