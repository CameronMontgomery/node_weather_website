const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=770d3f758f499d4a30a04ffdab99a70f&query=${latitude},${longitude}&units=f`

  request({ url, json:true }, (error, { body }) => {    // changed to use object destructuring originally was response.body and following body was response.body
    if (error) {
      callback('Unable to connect to weather services', undefined)
    } else if (body.error) {
      callback(`Weather search failed. (Error: ${body.error.type})`, undefined)
    } else {
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const weatherDescription = body.current.weather_descriptions[0];

      callback(undefined, `${weatherDescription}. The temperature is ${temperature}°, and it feels like ${feelsLike}°.`)
    }
  })
}

module.exports = forecast;