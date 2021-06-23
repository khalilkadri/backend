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

Route.resource('/login','LoginController').apiOnly()
Route.post('/signup','LoginController.signup')
Route.get('/user','LoginController.getuser')
Route.resource('/admin','AdminController').apiOnly()
Route.group(()=>{
    Route.resource('/encaisse','EncaissementController').apiOnly()
    Route.get('/engages','EncaissementController.engages')
    Route.resource('/decaisse',"DecaissementController").apiOnly()
Route.get('/decaisses','DecaissementController.decaisses')
Route.resource('/cat','CategorieController').apiOnly()
Route.resource('/subcat','SubcategorieController').apiOnly()
Route.get('/enc-month','EncaissementController.sum_months')
Route.get('/enc-sub','EncaissementController.sum_subcategories')
Route.get('/encaisses','EncaissementController.encaisses')
Route.resource('/objectif','ObjectifController').apiOnly()
Route.get('/dec-month','DecaissementController.sum_months')
Route.get('/tresory','EncaissementController.tresory')
Route.get('/objfetch','ObjectifController.fetch_obj')
Route.get('chart_pie','EncaissementController.chart_pie')
}).middleware(['auth'])
