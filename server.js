const express = require('express')
const next = require('next')
const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helmet = require('helmet')
const hpp = require('hpp')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')
const winston = require('winston')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const axiosInstance = axios.create({
  baseURL: 'https://api.pandascore.co/',
  timeout: 100000,
  withCredentials: true,
})

app.prepare()
.then(() => {
  const server = express()

  // Common things
  server
    .use(compression())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(methodOverride())
    .use(cors())
    .set('trust proxy', 'loopback')

  // Using helmet and HPP to secure Express and prevent HTTP parameter pollution.
  server
    .use(helmet.frameguard())
    .use(helmet.xssFilter())
    .use(helmet.hidePoweredBy())
    .use(helmet.noSniff())
    .use(hpp())
    .disable('x-powered-by')

  // Use morgan for http request debug (only show error)
  server.use(morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
  }))

  // Dynamic routing
  server.get('/stage/:slug', (req, res) => {
    const actualPage = '/stage'

    const queryParams = {
      slug: req.params.slug,
    }

    app.render(req, res, actualPage, queryParams)
  })

  // API Routes
  server.get('/api/healthcheck', (req, res) => {
    res.status(404).send('Ok')
  })

  server.get('/api/tournaments', (req, res) => {
    const ids = req.query.ids
    const token = req.headers.authorization

    axiosInstance.get(`series/1605/tournaments?filter[id]=${ids}&sort=name`, {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      res.status(200).send(response.data)
    }).catch(error => {
      winston.error(error)
    })
  })

  server.get('/api/matches', (req, res) => {
    const tournamentId = req.query.tournamentId
    const token = req.headers.authorization

    axiosInstance.get(`tournaments/${tournamentId}/matches`, {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      res.status(200).send(response.data)
    }).catch(error => {
      winston.error(error)
    })
  })

  // Get *
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) { throw err }
    // tslint:disable-next-line
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  // tslint:disable-next-line
  console.error(ex.stack)
  process.exit(1)
})
