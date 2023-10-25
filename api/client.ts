import axios from "axios";

export const API = axios.create({
    baseURL: 'https://www.alphavantage.co/query'
})