'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('/posts','PostController').apiOnly()
Route.resource('/login','LoginController').apiOnly()
Route.get('/user','LoginController.getuser')
Route.group(()=>{
Route.resource('/encaisse','EncaissementController').apiOnly()
Route.resource('/cat','CategorieController').apiOnly()
Route.resource('/subcat','SubcategorieController').apiOnly()
}).middleware(['auth'])
Route.resource('/decaisse',"DecaissementController").apiOnly()
