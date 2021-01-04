const request = require('request')


const forecast=(latitude,longitude,callback)=>
{
 const url='http://api.weatherstack.com/current?access_key=9398a72bc98f0c836077c4c1ba4b5c4c&query='+latitude+','+longitude+'&units=f'

  request({url,json:true},(error,{body})=>
  {
     if(error)
     {
         callback('Unable to connect to server!',undefined)
     }
     else if(body.error)
     {
        callback('Unable to find location!',undefined)
     }
     else{
         callback(undefined,body.current.weather_descriptions[0]+ ' and place is '+body.location.region)
     }
  })
}

module.exports=forecast