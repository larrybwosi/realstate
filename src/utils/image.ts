import { toast } from "sonner";


export async function uploadImage (image:File){
  if (!image) return;
  let uploadedImage;
    //Upload image
    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include", // Crucial for session cookies
      });

      const data = await response.json();
      if (data?.url) uploadedImage = data.url;
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload");
      }
      return data.url;
    };
    toast.promise(uploadImage(),{
      loading: "Uploading image...",
      success: () => {
        return `Image uploaded successfully`;
      },
      error: "Failed to upload image",
    })
  return uploadedImage;
}