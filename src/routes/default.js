import { Router } from "express";

const defaultRouter = new Router()

defaultRouter.get('/', (req, res) => {
    res.render('home')
})

export { defaultRouter }