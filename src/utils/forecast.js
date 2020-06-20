const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=39a905c63bb22ec309367eb30c49a4a9&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Could not connect to weather forecast')
        } else if (body.current.error) {
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, `The weather is ${body.current.weather_descriptions[0]}. Temperature is ${body.current.temperature}°C and wind speed is ${body.current.wind_speed}km/h`)
        }
    })
}

module.exports = forecast