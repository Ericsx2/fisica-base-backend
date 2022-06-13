import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Topic from 'App/Models/Topic'

export default class TopicsController {
  public async index({ response }: HttpContextContract) {
    const topics = await Topic.all()

    return response.json({ topics })
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.only(['name'])

    const topicAlreadyExists = await Topic.findBy('name', name)

    if (topicAlreadyExists) {
      return response.status(409).json({ message: 'Tópico já cadastrado' })
    }

    const topic = await Topic.create({ name })

    if (!topic) {
      return response.status(500)
    }

    return response.status(200)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const topic = await Topic.findBy('id', id)

    if (!topic) {
      return response.status(404)
    }

    return response.json({ topic })
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const { name } = request.only(['name'])

    const topic = await Topic.findBy('id', id)

    try {
      await topic?.merge({ name, updatedAt: DateTime.local() }).save()
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const topic = await Topic.findBy('id', id)

    try {
      await topic?.delete()
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }
}
