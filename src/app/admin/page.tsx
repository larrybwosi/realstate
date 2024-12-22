'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

interface Booking {
  _id: string
  apartmentId: string
  apartmentTitle: string
  startDate: string
  endDate: string
  depositAmount: number
  totalPrice: number
  status: 'pending' | 'approved' | 'rejected'
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        throw new Error('Failed to fetch bookings')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch bookings. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleStatusChange = async (bookingId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast({
          title: 'Status updated',
          description: `Booking status has been updated to ${newStatus}.`,
        })
        fetchBookings()
      } else {
        throw new Error('Failed to update booking status')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update booking status. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto py-24">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <Table>
        <TableCaption>A list of all apartment bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Apartment</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Deposit</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.apartmentTitle}</TableCell>
              <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
              <TableCell>${booking.depositAmount}</TableCell>
              <TableCell>${booking.totalPrice}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                {booking.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(booking._id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(booking._id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

