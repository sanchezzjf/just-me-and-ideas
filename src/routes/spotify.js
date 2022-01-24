import { Router } from 'express';
import request from 'request';
import { stringify } from 'querystring';

const spotRouter = new Router()

const client_id = 'a6f38dc284164f9089f1f25b9c077b27'
const scope = 'user-read-private user-read-email'
const redirect_uri = 'https://sanchezzjf.tk/spotify/auth'
const client_secret = process.env.CLIENT_SECRET

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
    const code = req.query.code || null
    const state = req.query.state || null

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
        },
        headers: {
            'Authorization': 'Basic' + (new Buffer(client_id + ':'+ client_secret).toString('base64'))
        },
        json: true
    }
    
    request.post(authOptions, (err, res, body) => {
        if(!err && res.statusCode === 200){
            const access_token = body.access_token
            const refresh_token = body.refresh_token

            const options = {
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer' + access_token,
                },
                json: true
            }
        }
        request.get(options, function(err, res, body) {
            console.log(body);
        })

        res.redirect('/spotify' + stringify({
            access_token: access_token,
            refresh_token: refresh_token
        }))
    })
})

export { spotRouter } 