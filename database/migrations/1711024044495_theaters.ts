import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // nombre de la tabla como va a quedar en la base de datos
  protected tableName = 'theaters'

  // metodo para crear la tabla con id, location, capacity, created_at y updated_at
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('location')
      table.integer('capacity')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
