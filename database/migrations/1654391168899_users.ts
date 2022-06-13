import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.text('id').primary()
      table.text('name').notNullable()
      table.text('last_name').notNullable()
      table.text('email').notNullable().unique()
      table.text('password').notNullable()
      table.text('cpf_number').notNullable().unique()
      table.text('avatar_url').nullable()
      table.text('phone_number').nullable()
      table.integer('role').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
