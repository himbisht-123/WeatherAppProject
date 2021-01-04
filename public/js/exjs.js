// const { response } = require("express");
// const {response}=require('geocode');

console.log('We are accessing the server here!!')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>
// {
//     response.json().then((data)=>
//     {
//       console.log(data);
//     })
// })

const weatherform=document.querySelector('form');
const search=document.querySelector('input');
const message1=document.querySelector('#message-1');
const message2=document.querySelector('#message-2');

weatherform.addEventListener('submit',(e)=>
{
   e.preventDefault();

    const location=search.value;
    message1.textContent='Loading...'
    message2.textContent=''
    
    fetch('/weather?address=' +location).then((response)=>
    {
       response.json().then((data)=>
       {
           if(data.error)
           {
               message1.textContent=data.error;
           }
           else{

              message1.textContent=data.location;
              message1.textContent=data.forecast;
              
        //    console.log(data.location)
        //    console.log(data.forecast)
        }
       })   
    })
        
})
