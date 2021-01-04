const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const geocode=require('./Utils/geocode')
const forecast=require('./Utils/forecast')
const port=process.env.PORT || 3000;
//define paths for express config//
const pathdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../template/views')
const partialspath=path.join(__dirname,'../template/partials')

//setup handlers engine and view locations//
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve//
app.use(express.static(pathdir))
// app.get('',(req,res)=>
// {
//   res.send('Hello Express!!')
// })

// app.get('/help',(req,res)=>
// {
//   res.send('<h1>Hello Express</h1>')
// })
// app.get('/about',(req,res)=>
// {
// res.send(
//     {
//         name:'Himanshu',
//         age:20
//     }
// )
// })

app.get('',(req,res)=>
{
    res.render('index',{
        title:'Himanshu',
        name:'Coolboy',
        age:22
    })
})
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address!'
        })
    }
    

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
        if(error)
        {
             return res.send({error})
        }
       forecast(latitude,longitude,(error,forecastdata)=>
       {
           if(error){
               return res.send({error})
           }
           res.send({
               forecast:forecastdata,
               location,
               address:req.query.address
           })
       })  
 
    })


    //  res.send({
    // forecast:'It is Snowing',
    // location:'NewYork',
    // address: req.query.address
//})
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'King',
        name:'Harshad mehta',
        age:22
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'Mr.Perfect',
        name:'Rajat',
        Age:'22'
    })
})
app.get('/product',(req,res)=>
{
   
   res.send({
           product:'product is found'
       })
})
app.get('/help/*',(req,res)=>
{
    res.render('404 Error',{
        title:'XYZ',
        errormessage:'404 not found'
    })
})
app.get('*',(req,res)=>
{
res.render('404',{
    title:'XYZ',
    errormessage:'404 not found'
})
})




app.listen(port,()=>
{
    console.log('Server is on port 3000.'+port);
})