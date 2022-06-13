import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public difficulty: number

  @column()
  public sentence: string

  @column()
  public image_url?: string

  @column()
  public alternatives: string[]

  @column()
  public answer: number

  @column()
  public feedback_image_url?: string

  @column()
  public feedback_video_url?: string

  @column()
  public subject_id: string

  @column()
  public exam_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static setDefaultValues(question: Question) {
    question.id = uuid()
  }
}
