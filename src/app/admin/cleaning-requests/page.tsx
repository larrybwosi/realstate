"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";


const assignSchema = z.object({
  personnel: z
    .array(z.string())
    .min(1, "Please select at least one cleaning personnel"),
});

export default function AdminCleaningRequests() {
  const [cleaningRequests, setCleaningRequests] = useState([]);
  const [cleaningPersonnel, setCleaningPersonnel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof assignSchema>>({
    resolver: zodResolver(assignSchema),
    defaultValues: {
      personnel: [],
    },
  });

  useEffect(() => {
    async function fetchData() {
      const requests = await client.fetch('*[_type == "cleaningRequest"]');
      const personnel = await client.fetch('*[_type == "cleaningPersonnel"]');
      setCleaningRequests(requests);
      setCleaningPersonnel(personnel);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  async function onAssign(
    requestId: string,
    values: z.infer<typeof assignSchema>
  ) {
    try {
      await client
        .patch(requestId)
        .set({
          status: "assigned",
          assignedTo: values.personnel.map((id) => ({
            _type: "reference",
            _ref: id,
          })),
        })
        .commit();

      const updatedRequests = await client.fetch(
        '*[_type == "cleaningRequest"]'
      );
      setCleaningRequests(updatedRequests);

      alert("Cleaning request assigned successfully!");
    } catch (error) {
      console.error("Error assigning cleaning request:", error);
      alert("Failed to assign cleaning request");
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Cleaning Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cleaningRequests.map((request: any) => (
                    <TableRow key={request._id}>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>
                        {new Date(request.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{request.time}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>
                        {request.status === "pending" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">Assign</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>
                                  Assign Cleaning Personnel
                                </DialogTitle>
                              </DialogHeader>
                              <Form {...form}>
                                <form
                                  onSubmit={form.handleSubmit((values) =>
                                    onAssign(request._id, values)
                                  )}
                                >
                                  <FormField
                                    control={form.control}
                                    name="personnel"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Cleaning Personnel
                                        </FormLabel>
                                        <FormControl>
                                          <Select
                                            onValueChange={(value) =>
                                              field.onChange([value])
                                            }
                                            defaultValue={field.value[0]}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select cleaning personnel" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {cleaningPersonnel.map(
                                                (person: any) => (
                                                  <SelectItem
                                                    key={person._id}
                                                    value={person._id}
                                                  >
                                                    {person.name}
                                                  </SelectItem>
                                                )
                                              )}
                                            </SelectContent>
                                          </Select>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <Button type="submit" className="mt-4">
                                    Assign
                                  </Button>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
