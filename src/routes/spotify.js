import { Router } from 'express';
import { stringify } from 'querystring';
import { logger } from '../util/logger.js';

const spotRouter = new Router()

const client_id = `${process.env.CLIENT_ID}`
const redirect_uri = `${process.env.REDIRECT_URI}`

spotRouter.get('/', (req, res) => {
    console.log(process.env.REDIRECT_URI)
    res.render('spotify/spotHome', {client_id: client_id, redirect_uri: redirect_uri})
})

spotRouter.get('/auth', (req, res) => {

})

export { spotRouter } 