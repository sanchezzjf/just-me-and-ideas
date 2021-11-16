import { Router } from "express";
import { PostModel } from "../models/Post.js";

const defaultRouter = new Router()

defaultRouter.route('/')
.get((req, res, next) => {
        res.render('home')
    /* PostModel.find().then((post) => {
    }) */
    .post((req, res) => {

    })
})


export { defaultRouter }