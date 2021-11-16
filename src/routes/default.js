import { Router } from "express";
import { PostModel } from "../models/Post.js";

const defaultRouter = new Router()

defaultRouter.route('/')
    .get((req, res) => {
    PostModel.find().then((post) => {
        res.render('home', {post: post})
    })
    .post((req, res) => {
        
    })
})


export { defaultRouter }