const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views') // How to customize views location
const partialsPath = path.join(__dirname, '../templates/partials') // path to the partials dir

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath) // Config Express to know where views are stored
hbs.registerPartials(partialsPath) // config handlebars to use partial location


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Cameron Montgomery'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Cameron Montgomery'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is the help message!',
    title: 'Help',
    name: 'Cameron Montgomery'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    })
  } 

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
        }
          
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })
    })          
  })
})



app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
        error: 'You must provide a search term'
      })
  }

  console.log(req.query)
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'The help article was not found, Please try again',
    title: '404: Help',
    name: 'Cameron Montgomery'
  })
})

// This is to set up a 404 page to handle any route we have not set up, it uses the * wildcard to specify all routes not explicitly set up
app.get('*', (req, res) => {
  res.render('404', {
    error: '404: Page not Found',
    title: '404 Error',
    name: 'Cameron Montgomery'
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})