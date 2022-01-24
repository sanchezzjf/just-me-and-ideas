import { Router } from 'express';
import { stringify } from 'querystring';

const spotRouter = new Router()

const client_id = 'a6f38dc284164f9089f1f25b9c077b27'
const scope = 'user-read-private user-read-email'
const redirect_uri = 'https://sanchezzjf.tk/spotify/auth'

spotRouter.get('/', (req, res) => {
    res.render('spotify/spotHome')
})

spotRouter.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + 
        stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: redirect_uri,
        }))
})

spotRouter.get('/auth', (req, res) => {
    res.send('redirected')
})

export { spotRouter } 