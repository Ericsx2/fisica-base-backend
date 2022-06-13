/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'

export default class AddressesController {
  public async index({ request, response }: HttpContextContract) {
    const id = request.user_id

    const address = await Address.findBy('user_id', id)

    if (!address) {
      return response.status(404)
    }

    return response.json(address)
  }

  public async store({ request, response }: HttpContextContract) {
    const { user_id, zip_code, state, city, district, street, number, complement } = request.only([
      'user_id',
      'zip_code',
      'state',
      'city',
      'district',
      'street',
      'number',
      'complement',
    ])

    const address = await Address.create({
      user_id,
      zip_code,
      state,
      city,
      district,
      street,
      number,
      complement,
    })

    if (!address) {
      return response.status(500)
    }

    return response.status(200)
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
