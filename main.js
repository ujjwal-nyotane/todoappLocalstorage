const form = document.querySelector("#taskform");

const tasklist = document.querySelector(".tasklist");
let tasklistobj = JSON.parse(localStorage.getItem("tasks"));
if (!tasklistobj) {
    tasklistobj = {};
}
else {
    for (let i in tasklistobj) {
        const task = document.createElement("div");
        task.classList.add("tasks");
        task.innerHTML = `<div class="tasktext" style="text-decoration: ${function () { return (tasklistobj[i] ? 'line-through' : 'none') }()}">${i}</div><div class="tool"><input ${function () { return (tasklistobj[i] ? "checked" : '') }()} type="checkbox"><button>🖉</button><button> X</button</div>`;

        tasklist.appendChild(task);
    }
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = document.createElement("div");
    task.classList.add("tasks");
    const field = form.elements["task"].value;
    tasklistobj[field] = false;
    task.innerHTML = `<div class="tasktext">${field.trim()}</div><div class="tool"><input type="checkbox"><button>🖉</button><button> X</button</div>`;


    localStorage.setItem("tasks", JSON.stringify(tasklistobj));
    tasklist.appendChild(task);
    form.reset();
});

tasklist.addEventListener("click", (e) => {
    if (e.target.innerText == "X") {

        delete tasklistobj[(e.target.closest(".tasks").firstChild.innerText)];
        (e.target.closest(".tasks")).remove();
        localStorage.setItem("tasks", JSON.stringify(tasklistobj));

    }
    if (e.target.closest("input[type='checkbox']")) {

        tasklistobj[(e.target.closest(".tasks").firstChild.innerText)] = (e.target.closest("input[type='checkbox']").checked)
        if (tasklistobj[(e.target.closest(".tasks").firstChild.innerText)]) {
            (e.target.closest(".tasks").firstChild).style.textDecoration = "line-through";
        }
        else {
            (e.target.closest(".tasks").firstChild).style.textDecoration = "none";
        }

        localStorage.setItem("tasks", JSON.stringify(tasklistobj));
    }
    if (e.target.innerText == "🖉") {
        const edit = document.createElement("div");
        const name = (e.target.closest(".tasks").firstChild);
        edit.innerHTML = `<form onsubmit=" return edit(this,'${(e.target.closest(".tasks")).firstChild.innerText}')" class="editname"><input type='text'value="${(e.target.closest(".tasks")).firstChild.innerText}" placeholder="${(e.target.closest(".tasks")).firstChild.innerText}"></form`

        name.replaceWith(edit);




    }

});
let eventl = 0;
function edit(name, old) {

    const newtask = name.querySelector("input").value;
    if (newtask == "") newtask = old;
    const ele = name.parentElement.parentElement
    const div = document.createElement("div");
    div.innerHTML = `<div class="tasktext" style="text-decoration: ${function () { return (tasklistobj[old] ? 'line-through' : 'none') }()}">${newtask}</div>`;
    tasklistobj[newtask] = tasklistobj[old];
    delete tasklistobj[old];


    localStorage.setItem("tasks", JSON.stringify(tasklistobj));
    name.replaceWith(div);
    return false;
}



