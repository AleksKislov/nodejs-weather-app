const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aleks Kislov',
        script: '/js/app.js'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the App',
        name: 'Aleks Kislov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aleks Kislov'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: "You must provide the address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send( { error })
        } 
    
        forecast(latitude, longitude, (err, forecastData) => {
            if(err) {
                return res.send({ err })
            }
    
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: 'Help / 404',
        msg: 'Help article not found',
        name: 'Aleks Kislov'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        msg: 'This page not found',
        name: 'Aleks Kislov'
    })
})


//start server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})