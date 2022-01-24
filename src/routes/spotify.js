import { Router } from 'express';
import { stringify } from 'querystring';
import { logger } from '../util/logger.js';

const spotRouter = new Router()

const params = {
    client_id: process.env.CLIENT_ID
}

spotRouter.get('/', (req, res) => {
    res.render('spotify/spotHome', params)
})

export { spotRouter } 