"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { fetchAvailableJobs, fetchCleanerData, updateCleanerProfile } from "@/actions/cleaning";
import { useSession } from "@/lib/authClient";


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  specialties: z
    .array(z.string())
    .min(1, { message: "Select at least one specialty." }),
  availability: z
    .array(z.string())
    .min(1, { message: "Select at least one day of availability." }),
  preferredHours: z.string(),
  yearsOfExperience: z.number().min(0),
  certifications: z.array(z.string()),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }),
});

export default function CleanerDashboard() {
  const [cleaner, setCleaner] = useState(null);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {data: session} = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialties: [],
      availability: [],
      preferredHours: "",
      yearsOfExperience: 0,
      certifications: [],
      bio: "",
    },
  });

useEffect(() => {
  async function fetchData() {
    setIsLoading(true);
    const cleanerId = session?.user.id;
    const {
      success,
      data: cleanerData,
      error,
    } = await fetchCleanerData(cleanerId||"");
    if (success) {
      setCleaner(cleanerData);
      form.reset(cleanerData);
    } else {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch cleaner data. Please try again.",
        variant: "destructive",
      });
    }

    const {
      success: jobsSuccess,
      data: jobsData,
      error: jobsError,
    } = await fetchAvailableJobs();
    if (jobsSuccess) {
      setAvailableJobs(jobsData);
    } else {
      console.error(jobsError);
      toast({
        title: "Error",
        description: "Failed to fetch available jobs. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }
  fetchData();
}, []);

async function onSubmit(values: z.infer<typeof formSchema>) {
  if(!cleaner) return
  try {
    const { success, error } = await updateCleanerProfile(cleaner?._id, values);
    if (success) {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } else {
      throw new Error(error);
    }
  } catch (error) {
    console.log(error)
    toast({
      title: "Error",
      description: "Failed to update profile. Please try again.",
      variant: "destructive",
    });
  }
}


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if(!cleaner) {
    return (
      <div className="flex justify-center items-center h-screen">
        No cleaner found
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={cleaner.profilePicture} alt={cleaner.name} />
                <AvatarFallback>{cleaner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{cleaner.name}</CardTitle>
                <CardDescription>{cleaner.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {cleaner.specialties.map((specialty: string) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Experience: {cleaner.yearsOfExperience} years
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Completed Jobs: {cleaner.completedJobs}
            </p>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= cleaner.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {cleaner.rating.toFixed(1)} out of 5
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Edit Profile</TabsTrigger>
          <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialties"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Specialties
                          </FormLabel>
                          <FormDescription>
                            Select your cleaning specialties
                          </FormDescription>
                        </div>
                        {[
                          "standard",
                          "deep",
                          "move-in-out",
                          "post-construction",
                          "green",
                          "commercial",
                        ].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="specialties"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.charAt(0).toUpperCase() +
                                      item.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="availability"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Availability
                          </FormLabel>
                          <FormDescription>
                            Select your available days
                          </FormDescription>
                        </div>
                        {[
                          "monday",
                          "tuesday",
                          "wednesday",
                          "thursday",
                          "friday",
                          "saturday",
                          "sunday",
                        ].map((day) => (
                          <FormField
                            key={day}
                            control={form.control}
                            name="availability"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={day}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(day)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              day,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== day
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {day.charAt(0).toUpperCase() + day.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Hours</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preferred hours" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">
                              Morning (6AM - 12PM)
                            </SelectItem>
                            <SelectItem value="afternoon">
                              Afternoon (12PM - 6PM)
                            </SelectItem>
                            <SelectItem value="evening">
                              Evening (6PM - 12AM)
                            </SelectItem>
                            <SelectItem value="night">
                              Night (12AM - 6AM)
                            </SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Write a short bio about yourself (max 500 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Available Jobs</CardTitle>
              <CardDescription>
                Jobs that match your skills and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableJobs.length === 0 ? (
                <p>No jobs available at the moment. Check back later!</p>
              ) : (
                <div className="space-y-4">
                  {availableJobs.map((job) => (
                    <Card key={job._id}>
                      <CardHeader>
                        <CardTitle>{job.cleaningType} Cleaning</CardTitle>
                        <CardDescription>
                          {new Date(job.scheduledDate).toLocaleDateString()} at{" "}
                          {new Date(job.scheduledDate).toLocaleTimeString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <strong>Duration:</strong> {job.duration} hours
                        </p>
                        <p>
                          <strong>Pay Rate:</strong> ${job.payRate}/hour
                        </p>
                        <p>
                          <strong>Tasks:</strong> {job.tasks.join(", ")}
                        </p>
                        {job.specialRequirements && (
                          <p>
                            <strong>Special Requirements:</strong>{" "}
                            {job.specialRequirements.join(", ")}
                          </p>
                        )}
                        {job.equipmentNeeded && (
                          <p>
                            <strong>Equipment Needed:</strong>{" "}
                            {job.equipmentNeeded.join(", ")}
                          </p>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button onClick={() => applyForJob(job._id)}>
                          Apply for Job
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
