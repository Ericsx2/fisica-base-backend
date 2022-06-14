/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question'
import Subject from 'App/Models/Subject'
import { uploadFile } from 'App/Services/UploadFile'

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

    try {
      const question_image = request.file('question_image')
      const feedback_image = request.file('feedback_image')
      const feedback_video = request.file('feedback_video')
      if (question_image)
        question.merge({ image_url: await uploadFile(question_image, 'questions_images') })
      if (feedback_image)
        question.merge({ feedback_image_url: await uploadFile(feedback_image, 'feedback_images') })
      if (feedback_video)
        question.merge({ feedback_video_url: await uploadFile(feedback_video, 'feedback_videos') })

      await question.save()
    } catch (error) {
      response.json({ error })
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
