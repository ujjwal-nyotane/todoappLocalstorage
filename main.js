const form = document.querySelector("#taskform");
const tasklist = document.querySelector(".tasklist");
form.addEventListener("submit",function(e){
    e.preventDefault();
    const task = document.createElement("div");
    task.classList.add("tasks");
    const field = form.elements["task"].value;
    task.innerHTML=`<div>${field}</div><div class="tool"><input type="checkbox"><button> X</button</div>`;


    
    tasklist.appendChild(task);
   form.reset();
});

tasklist.addEventListener("click",(e)=>{
    if(e.target.innerText=="X"){
        (e.target.closest(".tasks")).remove();
    }
})