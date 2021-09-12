const banner = document.querySelector('.banner');
const input = document.querySelector('.input');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');

const currentStage = document.querySelector('.stage')
const strikes = document.querySelector('.strike')
const balls = document.querySelector('.ball')
const outs = document.querySelector('.out')
const homeruns = document.querySelector('.homerun')
const userNumber = document.querySelector('.usernum')

const regexNum = /\d/g;

let started = false;

let numbers;
let answer;
let userNum;

let stage = 0;
let strike = 0;
let ball = 0;
let out = 0;
let homeRun = 0;

startBtn.addEventListener('click', () => {
    input.style.visibility = 'visible';
    hideStartBtn();
    answer = makeDigit();
    console.log(`The answer is: ${answer}`);
})

resetBtn.addEventListener('click', () => {
    hideResetBtn();
    showStartBtn();
    reset();
})

input.addEventListener('keypress', paperBaseBall) 

function paperBaseBall(event) {
    started = true;  
    onPressEnter(event);
    scoring();
}

function showStatus() {
    currentStage.innerHTML = `<span>Chances:</span> ${10 - stage}`;
    strikes.innerHTML = `<span>Strike:</span> ${strike}`;
    balls.innerHTML = `<span>ball:</span> ${ball}`;
    homeruns.innerHTML = `<span>Homerun:</span> ${homeRun}`;
    userNumber.innerHTML += `   ${numbers}`;
    outs.innerHTML = `<span>Out:</span> ${out}`;
}

function onPressEnter(event) {
    if (event.keyCode == 13) { // if press enter
        numbers = input.value.split('')
        const result = numbers.every(checkNumbers);
        input.value = '';
        if (!result) {
            alert('Only a 3-digit number is allowed.')
        } else if (result && numbers.length === 3 && numbers[0] !== numbers[1] && numbers[0] !== numbers[2] && numbers[1] !== numbers[2]) {
            userNum = numbers;
            gameProcess();  
            stage++;
            showStatus();
        } else {
            alert('Submit a full 3-digit number. Each numerical digit must be all different.')
        }
    } 
};

function gameProcess() {
    const answerArray = answer.toString().split('');
    if (JSON.stringify(answerArray) === JSON.stringify(numbers)) {
        homeRun++;
    }

    if(answerArray[0] === numbers[0]) {
        return strike++;
    } else if (answerArray[1] === numbers[1]) {
        return strike++;
    } else if (answerArray[2] === numbers[2]) {
        return strike++;
    }
    
    if (answerArray[0] === numbers[1] || answerArray[0] === numbers[2]) {
        return ball++;
    } else if (answerArray[1] === numbers[0] || answerArray[1] === numbers[2]) {
        return ball++;
    } else if (answerArray[2] === numbers[0] || answerArray[2] === numbers[1]) {
        return ball++;
    } else {
        return out++;
    }
}

function checkNumbers(num) {
    return num.match(regexNum);
}

function scoring() {
    if (homeRun === 1) {
        endGame();
    }
    if (out === 3) {
        endGame();
    }
    if (stage === 10) {
        endGame();
    }
    if (strike === 3) {
        strike = 0;
        out++;
    }
    if (ball === 4) {
        ball = 0;
        out++;
    }
}

function endGame() {
    started = false;
    if (homeRun === 1) {
        input.style.visibility = 'hidden';
        homeruns.textContent = 'CONGRATULATION!!! Your prediction is RIGHT!'
    }
    else {
        input.style.visibility = 'hidden';
        homeruns.textContent = 'FAILED// You did not make it.'
    }
    showResetBtn();
    hideStartBtn();
}

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function makeDigit() {
    let answer = [];
    let i = 0;
    while(i < 3) {
        let number = Math.floor(Math.random() * 9);
        if(!findSame(number) && answer.indexOf(number) < 0) {
            answer.push(number);
            i++;
        }
    }
    function findSame(number) {
        return answer.find((element) => (element === number));
    }
    return answer.join('');
}

function reset() {
    stage = 0;
    strike = 0;
    ball = 0;
    out = 0;
    homeRun = 0;
    showStatus();
    hideStartBtn();
    userNumber.innerText = '';
    input.style.visibility = 'visible';
    answer = makeDigit();
    console.log(`The answer is: ${answer}`);
}

function showResetBtn() {
    resetBtn.style.visibility = 'visible';
}

function hideResetBtn() {
    resetBtn.style.visibility = 'hidden';
}

function showStartBtn() {
    startBtn.style.visibility = 'visible';
}

function hideStartBtn(){
    startBtn.style.visibility = 'hidden';
}

