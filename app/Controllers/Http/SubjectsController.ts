/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subject from 'App/Models/Subject'
import Subtopic from 'App/Models/Subtopic'
import { DateTime } from 'luxon'

export default class SubjectsController {
  public async index({ response }: HttpContextContract) {
    const subjects = await Subject.all()

    return response.json({ subjects })
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, subtopic_id } = request.only(['name', 'subtopic_id'])

    const subjectAlreadyExists = await Subject.findBy('name', name)

    if (subjectAlreadyExists) {
      return response.status(409)
    }

    const subtopic = await Subtopic.findBy('id', subtopic_id)

    if (!subtopic) {
      return response.status(500)
    }

    await subtopic.related('subjects').create({ name })

    return response.status(200)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const subject = await Subject.findBy('id', id)

    if (!subject) {
      return response.status(404)
    }

    return response.json({ subject })
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const { name, subtopic_id } = request.only(['name', 'subtopic_id'])

    const subject = await Subject.findBy('id', id)
    const subtopic = await Subtopic.findBy('id', subtopic_id)

    if (!subject) {
      return response.status(404)
    }

    if (!subtopic) {
      return response.status(404)
    }

    try {
      await subject
        .merge({
          name,
          updatedAt: DateTime.local(),
        })
        .save()

      await subtopic.related('subjects').save(subject)
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const subject = await Subject.findBy('id', id)

    if (!subject) {
      return response.status(404)
    }

    try {
      await subject.delete()
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }
}
