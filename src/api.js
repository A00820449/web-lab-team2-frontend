import axios from "axios";
import { apiURL } from "./App";

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
    })
    
    return res
}