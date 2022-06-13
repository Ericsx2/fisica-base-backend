/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subtopic from 'App/Models/Subtopic'
import Topic from 'App/Models/Topic'
import { DateTime } from 'luxon'

export default class SubtopicsController {
  public async index({ response }: HttpContextContract) {
    const subtopics = await Subtopic.all()

    if (!subtopics) {
      return response.status(500)
    }

    return response.json({ subtopics })
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, topic_id } = request.only(['name', 'topic_id'])

    const subtopicAlreadyExists = await Subtopic.findBy('name', name)

    if (subtopicAlreadyExists) {
      return response.status(409)
    }

    const topic = await Topic.findBy('id', topic_id)

    if (!topic) {
      return response.status(500)
    }

    const subtopic = await topic.related('subtopics').create({
      name,
    })

    return response.json({ id: subtopic.id })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const subtopic = await Subtopic.findBy('id', id)

    if (!subtopic) {
      return response.status(404)
    }

    return response.json({ subtopic })
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const { name, topic_id } = request.only(['name', 'topic_id'])

    const subtopic = await Subtopic.findBy('id', id)
    const topic = await Topic.findBy('id', topic_id)

    if (!subtopic) {
      return response.status(404)
    }

    if (!topic) {
      return response.status(404)
    }

    try {
      await subtopic
        .merge({
          name,
          updatedAt: DateTime.local(),
        })
        .save()

      await topic.related('subtopics').save(subtopic)
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const subtopic = await Subtopic.findBy('id', id)

    if (!subtopic) {
      return response.status(404)
    }

    try {
      await subtopic.delete()
    } catch {
      return response.status(500)
    }

    return response.status(500)
  }
}
