let words = {}
let allWords = {}
let count = Object.keys(words).length

let input = document.querySelector('#inputValue')
let wordCount = document.querySelector('#wordCount')

let ques = document.querySelector("#ques")

let optBtns = document.querySelectorAll('.optbtn')

let optBtn1 = document.querySelector('#opt1')
let optBtn2 = document.querySelector('#opt2')
let optBtn3 = document.querySelector('#opt3')
let optBtn4 = document.querySelector('#opt4')

let nextOptBtn = document.querySelector('#nextBtn')

let ansBtn, ansKey

let correct = 0
let x = 0

let scoreLabel = document.querySelector('#result')

let wrongBtn = document.querySelector('#wrongBtn')
let wrongList = document.querySelector('#wrongList')
let wrongWords = document.querySelector('#wrongWords')

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

    let keys = Object.keys(words)
    words[key] = valArr
    wordCount.innerText = `(Total: ${keys.length})`
    input.value = ""
    return words
}

const resetBtns = () => {
    for (let optBtn of optBtns) {
        optBtn.className = "btn optbtn"
        optBtn.innerText = `Word`
    }
    x = 0
}

const resetAll = () => {
    words = {}
    let input = document.querySelector('#inputValue')
    input.value = ""
    count = 0
    wordCount.innerText = `(Total: ${count})`
    ques.innerText = `THE GERMAN WORD`
    resetBtns()
    correct = 0
    scoreLabel.innerText = `Correct Words: 0 (Words Left: 0)`
}

const getKey = (element) => {
    for (const key in words) {
        const value = words[key];
        if (value === element || (Array.isArray(value) && value.includes(element)))
            return key;
    }
}

const listenForBtn = (ansBtn, ansKey) => {
    let c = 0
    let keys = Object.keys(words)
    const checkAns = function (btn, ansKey) {
        if (c === 0) {
            if (getKey(btn.innerText) !== ansKey) {
                btn.classList.add('btn-danger')
                ansBtn.classList.add('btn-success')
                addWrongWord(ansKey, words[ansKey])
            }
            else {
                btn.classList.add('btn-success')
                correct++
            }
            delete words[ansKey]
        }
        c++
        keys = Object.keys(words)
        if (keys.length === 0) {
            scoreLabel.innerText = `Correct Words: ${correct}/${count} (Words Left: ${keys.length})`
        }
    }

    optBtn1.addEventListener('click', function (e) { checkAns(optBtn1, ansKey) })
    optBtn2.addEventListener('click', function (e) { checkAns(optBtn2, ansKey) })
    optBtn3.addEventListener('click', function (e) { checkAns(optBtn3, ansKey) })
    optBtn4.addEventListener('click', function (e) { checkAns(optBtn4, ansKey) })
    scoreLabel.innerText = `Correct Words: ${correct}/${count} (Words Left: ${keys.length})`
}

const setQues = () => {
    let keys = Object.keys(words)
    ansKey = keys[Math.floor(Math.random() * keys.length)]
    let ansWord = words[ansKey]

    if (typeof ansWord === 'object') {
        let randNo = Math.floor(Math.random() * ansWord.length)
        ansWord = words[ansKey][randNo]
    }

    let btnNum = Math.floor(Math.random() * 4)
    ansBtn = optBtns[btnNum]
    ques.innerText = ansKey
    ansBtn.innerText = ansWord

    for (let btn of optBtns) {
        if (btn !== ansBtn) {
            let k = Object.keys(allWords)
            let w = allWords[k[Math.floor(Math.random() * k.length)]]
            if (typeof w === 'object') {
                let randNo = Math.floor(Math.random() * w.length)
                w = w[randNo]
            }
            btn.innerText = w
        }
    }
    return ansBtn, ansKey
}

const addWrongWord = (key, values) => {
    let word = `${key} - ${values}`
    const item = document.createElement('li')
    item.innerText = word
    wrongList.appendChild(item)
}

let nextBtn = document.querySelector('#next-btn')
nextBtn.addEventListener('click', function (e) {
    e.preventDefault()
    words = addWord(input.value, words)
})

let resetBtn = document.querySelector('#reset-btn')
resetBtn.addEventListener('click', function (e) {
    e.preventDefault()
    resetAll()
})

let startBtn = document.querySelector('#start-btn')
startBtn.addEventListener('click', function (e) {
    let input = document.querySelector('#inputValue')
    if (input.value !== "") {
        words = addWord(input.value, words)
    }
    let keys = Object.keys(words)
    if (keys.length === 0) {
        alert(`NO INPUTS ENTERED`)
        resetAll()
    }
    nextOptBtn.classList.remove('disabled')
    resetBtns()
    allWords = { ...words };
    wordCount.innerText = `(Total: ${Object.keys(allWords).length})`    
    ansBtn, ansKey = setQues()
    listenForBtn(ansBtn, ansKey)
})

nextOptBtn.addEventListener('click', function (e) {
    resetBtns()
    
    ansBtn, ansKey = setQues()
    listenForBtn(ansBtn, ansKey)

    let keys = Object.keys(words)
    if (keys.length === 1) {
        nextOptBtn.classList.add('disabled')
    }
    if (keys.length === 0) {
        alert(`NO INPUTS LEFT`)
        resetAll()
    }
})

wrongBtn.addEventListener('click', function (e) {
    if (wrongWords.style.display === "none") {
        wrongWords.style.display = "flex"
    }
    else {
        wrongWords.style.display = "none"
    }
})