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
  async index ({ request, response, view,auth }) {
    const  type = request.input('type') 
    let list=[]
    const show=false
    const add=false
    const categories=await Database.select('nom','id','type').from('cotegories').where('user_id',auth.user.id).where('type',type).orderBy('nom')
    const subs=await Database.select('id','nom','cat_id').from('subcategories').orderBy('cat_id')
    const cid=await Database.from('cotegories').getMax('id')
    const sid=await Database.from('subcategories').getMax('id')
    const ids={cid,sid}
    if(categories.length!=0)
    {for(let i of categories)
    {
      let nom,id,type,subcategories=[], item={nom,id,type,show,add,subcategories}
      item.nom=i.nom
      item.id=i.id
      item.type=i.type
      item.show=false
      item.add=false
      for(let j of subs){
        let objsub={
          cat_id:j.cat_id,
          id:j.id,
          nom:j.nom,
          show:false
        }
        if(i.id===j.cat_id)
        item.subcategories.push(objsub)
      }
      list.push(item)
    }
  let [first]=list
    return {list,ids,first}}
    else {
      let first="vide"
      let cid=0
      let sid=0
      let ids={cid,sid}
      let list=[{nom:"vide",subcategorie:[]}]
      return {list,ids,first}}
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
      nom:request.input('nom'),
      type:request.input('type')
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
  async update ({ params, request, response ,auth}) {
    const data=request.only(['nom']);
    const cat=await Category.find(params.id);
    cat.merge(data);
    await cat.save();
    return cat;
    
    
  }

  /**
   * Delete a cotegorie with id.
   * DELETE cotegories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,auth }) {
    const categorie=await Category.find(params.id)
    categorie.delete();
  }
}

module.exports = CategorieController
