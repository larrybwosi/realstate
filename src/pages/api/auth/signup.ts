import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '@/sanity/lib/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, password } = req.body

  try {
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    )

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const result = await client.create({
      _type: 'user',
      name,
      email,
      password, // In a real-world scenario, you should hash this password
    })

    return res.status(200).json({ message: 'User created successfully', userId: result._id })
  } catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({ message: 'Error creating user' })
  }
}

