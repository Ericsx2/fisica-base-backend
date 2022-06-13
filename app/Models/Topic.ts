import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Subtopic from './Subtopic'

export default class Topic extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Subtopic, {
    foreignKey: 'topic_id',
  })
  public subtopics: HasMany<typeof Subtopic>

  @beforeCreate()
  public static setDefaultValues(topic: Topic) {
    topic.id = uuid()
  }
}
