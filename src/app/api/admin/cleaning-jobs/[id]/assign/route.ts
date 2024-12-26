import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
    const { cleanerId } = await req.json()

    const result = await client
      .patch(id)
      .set({
        assignedTo: {
          _type: 'reference',
          _ref: cleanerId,
        },
        status: 'assigned',
      })
      .commit()

    return NextResponse.json({ message: 'Cleaning job assigned successfully', result })
  } catch (error) {
    console.error('Error assigning cleaning job:', error)
    return NextResponse.json({ error: 'Error assigning cleaning job' }, { status: 500 })
  }
}

