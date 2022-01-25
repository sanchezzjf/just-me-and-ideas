import { Router } from 'express';
import { stringify } from 'querystring';
import { sendAuthOptions } from '../config/spotAuth.js';
import { logger } from '../util/logger.js';
import axios from 'axios';

const spotRouter = new Router()

const client_id = process.env.CLIENT_ID
const scope = 'user-read-private user-read-email'
const redirect_uri = process.env.REDIRECT_URI
const client_secret = process.env.CLIENT_SECRET


spotRouter.get('/', (req, res, next) => {
    res.render('spotify/spotHome')
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

            //sendAuthOptions(code, redirect_uri, auth)
            const code = req.query.code || null
            const state = req.query.state || null
            const url = 'https://accounts.spotify.com/api/token'
        
            const authOptions = new URLSearchParams()
            authOptions.append('code',`${code}`)
            authOptions.append('redirect_uri',`${redirect_uri}`)
            authOptions.append('grant_type',`authorization_code`)
            authOptions.append('json',`true`)
            
            /* {
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code',
                },
                json: true
            } */
            res.send(`${code}, ${state}`)
            axios.post(url,authOptions, {
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (Buffer(client_id + ':'+ client_secret).toString('base64'))
                },
            }, (err, res, body) => {
                logger.error(`err: ${err}`)
                res.send(`${body}`)
            }).then((res) => {
                logger.info(`${res.query}, ${res.body}, ${res.params}`)
            }).catch((err) => {
                logger.error(`err: ${err}`)
            })
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
            logger.info(`code: ${code}`)
            logger.info(`state ${state}`)
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