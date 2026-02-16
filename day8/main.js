// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 버튼을 누름
// 만약 유저가 랜덤번호를 맞히면, 맞혔습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호가 > 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회 안 깎임.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회 안 깎임.

let randomNum = 0;
let userInput = document.getElementById("user-input");
let playBtn = document.getElementById("play-btn");
let resultArea = document.getElementById("result-area");
let resetBtn = document.getElementById("reset-btn");
let chances = 3;
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let history = [];
let guessArea = document.getElementById("guess-area");
let span = document.querySelector("#chance-area span");
let answer = document.getElementById("answer");

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = "";
});


// 랜덤번호 지정
function pickRandomNum() {
    randomNum = Math.floor(Math.random() * 100 + 1);
    console.log("정답", randomNum);

    answer.textContent = `정답 : ${randomNum}`;
}

pickRandomNum();

// 숫자 입력
function play() {
    let userNum = userInput.value;
    
    if(userNum == "") {
        resultArea.textContent = "숫자를 입력해주세요";
        return;
    } else if(userNum < 1 || userNum > 100) {
        resultArea.textContent = "1부터 100 사이의 숫자만 입력해주세요.";
        return;
    }
    
    
    for(let i = 0; i < history.length; i++) {
        
        if(userNum == history[i]) {
            resultArea.textContent = "이미 입력한 숫자입니다";
            return;
        }
    }
    
    history.push(userNum);
    console.log(history);
    
    guessArea.textContent = history;

    chances--;
    span.textContent = `${chances}`;
    console.log(chances);
    span.style.fontWeight="bold";
    
    if(chances == 1) {
        span.style.color="red";
    }

    if(guessArea) {
        guessArea.style.padding = "8px";
    }
    
    if(userNum < randomNum) {
        resultArea.textContent = "Up!";
    } else if(userNum > randomNum) {
        resultArea.textContent = "Down!";
    } else {
        resultArea.textContent = "정답입니다!";
        gameOver = true;
    }
    
    if(chances < 1) {
        gameOver = true;
    }

    if(gameOver) {
        playBtn.disabled = true;

        if(confirm(`정답 ${randomNum}\n게임을 계속하시겠습니까?`)) {
            reset();
        }
    }

}


function reset() {
    resultArea.textContent = "힌트";
    userInput.value = "";
    pickRandomNum();
    playBtn.disabled = false;
    gameOver = false;
    chances = 3;
    span.textContent = `${chances}`;
    span.style.color="black"
    guessArea.textContent = "";
    history = [];
    guessArea.style.padding = "20px";
}


