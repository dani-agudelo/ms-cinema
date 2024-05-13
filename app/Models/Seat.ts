import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Theater from './Theater'

export default class Seat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: string

  @column()
  public reclining: boolean

  // se debe agregar la relacion con el teatro
  @column()
  public theater_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // se debe agregar la relacion con el teatro, pertenece a un teatro
  @belongsTo(() => Theater, {
    foreignKey: 'theater_id'
    })
  public theater: BelongsTo<typeof Theater>
}
