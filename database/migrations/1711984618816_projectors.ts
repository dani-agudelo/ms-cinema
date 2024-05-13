import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projectors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('brand')
      table.integer('high')
      table.integer('width')
      // reference to theaters table with foreign key id, unsigned is for positive numbers
      table.integer('theater_id')
        .unsigned()
        .references('theaters.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
