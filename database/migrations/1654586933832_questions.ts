import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'questions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.text('id').primary()
      table.text('sentence').notNullable()
      table.integer('difficulty').notNullable()
      table.text('image_url').nullable()
      table.specificType('alternatives', 'TEXT[]').notNullable()
      table.integer('answer').notNullable()
      table.text('feedback_image_url').nullable()
      table.text('feedback_video_url').nullable()
      table.text('subject_id').references('subjects.id').onDelete('CASCADE').notNullable()
      table.text('exam_id').references('exams.id').onDelete('CASCADE')

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
