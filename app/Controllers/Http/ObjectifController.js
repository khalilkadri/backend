'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with objectifs
 */
const Objectif=use('App/Models/Objectif')
const Database = use('Database')

class ObjectifController {
  /**
   * Show a list of all objectifs.
   * GET objectifs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   sum_subcategories(table){
  
    let sum=[
     {
       "date": "0",
       "montant": 0
     },
     {
       "date": "1",
       "montant": 0
     },
     {
       "date": "2",
       "montant": 0
     },
     {
       "date": "3",
       "montant": 0
     },
     {
       "date": "4",
       "montant": 0
     },
     {
       "date": "5",
       "montant": 0
     },
     {
       "date": "6",
       "montant": 0
     },
     {
       "date": "7",
       "montant": 0
     },
     {
       "date": "8",
       "montant": 0
     },
     {
       "date": "9",
       "montant": 0
     },
     {
       "date": "10",
       "montant": 0
     },
     {
       "date": "11",
       "montant": 0
     }
   ]
   let my_tab=[]
   for(let i of table)
   my_tab.push(i)
    let sub=[],subcategorie='',categorie=''
    let object={categorie,subcategorie,sum}
    let [first]=my_tab
    object.categorie=first.categorie
    object.subcategorie=first.subcategorie
      my_tab.shift()
  
    for(let i of object.sum)
    {
      if(i.date==first.month)
      {i.montant+=first.montant
     continue}
    }
    sub.push(object)
    for(let i of my_tab)
    {
      for(let j of sub){
        if((i.categorie!=j.categorie && j.categorie==sub[sub.length-1].categorie) || j.sum.length==0){
          let sum=[
            {
              "date": "0",
              "montant": 0
            },
            {
              "date": "1",
              "montant": 0
            },
            {
              "date": "2",
              "montant": 0
            },
            {
              "date": "3",
              "montant": 0
            },
            {
              "date": "4",
              "montant": 0
            },
            {
              "date": "5",
              "montant": 0
            },
            {
              "date": "6",
              "montant": 0
            },
            {
              "date": "7",
              "montant": 0
            },
            {
              "date": "8",
              "montant": 0
            },
            {
              "date": "9",
              "montant": 0
            },
            {
              "date": "10",
              "montant": 0
            },
            {
              "date": "11",
              "montant": 0
            }
          ]
          let categorie,subcategorie,obj={categorie,subcategorie,sum}
          obj.categorie=i.categorie
          obj.subcategorie=i.subcategorie
          for(let e of obj.sum)
          {
            if(i.month==e.date)
            {i.montant+=e.montant
           continue}
          }
          sub.push(obj)
          continue
        }
        if(i.categorie===j.categorie){
      if(i.subcategorie===j.subcategorie  )
     {
       for(let k of j.sum)
       if(i.month==k.date){
         k.montant+=i.montant
         break
       }
            
       continue
     }
     else if(j.subcategorie===sub[sub.length-1].subcategorie)
     {
       let sum=[
         {
           "date": "0",
           "montant": 0
         },
         {
           "date": "1",
           "montant": 0
         },
         {
           "date": "2",
           "montant": 0
         },
         {
           "date": "3",
           "montant": 0
         },
         {
           "date": "4",
           "montant": 0
         },
         {
           "date": "5",
           "montant": 0
         },
         {
           "date": "6",
           "montant": 0
         },
         {
           "date": "7",
           "montant": 0
         },
         {
           "date": "8",
           "montant": 0
         },
         {
           "date": "9",
           "montant": 0
         },
         {
           "date": "10",
           "montant": 0
         },
         {
           "date": "11",
           "montant": 0
         }
       ]
       let categorie,subcategorie,obj={categorie,subcategorie,sum}
       obj.categorie=i.categorie
       obj.subcategorie=i.subcategorie
       for(let e of obj.sum)
       {
         if(i.month==e.date)
         {i.montant+=e.montant
        continue}
       }
       sub.push(obj)
       continue
  
     }
    }  
  
     }
    }
    return sub
  
  }
   async index({request,response,params}){
    //const encaisses=await Database.select('categorie','montant','facturation').from('encaissements').orderBy('categorie').orderBy('facturation')
    const  year = request.input('year') 
     const data = await Database.select('*').from('objectifs').orderBy('categorie').orderBy('subcategorie').orderBy('month').where('year',year)
  
     let list=[]
     for(let i of data)
     {

       list.push(i)
     }
     if(list.length!=0){
     let sub_tab=this.sum_subcategories(list)
     
     let tab=[
      {
        "date": "0",
        "montant": 0
      },
      {
        "date": "1",
        "montant": 0
      },
      {
        "date": "2",
        "montant": 0
      },
      {
        "date": "3",
        "montant": 0
      },
      {
        "date": "4",
        "montant": 0
      },
      {
        "date": "5",
        "montant": 0
      },
      {
        "date": "6",
        "montant": 0
      },
      {
        "date": "7",
        "montant": 0
      },
      {
        "date": "8",
        "montant": 0
      },
      {
        "date": "9",
        "montant": 0
      },
      {
        "date": "10",
        "montant": 0
      },
      {
        "date": "11",
        "montant": 0
      }
    ]
    
     let datas=[],categorie='',subs=[],show=false
     let object={categorie,show,tab,subs}
     let [first]=list
     
     object.categorie=first.categorie
     for(let i of object.tab)
     {
       if(i.date==first.month)
       {i.montant+=first.montant
      continue}
     }
     list.shift()
     datas.push(object)
     
     for(let i of list)
     {
       for(let j of datas){
       if(i.categorie===j.categorie)
      {
        for(let k of j.tab)
        if(i.month==k.date){
          k.montant+=i.montant
          break
        }
             
        continue
      }
      else if(j.categorie===datas[datas.length-1].categorie)
      {
        let tab=[
          {
            "date": "0",
            "montant": 0
          },
          {
            "date": "1",
            "montant": 0
          },
          {
            "date": "2",
            "montant": 0
          },
          {
            "date": "3",
            "montant": 0
          },
          {
            "date": "4",
            "montant": 0
          },
          {
            "date": "5",
            "montant": 0
          },
          {
            "date": "6",
            "montant": 0
          },
          {
            "date": "7",
            "montant": 0
          },
          {
            "date": "8",
            "montant": 0
          },
          {
            "date": "9",
            "montant": 0
          },
          {
            "date": "10",
            "montant": 0
          },
          {
            "date": "11",
            "montant": 0
          }
        ]
        let categorie,show=false,subs=[],obj={categorie,show,tab,subs}
        obj.categorie=i.categorie
        for(let e of obj.tab)
        {
          if(i.month==e.date)
          {i.montant+=e.montant
         continue}
        }
        datas.push(obj)
        continue

      }
      }
     }
     for(let i of sub_tab){
       for(let j of datas){
         if(i.categorie==j.categorie){
           j.subs.push(i)
           continue
         }
       }
     }

 
    return datas
     }
     else{
      
      return []
       
     }
  }

  /**
   * Render a form to be used for creating a new objectif.
   * GET objectifs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new objectif.
   * POST objectifs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth }) {
    const objectif=await Objectif.create({
      user_id:request.input('user_id'),
      montant:request.input('montant'),
      categorie:request.input('categorie'),
      subcategorie:request.input('subcategorie'),
      year:request.input('year'),
      month:request.input('month'),
      type:request.input('type'),
    })
    return objectif
  }

  /**
   * Display a single objectif.
   * GET objectifs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing objectif.
   * GET objectifs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update objectif details.
   * PUT or PATCH objectifs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a objectif with id.
   * DELETE objectifs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ObjectifController
