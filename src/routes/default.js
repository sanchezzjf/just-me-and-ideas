import { Router } from "express";
import { PostModel } from "../models/Post";

const defaultRouter = new Router()

defaultRouter.get('/', (req, res) => {
    PostModel.find().then((post) => {
        res.render('home', {post: post})
    })
})

export { defaultRouter }