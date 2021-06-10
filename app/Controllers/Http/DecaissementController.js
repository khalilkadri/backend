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
   async decaisses({request,response,params}){
    const  month = request.input('month') 
    let start= month.concat('-01')
    let end= month.concat('-31')
    let categorie=request.input('categorie')
    let subcategorie=request.input('subcategorie')
    const data = await Database.select('*').from('decaissements').orderBy('facturation').where('facturation','>',start).where('facturation','<',end).where('categorie',categorie).where('subcategorie',subcategorie).where('type','payee')
    return data

  }
   async store ({ request, response,auth }) {
    const decaisse = await Decaisse.create({
      user_id:request.input('user_id'),
      intitule: request.input('intitule'),
      montant:request.input('montant'),
      tva:request.input('tva'),
      type:request.input('type'),
      facturation:request.input('facturation'),
      reglement:request.input('reglement'),
      categorie:request.input('categorie'),
      subcategorie:request.input('subcategorie'),
      memo:request.input('memo')
    })

   
     return decaisse
  }
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
    object.categorie=first.cat
    object.subcategorie=first.subcat
      my_tab.shift()
  
    for(let i of object.sum)
    {
      if(i.date==first.date.month)
      {i.montant+=first.montant
     continue}
    }
    sub.push(object)
    for(let i of my_tab)
    {
      for(let j of sub){
        if((i.cat!=j.categorie && j.categorie==sub[sub.length-1].categorie) || j.sum.length==0){
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
          obj.categorie=i.cat
          obj.subcategorie=i.subcat
          for(let e of obj.sum)
          {
            if(i.date.month==e.date)
            {i.montant+=e.montant
           continue}
          }
          sub.push(obj)
          continue
        }
        if(i.cat===j.categorie){
      if(i.subcat===j.subcategorie )
     {
       for(let k of j.sum)
       if(i.date.month==k.date){
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
       obj.categorie=i.cat
       obj.subcategorie=i.subcat
       for(let e of obj.sum)
       {
         if(i.date.month==e.date)
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
  
    async sum_months({request,response,params}){
      //const encaisses=await Database.select('categorie','montant','facturation').from('encaissements').orderBy('categorie').orderBy('facturation')
      const  year = request.input('year') 
       let start= year.concat('-01-01')
       let end= year.concat('-12-31')
       const data = await Database.select('categorie','subcategorie','montant','facturation').from('decaissements').orderBy('categorie').orderBy('subcategorie').orderBy('facturation').where('facturation','>',start).where('facturation','<',end).where('type','payee')
    
       let list=[]
       for(let i of data)
       {
        let month,year,date={month,year},montant,cat,subcat,obj={cat,subcat,date,montant}
         let x=new Date(i.facturation)
         date.month=x.getMonth()
         date.year=x.getFullYear()
         obj.cat=i.categorie
         obj.subcat=i.subcategorie
         obj.date=date
         obj.montant=parseFloat(i.montant)
         list.push(obj)
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
       
       object.categorie=first.cat
       for(let i of object.tab)
       {
         if(i.date==first.date.month)
         {i.montant+=first.montant
        continue}
       }
       list.shift()
       datas.push(object)
       
       for(let i of list)
       {
         for(let j of datas){
         if(i.cat===j.categorie)
        {
          for(let k of j.tab)
          if(i.date.month==k.date){
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
          obj.categorie=i.cat
          for(let e of obj.tab)
          {
            if(i.date.month==e.date)
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
    const data=request.only(['intitule','type','montant','tva','facturation','reglement','categorie','subcategorie','memo']);
    const decaisse=await Decaisse.find(params.id);
    decaisse.merge(data);
    await decaisse.save();
    return decaisse;
    
  
  
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
    const decaisse=await Decaisse.find(params.id);
    await decaisse.delete();
  }
}

module.exports = DecaissementController
