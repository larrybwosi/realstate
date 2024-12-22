'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [jobs, setJobs] = useState<any>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user?.role !== 'cleaner') {
      router.push('/')
    } else {
      fetchJobs()
    }
  }, [status, session, router])

  const fetchJobs = async () => {
    const response = await fetch('/api/cleaner/jobs')
    const data = await response.json()
    setJobs(data)
  }

  const updateJobStatus = async (jobId, newStatus) => {
    const response = await fetch(`/api/cleaner/jobs/${jobId}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })

    if (response.ok) {
      fetchJobs()
    }
  }

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
                  <Button onClick={() => updateJobStatus(job?._id, 'inProgress')}>
                    Start Job
                  </Button>
                )}
                {job?.status === 'inProgress' && (
                  <Button onClick={() => updateJobStatus(job?._id, 'completed')}>
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

