import axios from "axios";
import { apiURL } from "./App";

function validateStatus(status) {
    return (status >= 200 && status < 300) || (status >= 400 && status < 500); 
}

export async function getUserInfo(token) {
    const url = new URL(apiURL)
    url.pathname = "/users/info"

    const res = await axios.get(url.toString(), {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        validateStatus: validateStatus
    })
    return res
}

export async function getUserToken(username, password) {
    const url = new URL(apiURL)
    url.pathname = "/users/auth"

    const res = await axios.post(url.toString(), {
        username: username,
        password: password
    },{
        validateStatus: validateStatus
    })
    
    return res
}

export async function postNewUser(username, password, name) {
    const url = new URL(apiURL)
    url.pathname = "/users/create"
    
    const res = await axios.post(url.toString(), {
        username: username,
        password: password,
        name: name
    },{
        validateStatus: validateStatus
    })
    
    return res
}

export async function getAllCards(limit) {
    const url = new URL(apiURL)
    url.pathname = "/cards/getall"
    
    const res = await axios.get(url.toString(), {params: {limit: limit || -1}})
    
    return res
}

export async function openPack() {
    const url = new URL(apiURL)
    url.pathname = "/cards/openpack"
    
    return await axios.get(url.toString())
}