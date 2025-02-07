import { useState } from "react";
import {
  Wrench,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  UploadCloud,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { createMaintenanceRequest } from "@/actions/dashboard";


  interface MaintenanceHistory {
    id: number;
    title: string;
    category: string;
    status: "completed" | "in-progress" | "pending";
    priority: string;
    date: string;
    description: string;
    assignedTo: string;
    completionDate?: string;
    updates: {
      date: string;
      message: string;
    }[];
  }
const MaintenanceDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [maintenanceRequest, setMaintenanceRequest] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    images: [],
  });


  const maintenanceHistory: MaintenanceHistory[] = [
    {
      id: 1,
      title: "Bathroom Faucet Repair",
      category: "Plumbing",
      status: "completed",
      priority: "high",
      date: "2024-02-05",
      description: "Fixed leaking bathroom faucet and replaced washer",
      assignedTo: "John Smith",
      completionDate: "2024-02-06",
      updates: [
        { date: "2024-02-05", message: "Request received" },
        { date: "2024-02-06", message: "Repair completed" },
      ],
    },
    {
      id: 2,
      title: "AC Unit Maintenance",
      category: "HVAC",
      status: "in-progress",
      priority: "medium",
      date: "2024-02-07",
      description: "Regular maintenance check for AC unit",
      assignedTo: "Mike Johnson",
      updates: [{ date: "2024-02-07", message: "Scheduled for inspection" }],
    },
  ];

  const getStatusColor = (status: 'completed' | 'in-progress' | 'pending') => {
    const colors = {
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "in-progress":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const onSubmit =async()=>{
    await createMaintenanceRequest({
      category: maintenanceRequest.category as
        | "plumbing"
        | "electrical"
        | "hvac"
        | "appliance"
        | "structural",
      description: maintenanceRequest.description,
      priority: maintenanceRequest.priority as "high" | "medium" | "low",
      title: maintenanceRequest.title,
    });
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Completed
                </p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  In Progress
                </p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  Pending
                </p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Request Button and Active Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Maintenance Requests</CardTitle>
            <CardDescription>
              View and manage your maintenance requests
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Wrench className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Submit Maintenance Request</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Issue Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the issue"
                      value={maintenanceRequest.title}
                      onChange={(e) =>
                        setMaintenanceRequest({
                          ...maintenanceRequest,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={maintenanceRequest.category}
                      onValueChange={(value) =>
                        setMaintenanceRequest({
                          ...maintenanceRequest,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="appliance">Appliance</SelectItem>
                        <SelectItem value="structural">Structural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={maintenanceRequest.priority}
                    onValueChange={(value) =>
                      setMaintenanceRequest({
                        ...maintenanceRequest,
                        priority: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Non-urgent</SelectItem>
                      <SelectItem value="medium">
                        Medium - Needs attention
                      </SelectItem>
                      <SelectItem value="high">High - Urgent issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide as much detail as possible"
                    className="h-32"
                    value={maintenanceRequest.description}
                    onChange={(e) =>
                      setMaintenanceRequest({
                        ...maintenanceRequest,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Upload Images</Label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600 px-6 py-10">
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {maintenanceHistory.map((request) => (
                <Card
                  key={request.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">
                            {request.title}
                          </h3>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {request.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {request.date}
                          </span>
                          <span>Assigned to: {request.assignedTo}</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Progress Updates
                          </p>
                          {request.updates.map((update, index) => (
                            <div
                              key={index}
                              className="flex items-center text-sm"
                            >
                              <div className="w-24 text-gray-500">
                                {update.date}
                              </div>
                              <div>{update.message}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceDashboard;
