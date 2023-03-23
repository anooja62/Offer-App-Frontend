import axios from 'axios'


const instance = axios.create({
    baseURL : 'https://offer-create-app-api.onrender.com',
})


export default  instance