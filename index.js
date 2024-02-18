'use strict'; /* 厳格にエラーをチェック */

{ /* ローカルスコープ */

// DOM取得
const tabMenus = document.querySelectorAll('.tab_list-item');


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
  const tabItems = tabList.querySelectorAll('.tab_list-item');

  // クリックされた要素の親要素の兄弟要素の子要素を取得
  const tabPanelItems = tabList.
  nextElementSibling.querySelectorAll('.tab_panel-box');

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

document.getElementById("form1").style.display = "none";
document.getElementById("form2").style.display = "none";
document.getElementById("form3").style.display = "none";

document.getElementById("add1").onclick = function() {
    const form1 = document.getElementById("form1");
    form1.style.display = (form1.style.display === "none") ? "block" : "none";
};
document.getElementById("add2").onclick = function() {
    const form2 = document.getElementById("form2");
    form2.style.display = (form2.style.display === "none") ? "block" : "none";
};
document.getElementById("add3").onclick = function() {
    const form3 = document.getElementById("form3");
    form3.style.display = (form3.style.display === "none") ? "block" : "none";
};

const form1 = document.getElementById("form1");
const input1 = document.getElementById("input1");
const ul1 = document.getElementById("ul1");

const form2 = document.getElementById("form2");
const input2 = document.getElementById("input2");
const ul2 = document.getElementById("ul2");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form1.addEventListener("submit",function (event) {
    event.preventDefault();
    add();
});

form2.addEventListener("submit",function (event) {
    event.preventDefault();
    add();
});


const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "none";
    add();
});

function add(todo) {
    let todoText1 = input1.value;
    let priority1 = document.getElementById("priority1").value;
    let date1 = document.getElementById("date1").value;

    let todoText2 = input2.value;
    let priority2 = document.getElementById("priority2").value;
    let date2 = document.getElementById("date2").value;

    if (todo){
        todoText1 = todo.text1;
        priority1 = todo.priority1;
        date1 = todo.date1;

        todoText2 = todo.text2;
        priority2 = todo.priority2;
        date2 = todo.date2;
    }
    if (todoText1) {
        const li1 = document.createElement("li1");
        const textContent = document.createElement("div");

        const priority1Content = document.createElement("div");
        priority1Content.textContent = `優先度：${priority1}`;
        textContent.appendChild(priority1Content);

        const todoContent = document.createElement("div");
        todoContent.textContent = `内容：${todoText1}`;
        textContent.appendChild(todoContent);

        if (date1) {
            const date1Content = document.createElement("div");
            date1Content.textContent = `期日：${date1}`;
            textContent.appendChild(date1Content);
        }

        li1.appendChild(textContent);
        li1.classList.add("list-group-item");

        if (todo && todo.completed) {
            li1.classList.add("text-decoration-line-through");
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
            li1.classList.toggle
            ("text-decoration-line-through");
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
            li1.remove();
            saveData();
        });

        li1.appendChild(doneButton);
        li1.appendChild(deleteButton);

        ul1.appendChild(li1);
        input1.value = "";
        saveData();
    }
}

function saveData(){
    const lists = document.querySelectorAll("li1");
    let todos = [];

    lists.forEach((list) => {
        let todoText1 = list.textContent.replace(/^優先度: \w+, 期日：\w+, /, '');
        let priority1 = list.innerText.replace(/優先度: (\w+), 期日：(\w+), .*/, '$1');
        let date1 = list.innerText.replace(/優先度: \w+, 期日：(\w+), .*/, '$1');

        let todo = {
            text1: list.innerText,
            priority1: priority1,
            completed: list.classList.contains("text-decoration-line-through")
        };

        if (date1) {
            todo.date1 = date1;
        }

        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

