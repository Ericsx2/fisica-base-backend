/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import bcrypt from 'bcrypt'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const id = request.user_id

    const user = await User.findBy('id', id)

    if (!user) {
      return response.status(404)
    }

    return response.json({
      id: user?.id,
      name: user?.name,
      last_name: user?.last_name,
      email: user?.email,
      cpf_number: user?.cpf_number,
      avatar_url: user?.avatar_url,
      phone_number: user?.phone_number,
      address: user.address,
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, last_name, password, email, cpf_number, avatar_url, phone_number } = request.only(
      ['name', 'last_name', 'password', 'email', 'cpf_number', 'avatar_url', 'phone_number']
    )

    const emailExists = await User.findBy('email', email)
    const cpfExists = await User.findBy('cpf_number', cpf_number)

    if (emailExists) {
      return response.status(409).json({ message: 'Email já cadastrado' })
    }

    if (cpfExists) {
      return response.status(409).json({ message: 'CPF já cadastrado' })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      last_name,
      password: hash,
      email,
      cpf_number,
      avatar_url,
      phone_number,
    })

    if (!user) {
      response.status(500)
    }

    return response.json({ id: user.id })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
