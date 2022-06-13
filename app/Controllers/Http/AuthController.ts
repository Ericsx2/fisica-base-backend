import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AuthController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return response.status(401)
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    return response.status(200).json({ token })
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
