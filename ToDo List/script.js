const inputEl=document.querySelector("#input-text");
const submitBtn=document.querySelector("#submit-btn");
const todoList=document.querySelector("#todo-list");
const filterOption=document.querySelector("#filter-option");

document.addEventListener("DOMContentLoaded",getTodos)
submitBtn.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheckTodo);
filterOption.addEventListener("click",filterTodo);

function addTodo(event){
    event.preventDefault();//prevents formfrom submitting
    if(inputEl.value!=""){
    const todoDiv=document.createElement("div");//div
    todoDiv.classList.add("todo-div");
    //Create li's
    const li=document.createElement("li");
    li.innerText=inputEl.value;
    li.classList.add("todo-sets")
    todoDiv.appendChild(li);
    //localstorage
    saveLocalTodos(inputEl.value);
    //check-btn
    const checkBtn=document.createElement("button");
    checkBtn.innerHTML=`<i class="fas fa-check"></i>`;
    checkBtn.classList.add("check-btn")
    todoDiv.appendChild(checkBtn);
    //trash-btn
    const trashBtn=document.createElement("button");
    trashBtn.innerHTML=`<i class="fas fa-trash"></i>`;
    trashBtn.classList.add("trash-btn")
    todoDiv.appendChild(trashBtn);
    //append to list
    todoList.appendChild(todoDiv);
    inputEl.value="";
    }
}

function deleteCheckTodo(e){
    const item=e.target;
    if(item.classList[0]==="trash-btn"){
        const todoEl=item.parentElement;
        //animation
        todoEl.classList.add("fall");
        removeStorageTodos(todoEl);
        todoEl.addEventListener("transitionend",function(){//adding transition nd then roemving 
             todoEl.remove();
        })
    }
    //checkmark
    if(item.classList[0]==="check-btn"){
        const todoEl=item.parentElement;
        todoEl.classList.toggle('completed');
    }
    
}

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
            todo.style.display="flex";
            break;

            case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display="flex";
            }
            else{
                todo.style.display="none";
            }
            break;
            
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check if any things are there
    let todos;
    if(localStorage.getItem("todos")===null)
    todos=[];
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null)
    todos=[];
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        if(inputEl.value!=""){
    const todoDiv=document.createElement("div");//div
    todoDiv.classList.add("todo-div");
    //Create li's
    const li=document.createElement("li");
    li.innerText=todo;
    li.classList.add("todo-sets")
    todoDiv.appendChild(li);
    //check-btn
    const checkBtn=document.createElement("button");
    checkBtn.innerHTML=`<i class="fas fa-check"></i>`;
    checkBtn.classList.add("check-btn")
    todoDiv.appendChild(checkBtn);
    //trash-btn
    const trashBtn=document.createElement("button");
    trashBtn.innerHTML=`<i class="fas fa-trash"></i>`;
    trashBtn.classList.add("trash-btn")
    todoDiv.appendChild(trashBtn);
    //append to list
    todoList.appendChild(todoDiv);
        }
    });
}


function removeStorageTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null)
    todos=[];
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const indexEl=todo.children[0].innerText;
    // const indexEl=todo.innerText;
    todos.splice(todos.indexOf(indexEl),1);//fromwhat position we want to remove, how many elements we want to remove
    localStorage.setItem("todos",JSON.stringify(todos));//saving back to localstorage
}