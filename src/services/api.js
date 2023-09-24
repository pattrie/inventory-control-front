import axios from "axios";

export const apiUser = new axios.create({
    baseURL: 'http://localhost:8081/'
});

export const apiInventory = new axios.create({
    baseURL: 'http://localhost:8080/'
});