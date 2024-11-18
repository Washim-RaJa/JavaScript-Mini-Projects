const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

let oldInputValue;
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();

function time() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    document.getElementById("hour").innerHTML = strTime
}

setInterval(() => {
    time()
}, 1000);

todoForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const inputValue = todoInput.value;
    if (inputValue) {
        saveTodo(inputValue)
    }else{
        alert("Please add your tasks")
    }
})

const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button")
    doneBtn.setAttribute("title", "Mark as done")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button")
    editBtn.setAttribute("title", "Edit")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button")
    removeBtn.setAttribute("title", "Delete")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn);
    
    todoList.appendChild(todo);
    saveToLS()
    todoInput.value = "";
    todoInput.focus();
}

document.addEventListener("click", (e)=> {
    const targetEl = e.target;
    
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
        saveToLS()
    }
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
        saveToLS()
    }
    if (targetEl.classList.contains("edit-todo")) {
        toggleForms()
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

cancelEditBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    toggleForms()
})

editForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    const editInputValue = editInput.value;
    if (editInputValue) {
        updateTodo(editInputValue)
    }
    toggleForms()
})

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    });
    saveToLS()
}
function saveToLS() {
    localStorage.setItem("data", todoList.innerHTML)
}

(function showTodoList() {
    todoList.innerHTML = localStorage.getItem("data")
})()