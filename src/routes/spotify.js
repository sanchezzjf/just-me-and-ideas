import { Router } from 'express';
import { stringify } from 'querystring';
import { sendAuthOptions } from '../config/spotAuth.js';
import { logger } from '../util/logger.js';

const spotRouter = new Router()

const client_id = 'a6f38dc284164f9089f1f25b9c077b27'
const scope = 'user-read-private user-read-email'
const redirect_uri = 'https://sanchezzjf.tk/spotify/auth'
const client_secret = process.env.CLIENT_SECRET
const auth = ''

spotRouter.get('/', (req, res, next) => {
    res.render('spotify/spotHome')
    logger.info(`${client_secret}`)
})

spotRouter.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' + 
        stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: "eusoumtolegalzao"
        }))
})

spotRouter.route('/auth')
        .get((req, res) => {
            const code = req.query.code || null
            const state = req.query.state || null

            //sendAuthOptions(code, redirect_uri, auth)
        
            const authOptions = {
                method:'POST',
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code',
                },
                headers: {
                    'Authorization': 'Basic' + (client_id + ':'+ client_secret).toString('base64')
                },
                json: true
            }
            res.send(`${code}, ${state}`)
            /* http.request(authOptions, (err, res, body) => {
                if (!err && res.statusCode === 200) {

                    var access_token = body.access_token,
                        refresh_token = body.refresh_token;
            
                    var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                    }
            
                }
                
            }) */
        })
        .post((req, res, next) => {
            const code = req.query.code || null
            const state = req.query.state || null   
        })
/* 
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
        console.log(req.body)

        res.redirect('/spotify' + stringify({
            access_token: access_token,
            refresh_token: refresh_token
        })) */


export { spotRouter } 