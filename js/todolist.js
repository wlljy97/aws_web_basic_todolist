const addTodoButtonOnClickHandle = () => { // 추가버튼 클릭 했을때

    // spread 문법
    // const testObj = {
    //     name : "김준일",
    //     age : 10
    // }

    // console.log(testObj);

    // const testObj2 = {
    //     ...testObj, // spread 문법 : (copy) 깊은 복사 , ... 부분에는 testObj의 객체내용이 있다.
        
    //     address : "부산",
    //     name: "김준이" // map 개념 key값은 중복될 수 없음, key값을 변경해주면 값이 바뀐다.
    // }

    // console.log(testObj2);

    // const testArray = [1,2,3,4,5];
    // console.log(testArray);
    // const testArray2 = [...testArray, 6,7,8];
    // console.log(testArray2);

        generateTodoObj();
}

const addTodoOnKeyUpHandle = (event) => {
    if(event.keyCode === 13) {  //엔터 쳤을 때 enter 키 값이 '13'
        generateTodoObj();
    }
}

const checkedOnChangeHandle = (target) => {
    TodoListService.getInstance().setCompleStatus(target.value, target.checked);
}

const deleteTodoOnClickHandle = (target) => {
    TodoListService.getInstance().removeTodo(target.value);
}

const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-header-items .text-input").value;

    const todoObj = {
        id: 0,
        todoContent: todoContent,
        createDate: DateUtils.toStringByFormatting(new Date()),
        compleStatus : false
    };
    

    TodoListService.getInstance().addTodo(todoObj);
}

class TodoListService {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null){
            this.#instance = new TodoListService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;

    constructor() {
        this.loadTodoList();
    }
    
    // JSON.parse(제이슨 문자열) : 제이슨 문자열 ->(변환) 객체
    // JSON.stringfy(객체) : 객체 -> 제이슨 문자열

    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        // localStorage :초기화를 한 뒤 원래 기록(저장)된 값들과 같이 나온다.
        this.todoIndex = !!this.todoList[this.todoList.lenght - 1]?.id ? this.todoList[this.todoList.length -1].id + 1 : 1; // 삼항 연산자
        // id 값이 있으면 true, 없으면 false
    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    addTodo(todoObj) { //오브젝트 객체 만드는 것
        const todo = {
            ...todoObj,
            id: this.todoIndex
        }

        // todo.id = 10; // todo가 객체여야 바꿀 수 있다.

        this.todoList.push(todo);

        this.saveLocalStorage();

        this.updateTodoList();

        // localStorage.setItem("todoList", JSON.stringify(this.todoList)); // 배열을 JSON 형태로 하여금 localStorage에 todoList가 저장

        // TodoListService.getInstance().updateTodoList(); // 추가 되면 한번 더 호출

        this.todoIndex++;
    }

    setCompleStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) {
                this.todoList[index].compleStatus = status;
            }
        });

        this.saveLocalStorage();
    }

    removeTodo(id) {
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }

    updateTodoList() {
        const todolistMainContainer = document.querySelector(".todolist-main-container");

        todolistMainContainer.innerHTML = this.todoList.map(todo => {
            return `
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" ${todo.compleStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"></label>
                    </div>
                    <div class="item-center">
                        <pre class="todolist-content">${todo.todoContent}</pre>
                    </div>
                    <div class="item-right">
                        <p class="todolist-date">${todo.createDate}</p>
                        <div class="todolist-item-buttons">
                            <button class="btn btn-edit" value="${todo.id}" onclick = "modifyTodoOnClickHandle(this);">수정</button>
                            <button class="btn btn-remove" value="${todo.id}" onclick = "deleteTodoOnClickHandle(this);">삭제</button>
                        </div>
                    </div>
                 </li>
            `;
        }).join(""); // 전부 붙여 준다.
    }
}