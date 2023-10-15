import prisma from '../../libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';

interface ResponseData {
  error?: string
  msg?: string
}

const validateForm = async (email: string, password: string, name: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (user) return { error: 'Email already exists' }

  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if(req.method !== 'POST') {
    return res.status(200).json({error: 'Only POST methods supported'})
  }

  const { email, password, name } = req.body

  const errorMessage = await validateForm(email, password, name)

  if (errorMessage) {
    return res.status(200).json(errorMessage as ResponseData)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  })
  .then(() => {
    return res.status(200).json({ msg: "Account successfully created!" })
  })
  .catch((err: string) => {
    console.log(err)
    return res.status(400).json({ error: 'Account could not be created!' })
  })


}