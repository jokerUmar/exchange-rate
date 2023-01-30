const overlay = document.querySelector(".overlay")
const overlayContainer = document.querySelector(".overlay-conatiner")
const signBtn = document.querySelector(".signBtn")
const signInBtn = document.querySelector(".signInBtn")
const form = document.querySelector(".form")
const inputEmail = document.querySelector(".input-email")
const inputPassword = document.querySelector(".input-password")
const xmarkBtn = document.querySelector(".xmark-btn")
const box = document.querySelector(".box")
const submit = document.querySelector(".submit")

signBtn.addEventListener("click", function (e) {
    overlay.style.display = "block"
})

xmarkBtn.addEventListener("click", closeModal)

function closeModal() {
    overlay.style.display = "none"
}

window.addEventListener("click", function (e) {
    if (e.target == overlayContainer) {
        overlay.style.display = "none"
    }
})

form.addEventListener("submit", function (e) {
    e.preventDefault()

    fetch(`https://reqres.in/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: inputEmail.value,
            password:inputPassword.value
        })
    })
    .then(res=> res.json())
    .then(data => {
        if (data.token) {
            window.localStorage.setItem("token", data.token)
            window.location.replace('exchange.html')
        }else{
            alert("parol yoki user xato")
        }
    })
    
    inputEmail.value = ""
    inputPassword.value = ""
})

function signIN() {
    let x = window.localStorage.getItem("token")
    
    if (x) {
        signBtn.style.display = "none"
        signInBtn.style.display = "block"
        
        signInBtn.addEventListener("click" ,function(e){
            window.location.replace('exchange.html')
        })

    }else{
        console.log(132);
        signBtn.style.display = "block"
        signInBtn.style.display = "none"
    }
    
}
signIN()

