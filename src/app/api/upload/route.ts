import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg', 'file/pdf', 'image/heic'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, GIF, PDF and WebP are allowed." }, { status: 400 });
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds the maximum limit of 5MB." }, { status: 400 });
    }

    const imageUrl = await client.assets.upload("file", file, {
      filename: `cheapcity-image-${session?.user?.name}-${Date.now()}.${file.type.split('/')[1]}`,
    });
console.log(imageUrl)
    return NextResponse.json({ url: imageUrl.url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image:", error);

    if (error instanceof Error) {
      // Handle specific error types
      if (error.name === "SanityClientError") {
        return NextResponse.json({ error: "Error communicating with the image server" }, { status: 503 });
      }

      if (error.message.includes("Network request failed")) {
        return NextResponse.json({ error: "Network error. Please check your connection and try again." }, { status: 503 });
      }
    }

    // Generic error response
    return NextResponse.json({ error: "An unexpected error occurred while uploading the image" }, { status: 500 });
  }
}