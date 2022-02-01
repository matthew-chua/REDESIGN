import axios from "axios";
import { useState } from "react";



const APIHook = async (method, route, body) => {
    
    const baseURL = 'https://stormy-stream-68782.herokuapp.com'

    let res;

    try{
        
        if (method === 'GET'){
            res = await axios.get(`${baseURL}/${route}`)
        }else if (method === 'POST'){
            res = await axios.post(`${baseURL}/${route}`, body)
        }else if (method === 'PUT'){
            res = await axios.put(`${baseURL}/${route}`, body)
        }        

        return res;
    } catch (err) {
        
        console.log("ERROR", err);
    }
}

export default APIHook;