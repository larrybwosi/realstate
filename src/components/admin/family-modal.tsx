import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { addFamilyMember } from "@/actions/admin";
import { uploadImage } from "@/utils/image";

interface FamilyMemberFormProps {
  familyHeadId: string;
  onClose: () => void;
}

export function FamilyMemberForm({ familyHeadId, onClose }: FamilyMemberFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      relationship: "",
      dateOfBirth: "",
      image: null as File | null,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    const handleAddFamilyMember =async()=>{
      let uploadedImage;
      if (data?.image) {
        uploadedImage = await uploadImage(data.image);
      }
      await addFamilyMember({
        familyHeadId,
        relationshipType: data.relationship,
        dateOfBirth: data.dateOfBirth,
        name: data.name,
        image: uploadedImage
      })
    }
    
    toast.promise(handleAddFamilyMember(), {
      loading: "Adding family member...",
      success: () => {
        onClose();
        return `${data?.name || "Family member"} added successfully`;
      },
      error: `Failed to add ${data?.name || "family member"}`,
    });
  });

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
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-center">
          <FormField
            control={form.control}
            name="image"
            render={({  }) => (
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
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Family member name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Family Member</Button>
        </div>
      </form>
    </Form>
  );
}
