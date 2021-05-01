'use strict'

const { inputFieldToFieldConfig } = require('@graphql-tools/utils')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cotegories
 */

const Subcategory=use('App/Models/Subcategorie')

class CategorieController {
  /**
   * Show a list of all cotegories.
   * GET cotegories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new cotegorie.
   * GET cotegories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new cotegorie.
   * POST cotegories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth }) {
    const Subcategorie=await Subcategory.create({
      user_id:auth.user.id,
      cat_id:request.input('cat_id'),
      nom:request.input('nom')
    })
    return Subcategorie

  }

  /**
   * Display a single cotegorie.
   * GET cotegories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing cotegorie.
   * GET cotegories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update cotegorie details.
   * PUT or PATCH cotegories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a cotegorie with id.
   * DELETE cotegories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const Subcategorie=await Subcategory.find(params.id)
    Subcategorie.delete();
  }
}

module.exports = CategorieController
