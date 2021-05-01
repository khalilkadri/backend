'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CotegorieSchema extends Schema {
  up () {
    this.create('cotegories', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('nom')
      table.enum('type',['encaissement','decaissement'])
      table.timestamps()
    })
  }

  down () {
    this.drop('cotegories')
  }
}

module.exports = CotegorieSchema
