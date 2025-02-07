'use client';
import React, { useState } from "react";
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
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Ban, LogOut, Home, Users, Shield, X } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "resident",
      status: "active",
      apartment: "A101",
      familyMembers: [
        { name: "Jane Doe", relation: "spouse" },
        { name: "Jimmy Doe", relation: "child" },
      ],
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      role: "admin",
      status: "active",
      apartment: "B202",
      familyMembers: [],
    },
  ]);

  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "resident",
    apartment: "",
    familyMembers: [],
  });
  const [newFamilyMember, setNewFamilyMember] = useState({
    name: "",
    relation: "",
  });

  const addUser = () => {
    setUsers([
      ...users,
      { ...newUser, id: users.length + 1, status: "active" },
    ]);
    setShowNewUserDialog(false);
    setNewUser({
      name: "",
      email: "",
      role: "resident",
      apartment: "",
      familyMembers: [],
    });
  };

  const banUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "banned" ? "active" : "banned" }
          : user
      )
    );
  };

  const logoutUser = (userId) => {
    // Simulate logout functionality
    alert(`User ${userId} has been logged out`);
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage your users, their roles, and access
              </CardDescription>
            </div>
            <Dialog
              open={showNewUserDialog}
              onOpenChange={setShowNewUserDialog}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus size={16} />
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new user and their details to the system
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) =>
                        setNewUser({ ...newUser, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="resident">Resident</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment</Label>
                    <Input
                      id="apartment"
                      value={newUser.apartment}
                      onChange={(e) =>
                        setNewUser({ ...newUser, apartment: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Family Members</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Name"
                        value={newFamilyMember.name}
                        onChange={(e) =>
                          setNewFamilyMember({
                            ...newFamilyMember,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Relation"
                        value={newFamilyMember.relation}
                        onChange={(e) =>
                          setNewFamilyMember({
                            ...newFamilyMember,
                            relation: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (
                            newFamilyMember.name &&
                            newFamilyMember.relation
                          ) {
                            setNewUser({
                              ...newUser,
                              familyMembers: [
                                ...newUser.familyMembers,
                                newFamilyMember,
                              ],
                            });
                            setNewFamilyMember({ name: "", relation: "" });
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {newUser.familyMembers.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-secondary p-2 rounded"
                        >
                          <span>
                            {member.name} ({member.relation})
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setNewUser({
                                ...newUser,
                                familyMembers: newUser.familyMembers.filter(
                                  (_, i) => i !== index
                                ),
                              });
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={addUser} className="w-full">
                    Create User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
                <TableHead>Family Members</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin" ? "destructive" : "default"
                      }
                    >
                      <div className="flex items-center gap-1">
                        <Shield size={12} />
                        {user.role}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Home size={16} />
                      {user.apartment}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "success" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Users size={16} className="mr-1" />
                          {user.familyMembers.length}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Family Members</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                          {user.familyMembers.map((member, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-secondary rounded"
                            >
                              <span>{member.name}</span>
                              <Badge>{member.relation}</Badge>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => banUser(user.id)}
                      >
                        <Ban size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => logoutUser(user.id)}
                      >
                        <LogOut size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
