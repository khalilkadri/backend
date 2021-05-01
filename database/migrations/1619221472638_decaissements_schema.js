'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DecaissementsSchema extends Schema {
  up () {
    this.create('decaissements', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('intitule')
      table.float('montant')
      table.float('tva')
      table.enu('type',['payee','engagee'])
      table.date('facturation')
      table.date('reglement')
      table.string('categorie')
      table.string('memo')
      table.timestamps()
    })
  }

  down () {
    this.drop('decaissements')
  }
}

module.exports = DecaissementsSchema
