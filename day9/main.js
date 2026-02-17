// 유저가 값을 입력한다
// +버튼을 누르면 할일 추가
// delete 버튼을 누르면 할일 삭제
// check 버튼을 누르면 할일이 끝나면서 밑줄
// 진행중 끝남 탭을 누르면 언더바 이동
// 완료탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("focus", function() {
    taskInput.value = "";
});

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    
    render();
}
function render() {
    let resultHTML = "";
    for(let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task">
                            <div>${taskList[i]}</div>
                            <div>
                                <button>Check</button>
                                <button>Delete</button>
                            </div>
                        </div>`;
    }
    
    document.getElementById("task-board").innerHTML = resultHTML;
    
}











