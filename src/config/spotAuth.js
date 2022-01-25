import http from 'http';

const sendAuthOptions = async (code) =>{

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method:'POST',
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
    http.request(authOptions, (err, res, body) => {
        console.log(req.body)
    })
}

export { sendAuthOptions }