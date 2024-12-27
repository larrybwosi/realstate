import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const result = await client.create({
      _type: 'cleaningJob',
      requestedBy: {
        _type: 'reference',
        _ref: session.user.id,
      },
      apartment: {
        _type: 'reference',
        _ref: body.apartment,
      },
      scheduledDate: body.scheduledDate,
      duration: parseFloat(body.duration),
      tasks: body.tasks.split(',').map((task: string) => task.trim()),
      notes: body.notes,
      status: 'requested',
    })

    return NextResponse.json({ message: 'Cleaning job created successfully', result })
  } catch (error) {
    console.error('Error creating cleaning job:', error)
    return NextResponse.json({ error: 'Error creating cleaning job' }, { status: 500 })
  }
}

