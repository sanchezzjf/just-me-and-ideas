import { Router } from 'express';
import { stringify } from 'querystring';

const spotRouter = new Router()

const client_id = process.env.CLIENT_ID
const scope = 'user-read-private user-read-email'
const redirect_uri = process.env.REDIRECT_URI

spotRouter.get('/', (req, res) => {
    res.render('spotify/spotHome')
})

spotRouter.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + 
        stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        }))
})

spotRouter.get('/auth', (req, res) => {

})

export { spotRouter } 