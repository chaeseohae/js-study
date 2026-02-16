// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 버튼을 누름
// 만약 유저가 랜덤번호를 맞히면, 맞혔습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호가 > 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회 안 깎임.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회 안 깎임.


let computerNum = 0;
let playBtn = document.getElementById("play-btn");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetBtn = document.getElementById("reset-btn");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];


playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = ""
});


function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100 + 1);
    console.log("정답", computerNum);
}

function play() {
    let userVal = userInput.value;

    if(userVal < 1 || userVal > 100) {
        resultArea.textContent = "1과 100 사이의 숫자만 입력해 주세요."

        return;
    }

    console.log(history);
    if(history.includes(userVal)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주새요";
        return;
    }

    chances--;
    chanceArea.textContent = `남은 기회 : ${chances}번`;
    
    
    if(userVal < computerNum) {
        resultArea.textContent = "Up!"
    } else if(userVal > computerNum) {
        resultArea.textContent = "Down!"
    } else {
        resultArea.textContent = "정답입니다!"
        gameOver = true;
    }

    history.push(userVal);

    if(chances < 1) {
        gameOver = true;
    }
    
    if(gameOver == true) {
        playBtn.disabled = true;
    }


}

function reset() {
    userInput.value = "";
    pickRandomNum();
    resultArea.textContent = "결과창";
    gameOver = false;
    playBtn.disabled = false;
    chances = 5;
    chanceArea.textContent = `남은기회 : ${chances}번`;
}

pickRandomNum();






















