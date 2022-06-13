/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Exam from 'App/Models/Exam'
import Question from 'App/Models/Question'
import Subject from 'App/Models/Subject'

export default class QuestionsController {
  public async index({ response }: HttpContextContract) {
    const questions = await Question.all()

    if (!questions) {
      return response.status(500)
    }

    return response.json({ questions })
  }

  public async store({ request, response }: HttpContextContract) {
    const { difficulty, sentence, answer, alternatives, subject_id } = request.only([
      'difficulty',
      'sentence',
      'answer',
      'alternatives',
      'subject_id',
    ])

    const question_image = request.file('question_image')
    const feedback_image = request.file('feedback_image')
    const feedback_video = request.file('feedback_video')

    const subject = await Subject.findBy('id', subject_id)

    if (!subject) {
      return response.status(404)
    }

    const question = await subject.related('Questions').create({
      difficulty,
      sentence,
      alternatives,
      answer,
    })

    if (!question) {
      return response.status(500)
    }

    if (question_image) {
      const s3 = Drive.use('s3')

      await question_image.moveToDisk(
        'questions_images',
        { name: `${question.id}.${question_image.extname}`, visibility: 'public' },
        's3'
      )

      const image_url = await Drive.getUrl(question_image.filePath as string)

      console.log(image_url)
    }

    return response.status(200)
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const question = await Question.findBy('id', id)

    if (!question) {
      return response.status(404)
    }

    return response.json({ question })
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const question = await Question.findBy('id', id)

    if (!question) {
      return response.status(404)
    }

    try {
      await question.delete()
    } catch {
      return response.status(500)
    }

    return response.status(200)
  }
}
