'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function CleanerDashboardPage() {
  const [jobs, setJobs] = useState<any>([])


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Cleaner Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Apartment</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs && jobs?.map((job) => (
            <TableRow key={job?._id}>
              <TableCell>{job?.apartment.title}</TableCell>
              <TableCell>{new Date(job?.scheduledDate).toLocaleString()}</TableCell>
              <TableCell>{job?.duration} hours</TableCell>
              <TableCell>{job?.tasks.join(', ')}</TableCell>
              <TableCell>{job?.status}</TableCell>
              <TableCell>
                {job?.status === 'assigned' && (
                  <Button>
                    Start Job
                  </Button>
                )}
                {job?.status === 'inProgress' && (
                  <Button>
                    Complete Job
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

