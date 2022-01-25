import axios from 'axios';

const url = 'https://accounts.spotify.com/api/token'

const getAccessToken = (url, authOptions, client_id, client_secret) => {
    return axios.post(url,authOptions, {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer(client_id + ':'+ client_secret).toString('base64'))
        },
    }).then(res => res.data)
}

export { getAccessToken }