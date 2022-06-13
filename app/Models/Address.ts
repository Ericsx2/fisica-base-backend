import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public zip_code: string

  @column()
  public state: string

  @column()
  public city: string

  @column()
  public district: string

  @column()
  public street: string

  @column()
  public number: string

  @column()
  public complement?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static setDefaultValues(address: Address) {
    address.id = uuid()
  }
}
