"use strict";

const navList = document.querySelector(".nav-list")
const nav = document.querySelector(".nav")
const xmark = document.querySelector(".fa-xmark")
const bars = document.querySelector(".fa-bars")
const logout = document.querySelector(".logout")

let objData = {}

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
let select_to_box = document.querySelector(".select-to_box")
let rate_value = 0
let rate_left_country_name = false

// ----- API ----- 


function dataAPI(item) {
    fetch(`https://api.exchangerate.host/latest?base=${item ? item : 'EUR'}`)
        .then(response => response.json())
        .then(data => {
            renderingRate(data, selectBox)
        })
        .catch(err => console.log("xatolik", err))
}

dataAPI()


// rendering rate

let rate_left = document.querySelector(".rate-left")

function renderingRate(data, htmlElement) {

    for (let key in data.rates) {
        let option = document.createElement("option")
        option.textContent = key
        option.setAttribute("class", "valyuta")
        option.setAttribute("value", key)
        htmlElement.appendChild(option)
    }


    selectBox.addEventListener("change", function (e) {
        dataAPI(e.target.value)
        if(rate_value > 0){
            renderingRateRight(data, select_to_box, rate_value)
            document.querySelector(".rate-right").textContent = data.rates[rate_left_country_name] * rate_value + " " + e.target.value
            console.log(rate_value);
        }
    })

    rate_left.addEventListener("change", function (e) {
        e.preventDefault()
        rate_value = e.target.value
        renderingRateRight(data, select_to_box, rate_value)
    })
}

function renderingRateRight(data, htmlElement, moneyValue) {
    for (let key in data.rates) {
        let option = document.createElement("option")
        option.textContent = key
        option.setAttribute("class", "valyuta")
        option.setAttribute("value", key)
        htmlElement.appendChild(option)
    }   

    htmlElement.addEventListener("change", function (e) {
        rate_left_country_name = e.target.value
        document.querySelector(".rate-right").textContent = data.rates[rate_left_country_name] * moneyValue + " " + e.target.value
    })  
}

