import axios from "axios";
import { logger } from "../util/logger.js";

const get_current_user = (access_token) => {
    axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-type': 'application/json'
        }
    }).then(res => res.data).catch(err => logger.error(err))
}

export { 
    get_current_user
}