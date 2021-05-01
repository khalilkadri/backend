'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with decaissements
 */
 const Database = use('Database')

const Decaisse=use('App/Models/Decaissement')
class DecaissementController {
  /**
   * Show a list of all decaissements.
   * GET decaissements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const payes = await Database.from('decaissements').where('type','payee').groupBy('facturation')
    const engages = await Database.from('decaissements').where('type','engagee').groupBy('facturation')

    return  {payes,engages}
  }

  /**
   * Render a form to be used for creating a new decaissement.
   * GET decaissements/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new decaissement.
   * POST decaissements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request, response,auth }) {
    const decaisse = await Decaisse.create({
      user_id:auth.user.id,
      intitule: request.input('intitule'),
      montant:request.input('montant'),
      tva:request.input('tva'),
      type:request.input('type'),
      facturation:request.input('facturation'),
      reglement:request.input('reglement'),
      categorie:request.input('categorie'),
      memo:request.input('memo')
    })

   
     return decaisse
  }
  /**
   * Display a single decaissement.
   * GET decaissements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing decaissement.
   * GET decaissements/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update decaissement details.
   * PUT or PATCH decaissements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a decaissement with id.
   * DELETE decaissements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = DecaissementController
