import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Subject from './Subject'

export default class Subtopic extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public topic_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Subject, {
    foreignKey: 'subtopic_id',
  })
  public subjects: HasMany<typeof Subject>

  @beforeCreate()
  public static setDefaultValues(subtopic: Subtopic) {
    subtopic.id = uuid()
  }
}
