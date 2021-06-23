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
calcul(data){
    let list=[]
    for(let i of data)
     {
     let month,year,date={month,year},montant,obj={date,montant}
      let x=new Date(i.facturation)
      date.month=x.getMonth()
      date.year=x.getFullYear()
      obj.date=date
      obj.montant=parseFloat(i.montant)
      list.push(obj)
    }
    

    let holder = {};

list.forEach(function(p) {
 if (holder.hasOwnProperty(p.date.month)) {
   holder[p.date.month] = holder[p.date.month] + p.montant;
 } else {
   holder[p.date.month] = p.montant;
 }
});

var encaissements = [];
var tab=[
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
for (var  prop in holder) {
 encaissements.push({ date: prop, montant: holder[prop] });
}

tab.forEach(el => {
 for (let i = 0; i < encaissements.length; i++) {
   if (parseInt(encaissements[i].date) === parseInt(el.date)) return;                                                       
   if (parseInt(encaissements[i].date) >parseInt (el.date)) {
     encaissements.splice(i, 0, el);
     return 
   }
 }

encaissements.push(el);
})

return encaissements
    
  }
  calcul_previsions(data){
    let list=[]
   for(let i of data)
     {
     /*let month,year,date={month,year},montant,obj={date,montant}
      let x=new Date(i.facturation)
      date.month=x.getMonth()
      date.year=x.getFullYear()
      obj.date=date
      obj.montant=parseFloat(i.montant)*/
      list.push(i)
    }
    

    let holder = {};

list.forEach(function(p) {
 if (holder.hasOwnProperty(p.month)) {
   holder[p.month] = holder[p.month] + p.montant;
 } else {
   holder[p.month] = p.montant;
 }
});

var previsions = [];
var tab=[
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
for (var  prop in holder) {
 previsions.push({ date: prop, montant: holder[prop] });
}

tab.forEach(el => {
 for (let i = 0; i < previsions.length; i++) {
   if (parseInt(previsions[i].date) === parseInt(el.date)) return;                                                       
   if (parseInt(previsions[i].date) >parseInt (el.date)) {
     previsions.splice(i, 0, el);
     return 
   }
 }

previsions.push(el);
})

return previsions
    
  }
  async index({request,response,params,auth}){
     const  year = request.input('year') 
     let start= year.concat('-01-01')
     let end= year.concat('-12-31')
    let encaisses_payes = await Database.select('id','montant','facturation').from('encaissements').where('user_id',auth.user.id).orderBy('facturation').whereBetween('facturation',[start,end]).where('type','payee')
    let encaisses_engages = await Database.select('id','montant','facturation').from('encaissements').where('user_id',auth.user.id).orderBy('facturation').whereBetween('facturation',[start,end]).where('type','engagee')
    let decaisses_payes = await Database.select('id','montant','facturation').from('decaissements').where('user_id',auth.user.id).orderBy('facturation').where('facturation','>',start).where('facturation','<',end).where('type','payee')
    let decaisses_engages = await Database.select('id','montant','facturation').from('decaissements').where('user_id',auth.user.id).orderBy('facturation').whereBetween('facturation',[start,end]).where('type','engagee')
    let encs_payes=this.calcul(encaisses_payes)
    let encs_engages=this.calcul(encaisses_engages)
    let decs_payes=this.calcul(decaisses_payes)
    let decs_engages=this.calcul(decaisses_engages)
    let tresorie_year=parseInt(year)+1
    const fetch_tresorerie=await Database.select('*').from('tresorerie').where('year',year)
    const fetch_previsions_encs=await Database.select('*').from('objectifs').where('user_id',auth.user.id).where('year',year).where('type','encaissement')
    let previsions_encs=this.calcul_previsions(fetch_previsions_encs)
    const fetch_previsions_decs=await Database.select('*').from('objectifs').where('user_id',auth.user.id).where('year',year).where('type','decaissement')
    let previsions_decs=this.calcul_previsions(fetch_previsions_decs)
    let tresorie=[]
    if(fetch_tresorerie.length!=0)
    {
     const [tresorerie]=fetch_tresorerie 
    const encaissements=this.calcul(encaisses_payes)
    const decaissements=this.calcul(decaisses_payes)
    let m=0
    for(let i=0;i<encaissements.length;i++)
    {
      let x=parseFloat(encaissements[i].montant)-parseFloat(decaissements[i].montant)
      let data={m,x}
      tresorie.push(data)
      m++
    }
   let [first]=tresorie

    first.x+=parseFloat(tresorerie.montant_start)
    tresorie.shift()
    tresorie.unshift(first)
    for(let i=1;i<tresorie.length;i++)
    {
      tresorie[i].x+=tresorie[i-1].x
    }
    const last=tresorie[11].x
    const affectEnd=await Database.table('tresorerie').where('year',year).update('montant_end',last).where('user_id',auth.user.id)
    const affectStart=await Database.table('tresorerie').where('year',tresorie_year).update('montant_start',last).where('user_id',auth.user.id)
    }
    else{
      tresorie=[{date:'0',montant:'0'},{date:'1',montant:'0'},{date:'2',montant:'0'},{date:'3',montant:'0'},
      {date:'4',montant:'0'},{date:'5',montant:'0'},{date:'6',montant:'0'},{date:'7',montant:'0'},
      {date:'8',montant:'0'},{date:'9',montant:'0'},{date:'10',montant:'0'},{date:'11',montant:'0'}]
      
    }
    return({encs_payes,encs_engages,decs_payes,decs_engages,tresorie,previsions_encs,previsions_decs})

  }
  async engages({request,response,auth}){
const date=new Date()
const engages=await Database.select('*').from('encaissements').where('user_id',auth.user.id).where('user_id',auth.user.id).where('type','engagee').where('reglement','<',date).orderBy('reglement')
return engages
  }
   async tresory ({ request, response, params,auth}) {
    const  year = request.input('year') 
     let start= year.concat('-01-01')
     let end= year.concat('-12-31')
     const encaisses = await Database.select('id','montant','facturation').from('encaissements').where('user_id',auth.user.id).orderBy('facturation').whereBetween('facturation',[start,end])
     const decaisses = await Database.select('id','montant','facturation').from('decaissements').where('user_id',auth.user.id).orderBy('facturation').where('facturation','>',start).where('facturation','<',end)
    
  }
  async encaisses({request,response,params,auth}){
    const  month = request.input('month') 
    let start= month.concat('-01')
    let end= month.concat('-31')
    let categorie=request.input('categorie')
    let subcategorie=request.input('subcategorie')
    if(subcategorie=='')
    {const data = await Database.select('*').from('encaissements').orderBy('facturation').where('user_id',auth.user.id).where('facturation','>',start).where('facturation','<',end).where('categorie',categorie).whereNull('subcategorie').where('type','payee')
    return data}
    else{
      const data1 = await Database.select('*').from('encaissements').orderBy('facturation').where('user_id',auth.user.id).where('facturation','>',start).where('facturation','<',end).where('categorie',categorie).where('subcategorie',subcategorie).where('type','payee')
    return data1
    }


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

  async sum_months({request,response,params,auth}){
    //const encaisses=await Database.select('categorie','montant','facturation').from('encaissements').orderBy('categorie').orderBy('facturation')
    const  year = request.input('year') 
     let start= year.concat('-01-01')
     let end= year.concat('-12-31')
     const data = await Database.select('categorie','subcategorie','montant','facturation').from('encaissements').where('user_id',auth.user.id).orderBy('categorie').orderBy('subcategorie').orderBy('facturation').where('facturation','>',start).where('facturation','<',end).where('type','payee')
  
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
  calcul_pie(data){
    let list=[]
    let [first]=data
    list.push(first)
    data.shift()
    for (let i of data)
    {for(let j of list)
      {if(i.categorie==j.categorie)
      {
        j.montant+=i.montant
        break
      }
      else if(j.categorie==list[list.length-1].categorie){
        list.push(i)
        break
      }}
    }
    return list
  }
  async chart_pie({request,response,params,auth}){
    const  year = request.input('year') 
     let start= year.concat('-01-01')
     let end= year.concat('-12-31')
    const encaisse=await Database.select('categorie','montant').from('encaissements').where('user_id',auth.user.id).orderBy('categorie').whereBetween('facturation',[start,end])
    let enc_pie=[]
    if(encaisse.length!=0)
    enc_pie =this.calcul_pie(encaisse)
    else enc_pie=[]
        const decaisse=await Database.select('categorie','montant').from('decaissements').where('user_id',auth.user.id).orderBy('categorie').whereBetween('facturation',[start,end])
    let dec_pie=[]
    if(decaisse.length!=0)
   dec_pie =this.calcul_pie(decaisse)
   else dec_pie=[]
    let encaisses_payes = await Database.select('id','montant','facturation').from('encaissements').where('user_id',auth.user.id).orderBy('facturation').whereBetween('facturation',[start,end]).where('type','payee')
    let decaisses_payes = await Database.select('id','montant','facturation').from('decaissements').where('user_id',auth.user.id).orderBy('facturation').where('facturation','>',start).where('facturation','<',end).where('type','payee')
    const fetch_tresorerie=await Database.select('*').from('tresorerie').where('year',year).where('user_id',auth.user.id)
    let tresorie=[]
    if(fetch_tresorerie.length!=0)
    {
     const [tresorerie]=fetch_tresorerie 
    const encaissements=this.calcul(encaisses_payes)
    const decaissements=this.calcul(decaisses_payes)
    let m=0
    for(let i=0;i<encaissements.length;i++)
    {
      let x=parseFloat(encaissements[i].montant)-parseFloat(decaissements[i].montant)
      let data={m,x}
      tresorie.push(data)
      m++
    }}
    return ({enc_pie,dec_pie,tresorie})
   
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
      subcategorie:request.input('subcategorie'),
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
  async update ({ params, request, response,auth }) {
    const data=request.only(['intitule','type','montant','tva','facturation','reglement','categorie','subcategorie','memo']);
    const encaisse=await Encaisse.find(params.id);
    encaisse.merge(data);
    await encaisse.save();
    return encaisse;
  }

  async destroy ({ params, request, response,auth }) {
    const encaisse=await Encaisse.find(params.id);
await encaisse.delete();
  }
}

module.exports = PostController
