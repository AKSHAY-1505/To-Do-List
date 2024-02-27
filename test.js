let toDoList = [];

function deleteTask(taskIndex) {
    document.getElementById("task"+taskIndex).remove();
    toDoList.splice(taskIndex,1);
}

function completeTask(taskIndex) {
    const taskContainer = document.getElementById("task"+taskIndex);
    const containerElements = Array.from(taskContainer.children);
    containerElements[1].innerHTML = "Status: Completed";
    containerElements[1].style.color = "green"; 
    toDoList[taskIndex].status = "Completed";
}

function createTaskContainer(newTask) {
    const taskToBeAdded = document.createElement("div");
    taskToBeAdded.classList.add("tasks");
    taskToBeAdded.id = "task"+toDoList.indexOf(newTask);
    taskToBeAdded.innerHTML = `
        <h4>Name: ${newTask.name}</h4>
        <h5 class="status">Status: ${newTask.status}</h4>
        <button class="btn btn-success" onclick="completeTask(${toDoList.indexOf(newTask)})">Complete</button>
        <button class="btn btn-danger" onclick="deleteTask(${toDoList.indexOf(newTask)})">Delete</button>
    `;
    return taskToBeAdded;
}

function addTask(name,status) {
    let newTask = {
        name,
        status
    };

    toDoList.push(newTask);

    const taskList = document.getElementById("taskList");
    const taskToBeAdded = createTaskContainer(newTask);
    taskList.append(taskToBeAdded);
}

function displayWarning() {
    const warningContainer = document.getElementById("warningContainer");

    const warning = document.createElement("div");
    warning.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Task Name cannot be empty.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;

    warningContainer.append(warning);
}

document.forms["addTaskForm"].addEventListener("submit",e => {
    e.preventDefault();

    let taskName = document.getElementById("taskName").value;
    let taskStatus = "Incomplete"

    if(taskName === "")
        displayWarning();
    else
        addTask(taskName,taskStatus);

    
    document.forms["addTaskForm"].reset();

})
