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

const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'error',
  transports: [
    new winston.transports.Console(),
  ]
});

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

  // API Routes
  server.get('/api/healthcheck', (req, res) => {
    res.status(200).send('Ok')
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
      logger.error(`[Axios Error - /api/tournaments]: ${error}`)
    })
  })

   server.get('/api/matches', (req, res) => {
    const tournamentId = req.query.tournamentId
    const token = req.headers.authorization

    axiosInstance.get(`tournaments/${ tournamentId }/matches`, {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      res.status(200).send(response.data)
    }).catch(error => {
      logger.error(`[Axios Error - /api/matches]: ${error}`)
    })
  })

  server.get('/api/match', (req, res) => {
    const id = req.query.id
    const token = req.headers.authorization

    axiosInstance.get(`lol/matches?filter[id]=${id}`, {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      res.status(200).send(response.data)
    }).catch(error => {
      logger.error(`[Axios Error - /api/match]: ${error}`)
    })
  })

  server.get('/api/players', (req, res) => {
    const teamId = req.query.teamId
    const token = req.headers.authorization

    axiosInstance.get(`lol/series/1605/players?filter[team_id]=${teamId}&sort=role`, {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      res.status(200).send(response.data)
    }).catch(error => {
      logger.error(`[Axios Error - /api/players]: ${error}`)
    })
  })

  server.get('/api/games', (req, res) => {
    const id = req.query.id
    const token = req.headers.authorization

    axiosInstance.get(`lol/matches/${id}/games`, {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      res.status(200).send(response.data)
    }).catch(error => {
      logger.error(`[Axios Error - /api/games]: ${error}`)
    })
  })

  // Get *
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.APP_PORT, (err) => {
    if (err) { throw err }
    // tslint:disable-next-line
    console.log(`> Ready on ${process.env.APP_IP}:${process.env.APP_PORT}`)
  })
})
.catch((ex) => {
  // tslint:disable-next-line
  console.error(ex.stack)
  process.exit(1)
})
