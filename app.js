let words = {}
let count = 0

let wordCount = document.querySelector('#wordCount')

let ques = document.querySelector("#ques")

let opt1 = document.querySelector('#opt1')
let opt2 = document.querySelector('#opt2')
let opt3 = document.querySelector('#opt3')
let opt4 = document.querySelector('#opt4')

let optns = [opt1, opt2, opt3, opt4]

const addWord = (inputValue, words) => {
    let keyVal = inputValue.split("-")
    let key = keyVal[0].trim()
    let val = keyVal[1]

    let valArr = []

    if (val.indexOf(',') === -1) {
        valArr = val.trim()
    }
    else {
        valArr = val.trim().split(",")
    }

    words[key] = valArr
    return words
}

const resetAll = () => {
    words = {}
    let input = document.querySelector('#inputValue')
    input.value = ""
    count = 0
    wordCount.innerText = `(Total: ${count})`
    let optBtns = document.querySelectorAll('.optbtn')
    for (optBtn of optBtns) {
        optBtn.className = "btn optbtn"
    }
}

let nextBtn = document.querySelector('#next-btn')
nextBtn.addEventListener('click', function (e) {
    e.preventDefault()

    let input = document.querySelector('#inputValue')
    words = addWord(input.value, words)

    input.value = ""
    wordCount.innerText = `(Total: ${++count})`
})

let resetBtn = document.querySelector('#reset-btn')
resetBtn.addEventListener('click', function (e) {
    e.preventDefault()
    resetAll()
})

let startBtn = document.querySelector('#start-btn')
startBtn.addEventListener('click', function (e) {
    e.preventDefault()
    
    startQuiz()
})

const startQuiz = () => {

    let keys = Object.keys(words);
    let randKey = keys[Math.floor(Math.random() * keys.length)];
    let randOption = optns[Math.floor(Math.random() * 4)]

    ques.innerText = `${randKey}`
    randOption.innerText = `${words[randKey]}`
    
}