import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Camera } from "lucide-react";
import { admin } from "@/lib/authClient";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["tenant", "owner", "admin"]),
  apartment: z.string().min(1, "Please select an apartment"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactRelationship: z.string().min(2, "Relationship is required"),
  emergencyContactPhone: z.string().min(10, "Valid phone number is required"),
  image: z.instanceof(File).nullable(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserCreateFormProps {
  onClose: () => void;
}

export function UserCreateForm({ onClose }: UserCreateFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "tenant",
      apartment: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      image: null,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      const {
        apartment,
        emergencyContactName,
        emergencyContactPhone,
        image,
        emergencyContactRelationship,
      } = data;

      let uploadedImage 

      if (image){
        //Upload image 
        const uploadImage =async()=>{
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
          return data.url
        }
        toast.promise(uploadImage(),{
          loading: "Uploading image...",
          success: () => {
            return `Image uploaded successfully`;
          },
          error: "Failed to upload image",
        })
      };

      await toast.promise(
        admin.createUser({
          ...data,
          data: {
            apartmentId: apartment,
            image: uploadedImage,
            emergencyContactName,
            emergencyContactPhone,
            emergencyContactRelationship,
          },
        }),
        {
          loading: "Adding user...",
          success: (res) => {
            return `${res?.data?.user?.name || "User"} created successfully`;
          },
          error: "Failed to create user",
        }
      );

    } catch (error) {
      toast.error("Failed to create user");
      console.error("Error creating user:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center">
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel className="cursor-pointer">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={imagePreview || ""} />
                      <AvatarFallback>
                        {imagePreview ? null : <Camera className="w-8 h-8" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs">Change Image</span>
                    </div>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apartment</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign apartment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="a101">A101</SelectItem>
                    <SelectItem value="b202">B202</SelectItem>
                    <SelectItem value="c303">C303</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormLabel>Emergency Contact</FormLabel>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Contact Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactRelationship"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Relationship" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create User</Button>
        </div>
      </form>
    </Form>
  );
}
