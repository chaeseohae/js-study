// 유저가 값을 입력한다
// +버튼을 누르면 할일 추가
// delete 버튼을 누르면 할일 삭제
// check 버튼을 누르면 할일이 끝나면서 밑줄
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난 걸로 간주하고 밑줄 보여주기
// 3. false이면 안 끝난 걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면 언더바 이동
// 완료탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");

tabs.forEach((tabs => 
    tabs.addEventListener("click", (e) => horizontalIndicator(e))
));

function horizontalIndicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 3 + "px";
}

addBtn.addEventListener("click", addTask);
addBtn.addEventListener("click", function() {
    taskInput.value = "";
});
taskInput.addEventListener("keyup", function(event) {
    if(event.key == 'Enter') {
        addTask();
        taskInput.value = "";
    }
});

for(let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event)
    });
}
console.log(tabs);

function addTask() {
    let task = {
        id : randomIDGenerator(),
        taskContent : taskInput.value,
        isComplete : false
    };

    if(taskInput.value == "") {
        alert("할일을 입력해주세요!");
        return;
    }

    taskList.push(task);
    console.log(taskList);
    
    render();
}

function render() {
    let list = [];
    
    if(mode === "all") {
        list = taskList;
    } else if(mode === "ongoing" || mode === "done") {
        list = filterList;
    }

    let resultHTML = "";
    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task task-done-bg">
                                <span>
                                    <div class="task-done">${list[i].taskContent}</div>
                                </span>
                                <div class="button-box">
                                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>`;
        } else {
            resultHTML += `<div class="task">
                                <span>
                                    <div>${list[i].taskContent}</div>
                                </span>
                                <div class="button-box">
                                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>`;
        }

    }
    
    document.getElementById("task-board").innerHTML = resultHTML;
    
}

function toggleComplete(id) {

    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    filter();
    console.log(taskList);
}

function deleteTask(id) {
    
    if(confirm("정말 삭제하시겠습니까?")) {

        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].id == id) {
                taskList.splice(i,1);
                break;
            }
        }
    }
    console.log(taskList);
    
    filter();
}

function filter(event) {
    if(event) {
        mode = event.target.id;
    }
    filterList = [];

    if(mode === "all") {
        // 전체 리스트
        render();

    } else if(mode === "ongoing") {
        // 진행중인 아이템
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList);
        
    } else if(mode === "done") {
        // 완료된 아이템
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("완료", filterList)
    }
}

function randomIDGenerator() {
      return '_' + Math.random().toString(36).substr(2, 9);
};





