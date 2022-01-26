import axios from 'axios';

const getUserInfo = (access_token, refresh_token) => {
    axios.get('https://api.spotify.com/v1/me', {}, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => res)
}