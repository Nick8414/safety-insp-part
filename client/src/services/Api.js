import axios from 'axios'
import config from '../../../config.json'

export default () => {
    return axios.create({
        baseURL: config.serverURL,
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }
    })
}
