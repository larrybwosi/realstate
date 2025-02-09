"use client";

import { useState } from "react";
import {
  Plus,
  Users,
  Search,
  Ban,
  LogOut,
  Home,
  UserPlus,
  Shield,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FamilyMemberForm } from "@/components/admin/family-modal";
import { UserCreateForm } from "@/components/admin/crete.user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { admin } from "@/lib/authClient";


type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  apartment: string;
  banned: boolean;
  banReason?: string;
  familyMembers: Array<{ id: string; name: string; image: string }>;
  createdAt: string;
};

const AdminUserDashboard = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showFamilyDialog, setShowFamilyDialog] = useState(false);
  const [showFamilyListDialog, setShowFamilyListDialog] = useState(false);
  const [showBanConfirmDialog, setShowBanConfirmDialog] = useState(false);
  const [showLogoutConfirmDialog, setShowLogoutConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock data for demonstration
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "tenant",
      apartment: "A101",
      banned: false,
      familyMembers: [
        { id: "f1", name: "Jane Doe", image: "/placeholder.svg" },
        { id: "f2", name: "Jimmy Doe", image: "/placeholder.svg" },
      ],
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "owner",
      apartment: "B202",
      banned: true,
      banReason: "Payment default",
      familyMembers: [
        { id: "f3", name: "John Smith", image: "/placeholder.svg" },
        { id: "f4", name: "Jenny Smith", image: "/placeholder.svg" },
        { id: "f5", name: "Jack Smith", image: "/placeholder.svg" },
      ],
      createdAt: "2024-02-01",
    },
  ];

  const banUser = async (user: User) => {
    const action = user.banned ? "unban" : "ban";
    try {
      if (action==='ban'){
         await admin.banUser({
           userId: user.id,
         });
      } else{
        await admin.unbanUser({
          userId: user.id,
        });
      }
      toast.success(`User ${action}ned successfully`, {
        description: `${user.name} has been ${action}ned`,
      });
    } catch (error) {
      console.log(error);
      toast.error(`Error ${action}ning user`, {
        description: "Please try again later",
      });
    }
  };

  const logoutUser = async (user: User) => {
    try {
      await admin.revokeUserSessions({
        userId: user.id,
      });
      toast.success("Logout successful", {
        description: `${user.name} has been logged out`,
      });
    } catch (error) {
      console.log(error)
      toast.error("Logout failed", {
        description: "Could not complete logout operation",
      });
    }
  };

  const removeFamilyMember = async (userId: string, familyMemberId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Family member removed", {
        description: "The family member has been removed successfully",
      });
      // Update the UI (in a real app, you'd fetch the updated data from the server)
      setSelectedUser((prevUser) => {
        if (prevUser && prevUser.id === userId) {
          return {
            ...prevUser,
            familyMembers: prevUser.familyMembers.filter(
              (member) => member.id !== familyMemberId
            ),
          };
        }
        return prevUser;
      });
    } catch (error) {
      console.log(error)
      toast.error("Failed to remove family member", {
        description: "Please try again later",
      });
    }
  };

  const UserActions = ({ user }: { user: User }) => (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSelectedUser(user);
          setShowFamilyDialog(true);
        }}
      >
        <UserPlus className="w-4 h-4 mr-1" />
        Add Family
      </Button>
      <Button
        variant={user.banned ? "destructive" : "outline"}
        size="sm"
        onClick={() => {
          setSelectedUser(user);
          setShowBanConfirmDialog(true);
        }}
      >
        <Ban className="w-4 h-4 mr-1" />
        {user.banned ? "Unban" : "Ban"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSelectedUser(user);
          setShowLogoutConfirmDialog(true);
        }}
      >
        <LogOut className="w-4 h-4 mr-1" />
        Logout
      </Button>
    </div>
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Administration</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system. Fill in all required information
                below.
              </DialogDescription>
            </DialogHeader>
            <UserCreateForm onClose={() => setShowCreateDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tenants
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "tenant" && !u.banned).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Property Owners
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "owner").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            View and manage all users in the system
          </CardDescription>
          <div className="flex justify-between items-center mt-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="tenant">Tenants</SelectItem>
                <SelectItem value="owner">Owners</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Apartment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Family</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin"
                          ? "destructive"
                          : user.role === "owner"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.apartment}</TableCell>
                  <TableCell>
                    {user.banned ? (
                      <Badge variant="destructive">Banned</Badge>
                    ) : (
                      <Badge variant="default">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowFamilyListDialog(true);
                      }}
                    >
                      {user.familyMembers.length} members
                    </Button>
                  </TableCell>
                  <TableCell>
                    <UserActions user={user} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showFamilyDialog} onOpenChange={setShowFamilyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>
              Add a family member for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <FamilyMemberForm familyHeadId={selectedUser?.id || ''} onClose={() => setShowFamilyDialog(false)} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={showFamilyListDialog}
        onOpenChange={setShowFamilyListDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Family Members</DialogTitle>
            <DialogDescription>
              Family members of {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedUser?.familyMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.image} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFamilyMember(selectedUser.id, member.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showBanConfirmDialog}
        onOpenChange={setShowBanConfirmDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.banned ? "Unban" : "Ban"} User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedUser?.banned ? "unban" : "ban"}{" "}
              {selectedUser?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowBanConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedUser) {
                  banUser(selectedUser);
                  setShowBanConfirmDialog(false);
                }
              }}
            >
              {selectedUser?.banned ? "Unban" : "Ban"} User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showLogoutConfirmDialog}
        onOpenChange={setShowLogoutConfirmDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout User</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out {selectedUser?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedUser) {
                  logoutUser(selectedUser);
                  setShowLogoutConfirmDialog(false);
                }
              }}
            >
              Logout User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUserDashboard;
