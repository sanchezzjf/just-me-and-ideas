import { Router } from 'express';
import { stringify } from 'querystring';
import { logger } from '../util/logger.js';

const spotRouter = new Router()

const params = {
    client_id: process.env.CLIENT_ID
}

spotRouter.get('/', (req, res) => {
    res.render('spotify/spotHome', {client_id: process.env.CLIENT_ID, redirect_uri: process.env.REDIRECT_URI})
})

spotRouter.get('/auth', (req, res) => {

})

export { spotRouter } 