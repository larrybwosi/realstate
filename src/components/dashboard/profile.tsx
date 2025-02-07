import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  MapPin,
  CreditCard,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationsCenter from "./notifications";

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Apt 4B",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
    },
  });

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            className="absolute bottom-0 right-0 rounded-full h-8 w-8"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profileData.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Resident since June 2022
          </p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      className="pl-10"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      className="pl-10"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Contact Name"
                    value={profileData.emergencyContact.name}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact: {
                          ...profileData.emergencyContact,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                  <Input
                    placeholder="Relationship"
                    value={profileData.emergencyContact.relationship}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact: {
                          ...profileData.emergencyContact,
                          relationship: e.target.value,
                        },
                      })
                    }
                  />
                  <Input
                    placeholder="Phone Number"
                    value={profileData.emergencyContact.phone}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact: {
                          ...profileData.emergencyContact,
                          phone: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">Payment Methods</h4>
                      <p className="text-sm text-gray-500">
                        Manage your payment information
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-4 mt-6">
          <NotificationsCenter/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
