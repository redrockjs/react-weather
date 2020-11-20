import * as axios from "axios";

// Create ax - Axios instance
const ax = axios.create(
    {
        baseURL: process.env.REACT_APP_DB_URL,
    });

export let firebaseApi = {
    getStorageItems(uid, authToken) {
        try {
            let response = ax.get(`/fav/${uid}.json?auth=${authToken}`)
            return response
        } catch (e) {
            throw new Error(e.message)
        }
    },
    addStorageItem(uid, authToken, payload) {
        try {
            let response = ax.post(`/fav/${uid}.json?auth=${authToken}`, payload)
            return response
        } catch (e) {
            throw new Error(e.message)
        }
    },
    delStorageItem (uid, authToken, key) {
        try {
            let response = ax.delete(`/fav/${uid}/${key}.json?auth=${authToken}`)
            return response
        } catch (e) {
            throw new Error(e.message)
        }
    }
}