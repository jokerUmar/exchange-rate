"use strict";

const navList = document.querySelector(".nav-list")
const nav = document.querySelector(".nav")
const xmark = document.querySelector(".fa-xmark")
const bars = document.querySelector(".fa-bars")
const logout = document.querySelector(".logout")



bars.addEventListener("click" , function(e){
    xmark.style.visibility = "visible"
    bars.style.visibility = "hidden"
    nav.classList.remove("nav-none")
    nav.classList.add("modal-nav")
})
xmark.addEventListener("click" , function(e){
    xmark.style.visibility = "hidden"
    bars.style.visibility = "visible"
    nav.classList.remove("modal-nav")
    nav.classList.add("nav-none")
})

const token = window.localStorage.getItem("token")

logout.addEventListener("click" , function(e){
    window.localStorage.removeItem("token")
        window.location.replace("index.html")
}) 





