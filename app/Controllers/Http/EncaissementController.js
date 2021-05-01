'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
 const Database = use('Database')
const Encaisse=use('App/Models/Encaissement')
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    const payes = await Database.select('id','facturation').from('encaissements').sum('montant as montant').where('type','payee').groupBy('facturation')
    const engages = await Database.select('id','facturation').from('encaissements').sum('montant as montant').where('type','engagee').groupBy('facturation')

    return  {payes,engages}
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request, response,auth }) {
    const encaisse = await Encaisse.create({
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

   
     return encaisse
  }


  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  const post=await Post.find(params.id);
  return post;
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  const data=request.only(['content']);
  const post=await Post.find(params.id);
  post.merge(data);
  await post.save();
  return post;
  
  
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const post=await Post.find(params.id);
await post.delete();
  }
}

module.exports = PostController
