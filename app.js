const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen')

const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const levelList = document.querySelector('#level-list')

let score = 0
let time = 0
let level = 0
let intervalId

const levels = [
  {
    level: 1,
    num1: 70,
    num2: 70,
  },
  {
    level: 2,
    num1: 30,
    num2: 30,
  },
  {
    level: 3,
    num1: 13,
    num2: 13,
  },
]

const colors = [
  '#f94144',
  '#f3722c',
  '#f8961e',
  '#f9844a',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#4d908e',
  '#577590',
  '#277da1',
]

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    screens[1].classList.add('up')
    time = +event.target.getAttribute('data-time')
  }
})

levelList.addEventListener('click', (event) => {
  if (event.target.classList.contains('level')) {
    screens[2].classList.add('up')
    level = +event.target.getAttribute('data-level')
  }
  console.log(level)
  startGame()
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  intervalId = setInterval(decreaseTime, 1000)
  createRandomCircle()
  timeEl.parentNode.classList.remove('hide')
  setTime(time)
}

// выбираем уровень игры

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1> Your Score : <span class='primary'>${score}</span></h1>
    <div class="restart">
        One more time? <button id="restart"> Let's Go!</button>
      </div>`
  const restartBtn = document.querySelector('#restart')

  restartBtn.addEventListener('click', () => {
    board.innerHTML = ''
    screens[0].classList.remove('up')
    screens[1].classList.remove('up')
    screens[2].classList.remove('up')
  })

  clearInterval(intervalId)
}

function createRandomCircle() {
  if (level === 1) {
    createRandomCircleLevel(levels[0].num1, levels[0].num2)
  } else if (level === 2) {
    createRandomCircleLevel(levels[1].num1, levels[1].num2)
  } else if (level === 3) {
    createRandomCircleLevel(levels[2].num1, levels[2].num2)
  } else if (level === 4) {
    createRandomCircleLevel()
  }
}

function createRandomCircleLevel(num1 = 10, num2 = 70) {
  const circle = document.createElement('div')
  const size = getRandomNumber(num1, num2)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle.style.background = `${randomColor()}`

  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  board.append(circle)
}
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

//добавляем функционал randomColor

function randomColor() {
  const randomColorIndex = Math.floor(Math.random() * colors.length)
  return colors[randomColorIndex]
}
