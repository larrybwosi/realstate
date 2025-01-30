'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Mail, Phone, ChevronRight } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface TourSchedulerFormProps {
  apartmentTitle: string;
}

export function TourSchedulerForm({ apartmentTitle }: TourSchedulerFormProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const validateForm = () => {
    const newErrors = {} as any;
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone format';
    if (!selectedDate) newErrors.date = 'Please select a date';
    if (!selectedTime) newErrors.time = 'Please select a time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const InputField = ({ icon: Icon, name, type, placeholder, value, onChange, error }) => (
    <div className="space-y-1">
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border ${
            error ? 'border-red-500 dark:border-red-400' : 'border-zinc-200 dark:border-zinc-700'
          } rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );

  return (
    <>
      <Card className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-xs border border-zinc-200 dark:border-zinc-700">
        <CardHeader>
          <CardTitle>Book Your Tour</CardTitle>
          <CardDescription>
            Fill in your details to schedule a viewing for {apartmentTitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <InputField
                icon={User}
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <InputField
                icon={Mail}
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <InputField
                icon={Phone}
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
              />
            </div>

            {/* Date Selection */}
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      if (errors.date) {
                        setErrors(prev => ({ ...prev, date: '' }));
                      }
                    }}
                    className={`w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border ${
                      errors.date ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent`}
                  />
                </div>
                {errors.date && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.date}</p>
                )}
              </div>
              
              {/* Time Slots */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        setSelectedTime(time);
                        if (errors.time) {
                          setErrors(prev => ({ ...prev, time: '' }));
                        }
                      }}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${selectedTime === time
                          ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                          : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
                        }`}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {time}
                    </button>
                  ))}
                </div>
                {errors.time && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Additional Message */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Additional Notes (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                placeholder="Any special requests or questions?"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Schedule Tour
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Tour</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <p>Please review your tour details:</p>
                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {selectedTime}</p>
                  <p><span className="font-medium">Property:</span> {apartmentTitle}</p>
                </div>
                <p>A confirmation email will be sent to {formData.email}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600">
              Change Details
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setShowConfirmation(false)}
              className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Confirm Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

