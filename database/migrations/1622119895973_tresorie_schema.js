'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TresorerieSchema extends Schema {
  up () {
    this.create('tresorerie', (table) => {
      table.increments()
      table.integer('user_id')
      table.float('montant_start')
      table.float('montant_end')
      table.integer('year')
      table.timestamps()
    })
  }

  down () {
    this.drop('tresorerie')
  }
}

module.exports = TresorerieSchema
