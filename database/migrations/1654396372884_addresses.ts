import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.text('id').primary()
      table.text('user_id').unsigned().references('users.id')
      table.text('zip_code').notNullable()
      table.text('state').notNullable()
      table.text('city').notNullable()
      table.text('district').notNullable()
      table.text('street').notNullable()
      table.text('number').notNullable()
      table.text('complement').nullable()
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
