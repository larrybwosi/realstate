"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  Info,
} from "lucide-react";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface AdditionalService {
  id: number;
  name: string;
  price: string;
}

interface Service {
  id: string | number;
  name: string;
  price: string;
  description: string;
  duration: string;
  icon?: React.ReactNode;
}

interface ServiceBookingModalProps {
  service: Service | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onBookService: (bookingDetails: any) => void;
}

const additionalServiceOptions: AdditionalService[] = [
  { id: 1, name: "Extra Detergent", price: "5" },
  { id: 2, name: "Fabric Softener", price: "3" },
  { id: 3, name: "Express Cleaning", price: "20" },
  { id: 4, name: "Deep Sanitization", price: "25" },
];

const ServiceBookingModal = ({
  service,
  isOpen,
  onOpenChange,
  onBookService,
}: ServiceBookingModalProps) => {
  const [bookingDetails, setBookingDetails] = useState({
    date: undefined as Date | undefined,
    time: "",
    specialInstructions: "",
  });

  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<
    number[]
  >([]);

  const calculateTotalPrice = () => {
    const basePrice = parseFloat(service?.price || "0");
    const additionalServicesCost = selectedAdditionalServices.reduce(
      (total, serviceId) => {
        const additionalService = additionalServiceOptions.find(
          (opt) => opt.id === serviceId
        );
        return total + parseFloat(additionalService?.price || "0");
      },
      0
    );
    return basePrice + additionalServicesCost;
  };

  const handleAdditionalServiceToggle = (serviceId: number) => {
    setSelectedAdditionalServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBooking = () => {
    const bookingPayload = {
      ...bookingDetails,
      serviceId: service?.id,
      additionalServiceIds: selectedAdditionalServices,
      totalPrice: calculateTotalPrice(),
    };

    onBookService(bookingPayload);
    onOpenChange(false);
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {service.icon}
            <span className="ml-2">{service.name} Booking</span>
          </DialogTitle>
          <DialogDescription>
            Book your {service.name} service with customizable options
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">{service.description}</span>
              </div>
              <Badge variant="secondary">
                <DollarSign className="w-4 h-4 mr-1" />
                {service.price}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              <Clock className="inline-block w-4 h-4 mr-2" />
              Estimated Duration: {service.duration}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="booking-date" className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" /> Select Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !bookingDetails.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingDetails.date ? (
                      format(bookingDetails.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingDetails.date}
                    initialFocus
                    onSelect={(date) =>
                      setBookingDetails((prev) => ({
                        ...prev,
                        date,
                      }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="booking-time" className="flex items-center">
                <Clock className="w-4 h-4 mr-2" /> Select Time
              </Label>
              <Input
                id="booking-time"
                type="time"
                value={bookingDetails.time}
                onChange={(e) =>
                  setBookingDetails((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Additional Services</Label>
            <div className="grid md:grid-cols-2 gap-2">
              {additionalServiceOptions.map((addService) => (
                <div
                  key={addService.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                    selectedAdditionalServices.includes(addService.id)
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "bg-gray-100 dark:bg-gray-800",
                    "hover:bg-blue-50 dark:hover:bg-blue-800"
                  )}
                  onClick={() => handleAdditionalServiceToggle(addService.id)}
                >
                  <span>{addService.name}</span>
                  <Badge variant="outline">+${addService.price}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="special-instructions">Special Instructions</Label>
            <Textarea
              id="special-instructions"
              placeholder="Any specific requirements or notes?"
              value={bookingDetails.specialInstructions}
              onChange={(e) =>
                setBookingDetails((prev) => ({
                  ...prev,
                  specialInstructions: e.target.value,
                }))
              }
            />
          </div>

          <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg flex justify-between items-center">
            <span className="font-semibold">Total Price</span>
            <Badge variant="default" className="text-lg">
              ${calculateTotalPrice()}
            </Badge>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleBooking}
            disabled={!bookingDetails.date || !bookingDetails.time}
          >
            Book Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceBookingModal;
