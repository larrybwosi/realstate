"use client"

import { useMemo, useState } from "react"
import { Plus, Users, Search, UserCog, UserX, Briefcase, ChevronUp, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { StaffCreateForm } from "@/components/admin/staff"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Staff = {
  id: string
  name: string
  email: string
  role: string
  department: string
  startDate: string
  image: string
}


const staffMembers: Staff[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "manager",
    department: "HR",
    startDate: "2022-01-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "cleaning_crew",
    department: "Facilities",
    startDate: "2023-03-20",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Peter Jones",
    email: "peter.jones@example.com",
    role: "maintenance",
    department: "Facilities",
    startDate: "2022-05-10",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Mary Brown",
    email: "mary.brown@example.com",
    role: "security",
    department: "Security",
    startDate: "2023-01-05",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "David Lee",
    email: "david.lee@example.com",
    role: "receptionist",
    department: "Reception",
    startDate: "2022-10-25",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "cleaning_crew",
    department: "Facilities",
    startDate: "2023-02-12",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Michael Davis",
    email: "michael.davis@example.com",
    role: "maintenance",
    department: "Facilities",
    startDate: "2022-08-01",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Linda Wilson",
    email: "linda.wilson@example.com",
    role: "security",
    department: "Security",
    startDate: "2023-04-18",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Christopher Garcia",
    email: "christopher.garcia@example.com",
    role: "receptionist",
    department: "Reception",
    startDate: "2022-11-10",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "Ashley Rodriguez",
    email: "ashley.rodriguez@example.com",
    role: "manager",
    department: "Sales",
    startDate: "2023-05-03",
    image: "/placeholder.svg?height=40&width=40",
  },
];

const AdminStaffManagement = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditRoleDialog, setShowEditRoleDialog] = useState(false)
  const [showTerminateDialog, setShowTerminateDialog] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Staff>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [roleFilter, setRoleFilter] = useState("all");

  const handleSort = (column: keyof Staff) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedStaff = useMemo(() => {
    return staffMembers
      .filter((staff) => {
        const matchesSearch =
          staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          staff.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole =
          roleFilter === "all" ||
          staff.role.toLowerCase() === roleFilter.toLowerCase();
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [staffMembers, searchQuery, roleFilter, sortColumn, sortDirection]);


  const editStaffRole = async (staff: Staff, newRole: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(`${staff.name}'s role updated to ${newRole}`)
      setShowEditRoleDialog(false)
    } catch (error) {
      toast.error("Failed to update staff role")
      console.error("Error updating staff role:", error)
    }
  }

  const terminateStaff = async (staff: Staff) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(`${staff.name} has been terminated`)
      setShowTerminateDialog(false)
    } catch (error) {
      toast.error("Failed to terminate staff member")
      console.error("Error terminating staff member:", error)
    }
  }

  const StaffActions = ({ staff }: { staff: Staff }) => (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSelectedStaff(staff)
          setShowEditRoleDialog(true)
        }}
      >
        <UserCog className="w-4 h-4 mr-1" />
        Edit Role
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          setSelectedStaff(staff)
          setShowTerminateDialog(true)
        }}
      >
        <UserX className="w-4 h-4 mr-1" />
        Terminate
      </Button>
    </div>
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff members, roles, and departments
          </p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Add a new staff member to the system. Fill in all required
                information below.
              </DialogDescription>
            </DialogHeader>
            <StaffCreateForm onClose={() => setShowCreateDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="cleaning_crew">Cleaning Crew</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
          <SelectItem value="security">Security</SelectItem>
          <SelectItem value="receptionist">Receptionist</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffMembers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                new Set(filteredAndSortedStaff.map((staff) => staff.department))
                  .size
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(filteredAndSortedStaff.map((staff) => staff.role)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <CardDescription>
            View and manage all staff members in the system
          </CardDescription>
          <div className="flex justify-between items-center mt-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="cleaning_crew">Cleaning Crew</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {["Name", "Email", "Role", "Department", "Start Date"].map(
                  (header) => (
                    <TableHead
                      key={header}
                      onClick={() =>
                        handleSort(
                          header.toLowerCase().replace(" ", "") as keyof Staff
                        )
                      }
                    >
                      <div className="flex items-center cursor-pointer">
                        {header}
                        {sortColumn === header.toLowerCase().replace(" ", "") &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                  )
                )}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={staff.image} alt={staff.name} />
                        <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{staff.role}</Badge>
                  </TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.startDate}</TableCell>
                  <TableCell>
                    <StaffActions staff={staff} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showEditRoleDialog} onOpenChange={setShowEditRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff Role</DialogTitle>
            <DialogDescription>
              Change the role for {selectedStaff?.name}
            </DialogDescription>
          </DialogHeader>
          <Select
            onValueChange={(value) => {
              if (selectedStaff) {
                editStaffRole(selectedStaff, value);
              }
            }}
            defaultValue={selectedStaff?.role}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select new role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cleaning_crew">Cleaning Crew</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="receptionist">Receptionist</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>

      <Dialog open={showTerminateDialog} onOpenChange={setShowTerminateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terminate Staff Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to terminate {selectedStaff?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTerminateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedStaff) {
                  terminateStaff(selectedStaff);
                }
              }}
            >
              Terminate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminStaffManagement
