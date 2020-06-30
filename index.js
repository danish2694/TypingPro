const API_URL = 'https://api.quotable.io/random'
const displayQuote = document.getElementById('quote')
const quoteInput = document.getElementById('quoteInput')
const timer = document.getElementById('timer')

quoteInput.addEventListener('input', () => { 
  const quoteArray = displayQuote.querySelectorAll('span')
  const valueArray = quoteInput.value.split('')

  let correct = true

  quoteArray.forEach((charSpan, index) => {
    const character = valueArray[index]

    if (character == null) {
      charSpan.classList.remove('correct')
      charSpan.classList.remove('incorrect')
      correct = false

    } else if (character === charSpan.innerText) {
      charSpan.classList.add('correct')
      charSpan.classList.remove('incorrect')

    } else {
      charSpan.classList.remove('correct')
      charSpan.classList.add('incorrect')
      correct = false

    }
})
if (correct) newQuote()
  
})


function getQuote() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function newQuote() {
  const quote = await getQuote()
  displayQuote.innerText=''
  quote.split('').forEach(character => {
    const charSpan = document.createElement('span')
    charSpan.innerText = character
    displayQuote.appendChild(charSpan)
  })
  quoteInput.value= null
  startTimer()
}


let startTime
function startTimer() {
  timer.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()+" sec"
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}


newQuote()