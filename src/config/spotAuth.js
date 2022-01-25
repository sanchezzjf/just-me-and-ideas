import axios from 'axios';

const sendAuthOptions = async (code, redirect_uri, auth) =>{

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method:'POST',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
        },
        headers: {
            'Authorization': 'Basic' + `${new ReadableStream(auth)}`
        },
        json: true
    }
    axios.post(authOptions, (err, res, body) => {
        console.log(res.body)
    })
}

export { sendAuthOptions }