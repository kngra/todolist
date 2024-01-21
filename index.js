'use strict'; /* 厳格にエラーをチェック */

{ /* ローカルスコープ */

// DOM取得
const tabMenus = document.querySelectorAll('.tab_list-item');
console.log(tabMenus);

// イベント付加
tabMenus.forEach((tabMenu) => {
  tabMenu.addEventListener('click', tabSwitch);
})

// イベントの処理
function tabSwitch(e) {

  // クリックされた要素のデータ属性を取得
  const tabTargetData = e.currentTarget.dataset.tab;
  // クリックされた要素の親要素と、その子要素を取得
  const tabList = e.currentTarget.closest('.tab_list');
  console.log(tabList);
  const tabItems = tabList.querySelectorAll('.tab_list-item');
  console.log(tabItems);
  // クリックされた要素の親要素の兄弟要素の子要素を取得
  const tabPanelItems = tabList.
  nextElementSibling.querySelectorAll('.tab_panel-box');
  console.log(tabPanelItems);

  // クリックされたtabの同階層のmenuとpanelのクラスを削除
  tabItems.forEach((tabItem) => {
    tabItem.classList.remove('is-active');
  })
  tabPanelItems.forEach((tabPanelItem) => {
    tabPanelItem.classList.remove('is-show');
  })

  // クリックされたmenu要素にis-activeクラスを付加
  e.currentTarget.classList.add('is-active');
  // クリックしたmenuのデータ属性と等しい値を持つパネルにis-showクラスを付加
  tabPanelItems.forEach((tabPanelItem) => {
    if (tabPanelItem.dataset.panel ===  tabTargetData) {
      tabPanelItem.classList.add('is-show');
    }
  })

}

}








document.getElementById("form").style.display = "none";

document.getElementById("add").onclick = function() {
    const form = document.getElementById("form");
    form.style.display = (form.style.display === "none") ? "block" : "none";
};

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
    document.getElementById("form").style.display = "none";
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
        const textContent = document.createElement("div");

        const priorityContent = document.createElement("div");
        priorityContent.textContent = `優先度：${priority}`;
        textContent.appendChild(priorityContent);

        const todoContent = document.createElement("div");
        todoContent.textContent = `内容：${todoText}`;
        textContent.appendChild(todoContent);

        if (date) {
            const dateContent = document.createElement("div");
            dateContent.textContent = `期日：${date}`;
            textContent.appendChild(dateContent);
        }

        li.appendChild(textContent);
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        const doneButton = document.createElement("button");
        doneButton.type = "button";
        doneButton.classList.add("btn");
        doneButton.style.float = "left";
        doneButton.style.margin = "5px"
        doneButton.style.border = "solid 1px #c0c0c0";
        doneButton.style.backgroundColor = "#f5f5f5";
        doneButton.innerText = "完了";

        doneButton.addEventListener("click", function() {
            saveData();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("btn");
        deleteButton.style.float = "left";
        deleteButton.style.margin = "5px"
        deleteButton.style.border = "solid 1px #c0c0c0";
        deleteButton.style.backgroundColor = "#f5f5f5";
        deleteButton.innerText = "×";

        deleteButton.addEventListener("click", function() {
            li.remove();
            saveData();
        });

        li.appendChild(doneButton);
        li.appendChild(deleteButton);

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
            completed: list.classList.contains("text-decoration-line-through")
        };

        if (date) {
            todo.date = date;
        }

        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
