import { Router } from 'express';
import { stringify } from 'querystring';

const spotRouter = new Router()

spotRouter.get('/', (req, res) => {
    res.render('spotify/spotHome')
})

export { spotRouter } 