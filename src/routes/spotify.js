import { Router } from 'express';
import { stringify } from 'querystring';
import { getAccessToken } from '../helpers/spotAuth.js';
import { get_current_user } from '../helpers/user.js';
import { logger } from '../util/logger.js';

const spotRouter = new Router()

const client_id = process.env.CLIENT_ID
const scope = 'user-read-private user-read-email'
const redirect_uri = process.env.REDIRECT_URI
const client_secret = process.env.CLIENT_SECRET

spotRouter.get('/', (req, res, next) => {
    if(req.cookies.access_token){
        const access_token = req.cookies.access_token
        res.render('spotify/spotHome', { access_token: access_token })
    }
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
            
            const code = req.query.code || null
            const state = req.query.state || null
        
            const authOptions = new URLSearchParams()
            authOptions.append('code',`${code}`)
            authOptions.append('redirect_uri',`${redirect_uri}`)
            authOptions.append('grant_type',`authorization_code`)
            authOptions.append('json',`true`)
            
            getAccessToken(authOptions, client_id, client_secret).then((data) => {
                //logger.info(`${data.access_token}`)
                const access_token = data.access_token
                const refresh_token = data.refresh_token
                const expires_in = data.expires_in
                if(access_token){
                    res.cookie('access_token', access_token, {
                        maxAge: expires_in
                    })
                    res.cookie('refresh_token', refresh_token, {
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: true 
                    })
                    res.redirect('/spotify')
                }
                //logger.info(`access: ${access_token}\n refresh: ${refresh_token}`)
            })
            //sendAuthOptions(code, redirect_uri, auth)
        })
        

spotRouter.post('/users/:command', (req, res) => {
    logger.info(`${req.params.command}, ${req.body.access_token}`)
    if(req.params.get_current_user){
        get_current_user(req.body.access_token).then((data) => {
            console.log(data)
        })

    }
})
    



export { spotRouter } 