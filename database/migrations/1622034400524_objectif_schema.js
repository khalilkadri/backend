'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ObjectifSchema extends Schema {
  up () {
    this.create('objectifs', (table) => {
      table.increments()
      table.integer('user_id')
      table.float('montant')
      table.string('categorie')
      table.string('subcategorie')
      table.integer('year')
      table.integer('month')
      table.enu('type',['encaissement','decaissement'])
      table.timestamps()
    })
  }

  down () {
    this.drop('objectifs')
  }
}

module.exports = ObjectifSchema
