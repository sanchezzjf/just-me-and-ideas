import { Router } from 'express';

const spotRouter = new Router()

spotRouter.get('/', (req, res) => {
    res.render('spotify/spotHome')
})

export { spotRouter } 