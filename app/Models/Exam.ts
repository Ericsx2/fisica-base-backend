import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Exam extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public initials: string

  @column()
  public year: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Question, {
    foreignKey: 'exam_id',
  })
  public questions: HasMany<typeof Question>

  @beforeCreate()
  public static setDefaultValues(exam: Exam) {
    exam.id = uuid()
  }
}
