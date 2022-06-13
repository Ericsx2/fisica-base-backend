import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exam from 'App/Models/Exam'

export default class ExamsController {
  public async index({ response }: HttpContextContract) {
    const exams = await Exam.all()

    if (!exams) {
      return response.status(500)
    }

    return response.json({ exams })
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, initials, year } = request.only(['name', 'initials', 'year'])

    const examAlreadyExists = await Exam.findBy('initials', initials)

    if (examAlreadyExists) {
      return response.status(409)
    }

    try {
      await Exam.create({
        name,
        initials,
        year,
      })
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const exam = await Exam.findBy('id', id)

    if (!exam) {
      return response.status(404)
    }

    return response.json({ exam })
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const { name, initials, year } = request.only(['name', 'initials', 'year'])

    const exam = await Exam.findBy('id', id)

    if (!exam) {
      return response.status(404)
    }

    try {
      await exam
        .merge({
          name,
          initials,
          year,
        })
        .save()
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const exam = await Exam.findBy('id', id)

    if (!exam) {
      return response.status(404)
    }

    try {
      await exam.delete()
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }
}
