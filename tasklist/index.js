// executa apenas depois de carregar o documento
document.addEventListener("DOMContentLoaded", function() {

lucide.createIcons();

function updateEventListeners() {
    optionsBtn.forEach(function(button) {
        button.addEventListener("click", showOptMenu);
    });
    checks.forEach(function(check) {
        check.addEventListener("click", handleCompletedTasks);
    });
    removeBtns.forEach(function(removeBtn) {
        removeBtn.addEventListener("click", () => removeTask(removeBtn.closest(".task")));
    });
    editBtns.forEach(function(editBtn) {
        editBtn.addEventListener("click", () => editTask(editBtn.closest(".task")));
    });
    optionsWrapper.forEach(function(wrapper) {
        wrapper.addEventListener("click", event => event.stopPropagation());
    });
}

function updateSelectors() {
    optionsBtn = document.querySelectorAll(".options-button");
    checks = document.querySelectorAll(".check");
    removeBtns = document.querySelectorAll(".remove-task");
    editBtns = document.querySelectorAll(".edit-task");
    optionsWrapper = document.querySelectorAll(".options-wrapper");
}

// fechar menus quando clicar fora
window.addEventListener("click", hideOptMenus);

let optionsWrapper = document.querySelectorAll(".options-wrapper");
optionsWrapper.forEach(function(wrapper) {
    wrapper.addEventListener("click", event => event.stopPropagation());
});

// botões de opção
let optionsBtn = document.querySelectorAll(".options-button");
optionsBtn.forEach(function(button) {
    button.addEventListener("click", showOptMenu);
});

function hideOptMenus() {
    optionsBtn.forEach(function(button) {
        const menu = button.parentNode.childNodes[3];
        menu.style.display = "none";
    })
}

function showOptMenu() {
    const menu = this.parentNode.querySelector(".options-menu");
        
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } 
    else {
        hideOptMenus();
        menu.style.display = "flex";
    }
}

// funções de tasklist
const tasklist = document.querySelector("#tasklist");
const addTaskBtn = document.querySelector("#add-task-button");
const list = document.querySelector("#list");

let creatingTask = false;
let editingTask = false;

addTaskBtn.addEventListener("click", addTask);

function createCreateTaskBox() {
    let createTaskBox = document.createElement("div");
    createTaskBox.classList.add("task-create");
    createTaskBox.innerHTML = `
    <textarea 
        id="task-description" 
        class="input-text" 
        placeholder="Task description..." 
        maxlength="500" 
        rows="3"
    ></textarea>
    <div class="buttons">
        <button class="button" id="create-task-button">Create</button>
        <button class="button" id="cancel-task-button">Cancel</button>
    </div>`;
    return createTaskBox;
}

function addTask() {
    if (creatingTask) {
        return;
    }
    creatingTask = true;

    const createTaskBox = createCreateTaskBox();
    list.append(createTaskBox);
    
    addTaskBtn.remove();

    const createTaskBtn = document.querySelector("#create-task-button");
    const cancelTaskBtn = document.querySelector("#cancel-task-button");

    createTaskBtn.addEventListener("click", function() {
        const taskDescription = document.querySelector("#task-description").value.trim();
        
        if (!taskDescription) {
            return;
        }
        creatingTask = false;
        
        const task = createTask(taskDescription);
        list.append(task);
        createTaskBox.remove();
        list.append(addTaskBtn);
            
        lucide.createIcons();
        updateSelectors();
        updateEventListeners();
        addTask();  // continua adicionando tarefas
        saveData();
    });
    
    cancelTaskBtn.addEventListener("click", function() {
        creatingTask = false;
        
        createTaskBox.remove();
        tasklist.append(addTaskBtn);
        saveData();
    });
}

function createOpt() {
    const options = document.createElement("div");
    options.classList.add("options-wrapper");
    options.innerHTML = `
        <div class="options-button">
            <i data-lucide="ellipsis" class="icon-opt"></i>
        </div>
        <div class="options-menu">
            <button class="button edit edit-task">
                <i data-lucide="pencil" class="icon-opt"></i>
                <span>Edit</span>
            </button>
            <button class="button remove remove-task">
                <i data-lucide="circle-minus" class="icon-opt"></i>
                <span>Remove</span>
            </button>
        </div>`;
    return options;
}

function createTaskDescription(taskDescription) {
    const description = document.createElement("span");
    description.classList.add("task-description");
    description.textContent = taskDescription;
    return description;
}

function createTask(taskDescription) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML += "<i data-lucide='circle' class='icon-check'></i>";
    task.innerHTML += "<input type='checkbox' class='check'>";

    const description = createTaskDescription(taskDescription);
    task.append(description);

    const options = createOpt();
    task.append(options);

    return task;
}

