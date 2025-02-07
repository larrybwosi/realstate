import { Bell, Clock, Info, AlertTriangle, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

const NotificationsCenter = () => {
  const notifications = [
    {
      id: 1,
      type: "maintenance",
      title: "Maintenance Request Updated",
      message: "Your maintenance request #1234 has been completed",
      timestamp: "2 hours ago",
      status: "success",
      read: false,
    },
    {
      id: 2,
      type: "payment",
      title: "Upcoming Rent Payment",
      message: "Your rent payment of $1,500 is due in 5 days",
      timestamp: "1 day ago",
      status: "warning",
      read: true,
    },
    {
      id: 3,
      type: "announcement",
      title: "Community Update",
      message: "Pool maintenance scheduled for next weekend",
      timestamp: "2 days ago",
      status: "info",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string, status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences and updates
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {notifications.filter((n) => !n.read).length} unread
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {/* Notification Settings */}
            <Card className="border-2 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Maintenance Updates</h4>
                    <p className="text-sm text-gray-500">
                      Get notified about your maintenance requests
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Payment Reminders</h4>
                    <p className="text-sm text-gray-500">
                      Receive payment due date reminders
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">Community Updates</h4>
                    <p className="text-sm text-gray-500">
                      Stay informed about community events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] px-2">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                          notification.read
                            ? "bg-gray-50 dark:bg-gray-800"
                            : "bg-blue-50 dark:bg-blue-900/20"
                        }`}
                      >
                        {getNotificationIcon(
                          notification.type,
                          notification.status
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                {notification.timestamp}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsCenter;
