import React from "react";
import {
  Calendar,
  DollarSign,
  Star,
  Mail,
  Phone,
  Home,
  Settings,
  Award,
  Clock,
  Briefcase,
  ThumbsUp,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const CleanerDashboard = () => {
  const userProfile = {
    name: "Sarah Johnson",
    email: "sarah.j@cleanpro.com",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    totalReviews: 156,
    completionRate: 98,
    memberSince: "2023",
    servicesOffered: ["Deep Cleaning", "Regular Cleaning", "Window Cleaning"],
    achievements: ["Top Rated", "Quick Responder", "Perfect Attendance"],
    location: "San Francisco Bay Area",
  };

  const stats = {
    jobsDone: 45,
    totalEarnings: 3150,
    hoursWorked: 140,
    averageJobTime: 3.1,
  };

  const currentJob = {
    address: "123 Main St",
    type: "Deep Cleaning",
    time: "10:00 AM - 12:00 PM",
    payment: 80,
  };

  const nextJob = {
    address: "456 Oak Ave",
    type: "Regular Cleaning",
    time: "Tomorrow, 2:00 PM - 4:00 PM",
    payment: 60,
  };

  const availableJobs = [
    {
      address: "789 Pine St",
      type: "Window Cleaning",
      time: "Feb 12, 1:00 PM - 3:00 PM",
      payment: 70,
    },
    {
      address: "321 Elm St",
      type: "Deep Cleaning",
      time: "Feb 13, 9:00 AM - 12:00 PM",
      payment: 100,
    },
  ];

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          CleanPro Dashboard
        </h1>

        {/* Profile Banner */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-10"></div>
          <Card className="border-0 shadow-lg backdrop-blur-sm bg-white/50 dark:bg-gray-800/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-2xl font-bold">
                    {userProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{userProfile.name}</h2>
                    <div className="flex items-center mt-1 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{userProfile.location}</span>
                    </div>
                    <div className="flex items-center mt-1 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        Member since {userProfile.memberSince}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact & Services */}
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userProfile.servicesOffered.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements & Rating */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Recognition</span>
                    </div>
                    <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-bold text-yellow-700 dark:text-yellow-400">
                        {userProfile.rating}
                      </span>
                      <span className="text-sm text-yellow-600 dark:text-yellow-500 ml-1">
                        ({userProfile.totalReviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200 rounded-full text-sm flex items-center gap-1"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Rate</span>
                      <span>{userProfile.completionRate}%</span>
                    </div>
                    <Progress
                      value={userProfile.completionRate}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Creative Stats Display */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {/* Jobs & Earnings Section */}
              <div className="col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Jobs Completed
                    </p>
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.jobsDone}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Earnings
                    </p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                      ${stats.totalEarnings}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded-full mb-2">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(stats.jobsDone / 50) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {50 - stats.jobsDone} jobs until next milestone
                </p>
              </div>

              {/* Time Stats Section */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hours Worked
                    </p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.hoursWorked}h
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avg. Time per Job
                    </p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.averageJobTime}h
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                    <Clock className="w-4 h-4" />
                    <span>Excellent time management</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Current Job */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase size={20} />
                Current Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <Home size={16} className="inline mr-2" />
                  {currentJob.address}
                </p>
                <p>
                  <Clock size={16} className="inline mr-2" />
                  {currentJob.time}
                </p>
                <p>
                  <DollarSign size={16} className="inline mr-2" />$
                  {currentJob.payment}
                </p>
                <p className="text-green-500">{currentJob.type}</p>
              </div>
            </CardContent>
          </Card>

          {/* Next Job */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Next Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <Home size={16} className="inline mr-2" />
                  {nextJob.address}
                </p>
                <p>
                  <Clock size={16} className="inline mr-2" />
                  {nextJob.time}
                </p>
                <p>
                  <DollarSign size={16} className="inline mr-2" />$
                  {nextJob.payment}
                </p>
                <p className="text-blue-500">{nextJob.type}</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Quick Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Available Times
                  </label>
                  <Select defaultValue="morning">
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">
                        Morning (8 AM - 12 PM)
                      </SelectItem>
                      <SelectItem value="afternoon">
                        Afternoon (12 PM - 4 PM)
                      </SelectItem>
                      <SelectItem value="evening">
                        Evening (4 PM - 8 PM)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  Update Availability
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Available Jobs */}
          <Card className="lg:col-span-3 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase size={20} />
                Available Jobs
              </CardTitle>
              <CardDescription>
                Jobs matching your preferences and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableJobs.map((job, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="font-medium">{job.address}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {job.time}
                        </p>
                        <p className="text-sm text-blue-500">{job.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${job.payment}</p>
                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                          Accept Job
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CleanerDashboard;
