import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const role = request.user_role

    if (role !== 1) {
      return response.status(401)
    }

    await next()
  }
}
