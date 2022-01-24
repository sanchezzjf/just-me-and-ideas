import { Router } from "express";
import { PostModel } from "../models/Post.js";

const defaultRouter = new Router()

defaultRouter.route('/')
    .get((req, res, next) => {
    PostModel.find().then((post) => {
        res.render('home', {post: post})
        })
    })
    .post((req, res, next) => {

    }) 

export { defaultRouter }