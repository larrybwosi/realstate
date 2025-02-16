import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const jobs = await client.fetch(`*[_type == "cleaningJob"] {
      _id,
      apartment->{_id, title},
      requestedBy->{_id, name},
      assignedTo->{_id, name},
      status,
      scheduledDate,
      duration,
      tasks,
      notes
    }`)

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching cleaning jobs:', error)
    return NextResponse.json({ error: 'Error fetching cleaning jobs' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const result = await client.create({
      _type: 'cleaningJob',
      ...body,
      status: 'assigned',
    })

    return NextResponse.json({ message: 'Cleaning job created successfully', result })
  } catch (error) {
    console.error('Error creating cleaning job:', error)
    return NextResponse.json({ error: 'Error creating cleaning job' }, { status: 500 })
  }
}

