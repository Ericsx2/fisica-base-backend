import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import jwt from 'jsonwebtoken'

interface TokenPayload {
  id: string
  name: string
  last_name: string
  avatar_url: string
  role: number
}

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { authorization } = request.headers()

    if (!authorization) {
      return response.status(401)
    }

    const token = authorization.replace('Bearer', '').trim()

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET as string)
      const { id, role } = data as TokenPayload

      request.user_id = id
      request.user_role = role
    } catch {
      return response.status(401)
    }
    await next()
  }
}
