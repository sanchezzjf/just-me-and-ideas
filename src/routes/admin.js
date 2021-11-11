import { Router } from 'express';

const adminRouter = new Router()

adminRouter.get('/', (req, res) => {
    res.render('admin/adminPanel')
})

adminRouter.route('/add')
    .get((req, res, next) => {
        res.render('admin/addPostForm')
    })
    .post((req, res, next) => {
        const post = {
            title: req.body.title,
            icon: req.body.icon,
            description: req.body.description,
            body: req.body.body
        }

        /* Database communication */
    })

adminRouter.route('/edit/:id')
    .get((req, res, next) => {
        /* database.find(id) */
        res.render('admin/editPostForm')

        
    })
    .post((req, res, next) => {
        /* database communication */
    })


export { adminRouter }