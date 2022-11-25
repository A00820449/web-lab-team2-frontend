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
        }
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

export async function openPack(token) {
    const url = new URL(apiURL)
    url.pathname = "/cards/openpack"
    
    const res = await axios.post(url.toString(),{}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res
}

export async function getCollection(token) {
    const url = new URL(apiURL)
    url.pathname = "/cards/cardcol"

    const res = await axios({
        method: "GET",
        url: url.toString(),
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return res
}

export async function getNextPack() {
    const url = new URL(apiURL)
    url.pathname = "/cards/nextpack"

    const res = await axios({
        url: url.toString(),
        method: "GET"
    })

    return res.data
}

export async function postClaimPack(token) {
    const url = new URL(apiURL)
    url.pathname = "/cards/claimpack"

    const res = await axios({
        url: url.toString(),
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return res.data
}