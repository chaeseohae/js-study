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

playBtn.addEventListener("click", play);


function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100 + 1);
    console.log("정답", computerNum);
}

function play() {
    let userVal = userInput.value;

    if(userVal < computerNum) {
        resultArea.textContent = "Up!"
    } else if(userVal > computerNum) {
        resultArea.textContent = "Down!"
    } else {
        resultArea.textContent = "정답입니다!"
    }

}


pickRandomNum();






















