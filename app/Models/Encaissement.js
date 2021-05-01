'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Encaissement extends Model {
    static get dates() {
        return super.dates.concat(["facturation"]);
        return super.dates.concat(["reglement"]);

      }
}

module.exports = Encaissement
