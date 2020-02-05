const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/cac9705acd8399c07bc31ec62723fd43/' + latitude + ',' + longitude + '?lang=ru'

    request( { url, json: true } ,(error, { body }) => {

        if(error) {
            callback('Unable to connect to forecast services', undefined)
        } else if (body.error) {
            callback('Something wrong with the request', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} На улице сейчас ${Math.round((body.currently.temperature -32) * (5/9))}°C. Вероятность дождя составляет ${body.currently.precipProbability * 100}%`)
        }
    })

}

module.exports = forecast