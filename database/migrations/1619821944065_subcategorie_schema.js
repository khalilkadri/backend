'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubcategorieSchema extends Schema {
  up () {
    this.create('subcategories', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('cat_id')
      table.string('nom')
      table.timestamps()
    })
  }

  down () {
    this.drop('subcategories')
  }
}

module.exports = SubcategorieSchema
