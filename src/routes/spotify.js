import { Router } from 'express';
import { stringify } from 'querystring';
import { logger } from '../util/logger.js';

const spotRouter = new Router()

const params = {
    client_id: process.env.CLIENT_ID
}

spotRouter.get('/', (req, res) => {
    logger.info(`env: ${procces.env}`)
    res.render('spotify/spotHome', {params: params})
})

export { spotRouter } 