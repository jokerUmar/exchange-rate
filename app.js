"use strict";

const navList = document.querySelector(".nav-list")
const nav = document.querySelector(".nav")
const xmark = document.querySelector(".fa-xmark")
const bars = document.querySelector(".fa-bars")
const logout = document.querySelector(".logout")

let objData ={}

bars.addEventListener("click", function (e) {
    xmark.style.visibility = "visible"
    bars.style.visibility = "hidden"
    nav.classList.remove("nav-none")
    nav.classList.add("modal-nav")
})
xmark.addEventListener("click", function (e) {
    xmark.style.visibility = "hidden"
    bars.style.visibility = "visible"
    nav.classList.remove("modal-nav")
    nav.classList.add("nav-none")
})

const token = window.localStorage.getItem("token")

logout.addEventListener("click", function (e) {
    window.localStorage.removeItem("token")
    window.location.replace("index.html")
})


let selectBox = document.querySelector(".select-box")



// ----- API ----- 

let base;

function data() {
    fetch(`https://api.exchangerate.host/latest?base=${base ? base : 'EUR'}`)
        .then(response => response.json())
        .then(data => {
            renderingRate(data , selectBox)
        })
        .catch(err => console.log("xatolik", err))
}

data()


// rendering rate


function renderingRate(data, htmlElement) {

    console.log(data);

    for(let key in data.rates ){

        let option = document.createElement("option")
        option.textContent = key
        option.setAttribute("class" , "valyuta")
        option.setAttribute("value" , key)
        htmlElement.appendChild(option)    
    }    

    htmlElement.addEventListener("change" , function(e){
        objData = e.target.value
        optionValue(objData)
    })
    
}

function optionValue(optionData) {
    base = optionData
    return base
}




