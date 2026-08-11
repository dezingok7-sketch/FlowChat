import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {

    apiKey:
        "AIzaSyB9GXaJJNvKBLrrelcvNYUdVs3OZM539SM",

    authDomain:
        "flowchat-b9791.firebaseapp.com",

    databaseURL:
        "https://flowchat-b9791-default-rtdb.firebaseio.com",

    projectId:
        "flowchat-b9791",

    storageBucket:
        "flowchat-b9791.firebasestorage.app",

    messagingSenderId:
        "1012194532616",

    appId:
        "1:1012194532616:web:5006856bc30de68814e0bd",

    measurementId:
        "G-0GBP7M5VGD"

};


const app =
    initializeApp(
        firebaseConfig
    );


export const auth =
    getAuth(app);


export const db =
    getDatabase(app);