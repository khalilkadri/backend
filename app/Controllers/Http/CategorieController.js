'use strict'

const { inputFieldToFieldConfig } = require('@graphql-tools/utils')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cotegories
 */

const Category=use('App/Models/Cotegorie')
const Database = use('Database')

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
    let list=[]
    const categories=await Database.select('nom','id').from('cotegories').orderBy('nom')
    const subs=await Database.select('id','nom','cat_id').from('subcategories').orderBy('cat_id')
    for(let i of categories)
    {
      let categories,id,subcategories=[], item={categories,id,subcategories}
      item.categories=i.nom
      item.id=i.id
      for(let j of subs){
        if(i.id===j.cat_id)
        item.subcategories.push(j)
      }
      list.push(item)
    }
    


    
    
   
    return list
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
    const categorie=await Category.create({
      user_id:auth.user.id,
      nom:request.input('nom')
    })
    return categorie

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
    const categorie=await Category.find(params.id)
    categorie.delete();
  }
}

module.exports = CategorieController
