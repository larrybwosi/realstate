import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { client } from '@/sanity/lib/client'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

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

