const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit",function (event) {
    event.preventDefault();
    add();
});

const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    add();
});

function add(todo) {
    let todoText = input.value;
    let priority = document.getElementById("priority").value;
    let date = document.getElementById("date").value;

    if (todo){
        todoText = todo.text;
        priority = todo.priority;
        date = todo.date;
    }
    if (todoText) {
        const li = document.createElement("li");
        if (date) {
            li.textContent = `優先度： ${priority},${todoText}, 期日：${date}`;
        } else {
            li.textContent = `優先度： ${priority},${todoText}`;
        }
        li.classList.add("list-group-item");
 
        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        const doneButton = document.createElement("button");
        doneButton.type = "button";
        doneButton.classList.add("btn");
        doneButton.style.float = "right";
        doneButton.innerText = "完了";

        doneButton.addEventListener("click", function() {
            saveData();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("btn");
        deleteButton.style.float = "right";
        deleteButton.innerText = "x";

        deleteButton.addEventListener("click", function() {
            li.remove();
            saveData();
        });

        li.appendChild(deleteButton);
        li.appendChild(doneButton);


        li.addEventListener("contextmenu", function(event){
            event.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener("click", function (deleteButton) {
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

function saveData(){
    const lists = document.querySelectorAll("li");
    let todos = [];

    lists.forEach(list => {
        let todoText = list.textContent.replace(/^優先度: \w+, 期日：\w+, /, '');
        let priority = list.innerText.replace(/優先度: (\w+), 期日：(\w+), .*/, '$1');
        let date = list.innerText.replace(/優先度: \w+, 期日：(\w+), .*/, '$1');

        let todo = {
            text: list.innerText,
            priority: priority,
            date: date,
            completed: list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