let checks = document.querySelectorAll(".check");
checks.forEach(function(check) {
    check.addEventListener("click", handleCompletedTasks);
});

function handleCompletedTasks() {
    checks.forEach(function(check) {
        const task = check.parentElement;
        if (check.checked === true) {
            task.classList.add("checked");
            
            if (hideCompletedTasks) {
                hideTask(task);
            }
        }
        else {
            task.classList.remove("checked");
        }
    });
    saveData();
}

let removeBtns = document.querySelectorAll(".remove-task");
function removeTask(task) {
    task.remove();
}

let editBtns = document.querySelectorAll(".edit-task");
editBtns.forEach(function(editBtn) {
    editBtn.addEventListener("click", function() {
        editTask(editBtn.closest(".task"));
    });
});

function createEditTaskBox(oldDescription) {
    let editTaskBox = document.createElement("div");
    editTaskBox.classList.add("task-create");
    editTaskBox.innerHTML = `
    <textarea 
        id="task-description" 
        class="input-text" 
        placeholder="Task 
        description..." 
        maxlength="500" 
        rows="3"
    ></textarea>
    <div class="buttons">
        <button class="button edit-task-button">Edit</button>
        <button class="button cancel-edit-task-button">Cancel</button>
    </div>`;
    editTaskBox.querySelector(".input-text").value = oldDescription;
    return editTaskBox;
}

function editTask(task) {
    const oldTask = task.innerHTML;
    const oldDescription = task.querySelector(".task-description").textContent;

    if (editingTask) {
        return;
    }
    editingTask = true;

    let editTaskBox = createEditTaskBox(oldDescription);
    list.insertBefore(editTaskBox, task);
    task.remove();

    const editTaskBtn = editTaskBox.querySelector(".edit-task-button");
    const cancelTaskBtn = editTaskBox.querySelector(".cancel-edit-task-button");

    editTaskBtn.addEventListener("click", function() {
        const taskDescription = document.querySelector("#task-description").value.trim();
        if (!taskDescription) {
            return;
        }
        editingTask = false;

        const task = createTask(taskDescription);
        list.insertBefore(task, editTaskBox);
        editTaskBox.remove();
            
        lucide.createIcons();
        updateSelectors();
        updateEventListeners();
    });
    
    cancelTaskBtn.addEventListener("click", function() {
        editingTask = false;
        
        const task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = oldTask;
        list.insertBefore(task, editTaskBox);
        editTaskBox.remove();
        
        updateSelectors();
        updateEventListeners();
    });
    saveData();
}

// opções gerais da tasklist
const removeAllBtn = document.querySelector("#tasklist-opt-rem-all");
removeAllBtn.addEventListener("click", function() {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(task => task.remove());
    hideOptMenus();
    saveData();
});

const removeCompletedBtn = document.querySelector("#tasklist-opt-rem-completed");
removeCompletedBtn.addEventListener("click", function() {
    const completedTasks = document.querySelectorAll(".task.checked");
    completedTasks.forEach(completedTask => completedTask.remove());
    hideOptMenus();
    saveData();
});

let hideCompletedTasks = false;

const hideCompletedTasksBtn = document.querySelector("#tasklist-opt-hide-completed");
hideCompletedTasksBtn.addEventListener("click", function() {

    if (!hideCompletedTasks) {
        hideCompletedTasks = true;

        const completedTasks = document.querySelectorAll(".task.checked");
        completedTasks.forEach(completedTask => hideTask(completedTask));
        
        updateTaskDisplayButton("eye", "Show completed tasks");
    }
    else {
        hideCompletedTasks = false;

        const tasks = list.querySelectorAll(".task");

        // mostrando as tarefas que foram removidas
        for (let task of tasks) {
            if (task.style.display == "none") {
                task.style.display = "flex";
            }
        }
        updateTaskDisplayButton("eye-off", "Hide completed tasks");
    }
    hideOptMenus();
    saveData();
});

function hideTask(task) {
    task.style.display = "none";
}

function updateTaskDisplayButton(icon, label) {
    hideCompletedTasksBtn.innerHTML = "";
    hideCompletedTasksBtn.innerHTML += `<i data-lucide='${icon}' class='icon-opt'></i>`
    hideCompletedTasksBtn.innerHTML += `<span>${label}</span>`
    hideCompletedTasksBtn.querySelector(".icon-opt");
    lucide.createIcons();
}

function saveData() {
    localStorage.setItem("data", list.innerHTML);
}

function getTasklist() {
    if (localStorage.getItem("data")) {
        list.innerHTML = localStorage.getItem("data");
    }
    document.querySelectorAll(".task.checked")
        .forEach(task => task.querySelector(".check").checked = true);
    updateSelectors();
    updateEventListeners();
}

getTasklist(); // carrega tasklist salva anteriormente

});