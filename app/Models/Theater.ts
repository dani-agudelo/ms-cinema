import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Projector from './Projector'
import Seat from './Seat'
import Screening from './Screening'

export default class Theater extends BaseModel {

  // esta clase no tiene constructor ya que extiende de BaseModel
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: string

  @column()
  public capacity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // se debe agregar la relacion con el proyector, tiene un proyector
  @hasOne(() => Projector,
    {
      // la clave foranea es theater_id, por eso se conecta 
      foreignKey: 'theater_id'
    })
  // el nombre del atributo es projector, por medio de este se accede al proyector
  public projector: HasOne<typeof Projector>

  // se debe agregar la relacion con las sillas, tiene muchas sillas
  @hasMany(() => Seat,
    {
      foreignKey: 'theater_id'
    })
  public seats: HasMany<typeof Seat>

  @hasMany(() => Screening, {
      foreignKey: 'theater_id'
    })
  public screenings: HasMany<typeof Screening>

}
