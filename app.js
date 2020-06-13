//Selectors
const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listener 
document.addEventListener("DOMContentLoaded", getTodos);
todobutton.addEventListener("click", addtodo);
todolist.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterhere);
//Functions
function addtodo(event) {
   // prevent form from submitting
   event.preventDefault();
   // Create DIV
   const tododiv = document.createElement("div");
   tododiv.classList.add("todo");
   // Create LIST
   const newtodo = document.createElement('li');
   newtodo.innerText = todoinput.value;
   newtodo.classList.add('todoitem');
   tododiv.appendChild(newtodo);
   //ADD TODO TO LOCALSTORAGE
   saveLocalTodos(todoinput.value);
   // Check mark button
   const completedbutton = document.createElement('button');
   completedbutton.innerHTML = '<i class="fas fa-check"></i>';
   completedbutton.classList.add('complete-btn');
   tododiv.appendChild(completedbutton);
   // Check trash button
   const trashbutton = document.createElement('button');
   trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
   trashbutton.classList.add('trash-btn');
   tododiv.appendChild(trashbutton);
   // Append to List 
   todolist.appendChild(tododiv);
   // Clear Input Value 
   todoinput.value = "";
};
// Delete TODO 
function deleteCheck(e) {
   const item = e.target;
   if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      // Anitmation
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener('transitionend', function () {
         todo.remove();
      })
   }
   // Mark Completed
   if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed");
   }
}

function filterhere(e) {
   console.log('came here');
   const todos = todolist.childNodes;
   todos.forEach(function (todo) {
      switch (e.target.value) {
         case "all":
            todo.style.display = "flex";
            break;
         case "completed":
            if (todo.classList.contains("completed")) {
               todo.style.display = "flex";

            } else {
               todo.style.display = "none";
            }
            break;
         case "uncompleted":
            if (!todo.classList.contains("completed")) {
               todo.style.display = "flex";
            } else {
               todo.style.display = "none";
            }
            break;
      }
   });
}
function saveLocalTodos(todo) {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.forEach(function (todo) {
      // Create DIV
      const tododiv = document.createElement("div");
      tododiv.classList.add("todo");
      // Create LIST
      const newtodo = document.createElement('li');
      newtodo.innerText = todo;
      newtodo.classList.add('todoitem');
      tododiv.appendChild(newtodo);
      // Check mark button
      const completedbutton = document.createElement('button');
      completedbutton.innerHTML = '<i class="fas fa-check"></i>';
      completedbutton.classList.add('complete-btn');
      tododiv.appendChild(completedbutton);
      // Check trash button
      const trashbutton = document.createElement('button');
      trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
      trashbutton.classList.add('trash-btn');
      tododiv.appendChild(trashbutton);
      // Append to List 
      todolist.appendChild(tododiv);

   })
}
function removeLocalTodos(todo) {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}