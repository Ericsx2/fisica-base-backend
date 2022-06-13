import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public last_name: string

  @column()
  public password: string

  @column()
  public email: string

  @column()
  public cpf_number: string

  @column()
  public avatar_url?: string

  @column()
  public phone_number?: string

  @column()
  public role: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Address, {
    foreignKey: 'user_id',
  })
  public address: HasOne<typeof Address>

  @beforeCreate()
  public static setDefaultValues(user: User) {
    user.id = uuid()
    user.role = 1
  }
}
