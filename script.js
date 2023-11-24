const todoValue = document.getElementById("todoText");
const listItems = document.querySelector(".list-item");
const addUpdateClick = document.getElementById("AddUpdateClick");
const taskEmptyMessage = document.getElementById("task-empty");
const filterOptions = document.querySelectorAll(".filter-option");

todoValue.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addUpdateClick.click();
    }
});

function CreateToDoData() {
    if (todoValue.value === "") {
        todoValue.focus();
        return;
    }

    // Remove the task empty message if it exists
    if (taskEmptyMessage) {
        taskEmptyMessage.remove();
    }

    const li = document.createElement("li");

    // Creating a div for task content
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    // Creating a checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.cursor = "pointer";
    checkbox.style.marginRight = '4px';

    // Adding the checkbox to the task content div
    taskContent.appendChild(checkbox);

    // Creating a div for the input value
    const inputValueDiv = document.createElement("div");
    inputValueDiv.textContent = todoValue.value;

    // Adding the input value div to the task content div
    taskContent.appendChild(inputValueDiv);

    // Styling for the input value div
    inputValueDiv.style.flexGrow = '1';  // Take up remaining space
    inputValueDiv.style.textDecoration = 'none';  // Initial decoration

    // Adding click event listener to toggle checkbox and change decoration
    taskContent.addEventListener("click", function (event) {
        if (event.target === checkbox) {
            // Clicked on the checkbox
            inputValueDiv.style.textDecoration = checkbox.checked ? 'line-through' : 'none';  
        } else {
            // Clicked on the task content (including the input value)
            checkbox.checked = !checkbox.checked; 
            inputValueDiv.style.textDecoration = checkbox.checked ? 'line-through' : 'none';  
        }
    });

    // Creating a div for task options
    const taskOption = document.createElement("div");
    taskOption.classList.add("task-option");
    taskOption.style.display = 'flex'; // Add this line to make it a flex container
    taskOption.style.alignItems = 'center';
    taskOption.style.position = 'relative';

    // Creating a button for the task menu
    const taskMenuButton = document.createElement("button");
    taskMenuButton.id = "task-menu-button";
    taskMenuButton.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    taskOption.appendChild(taskMenuButton);
    taskMenuButton.style.border = 'none';
    taskMenuButton.style.position = 'absolute';
    taskMenuButton.style.display = 'inline-block';
    taskMenuButton.style.verticalAlign = 'middle'; // Align vertically in the middle
    taskMenuButton.style.cursor = 'pointer';

    // Creating a div for task option container
    const taskOptionContainer = document.createElement("div");
    taskOptionContainer.classList.add("task-option-container");
    taskOptionContainer.style.border = 'solid 1px rgb(107, 114, 128)';
    taskOptionContainer.style.position = 'absolute';
    taskOptionContainer.style.cursor = 'pointer';
    taskOptionContainer.padding = '1rem'
    taskOptionContainer.gap = '1rem'
    taskOptionContainer.style.backgroundColor = '#999'
    taskOptionContainer.style.display = 'none';
    taskOptionContainer.style.right = '1rem'
    taskOptionContainer.style.top = '0'; //
    taskOptionContainer.style.flexDirection ='column'
    
    

    // Creating an Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i id="task-option-button" class="fa-regular fa-pen-to-square"></i> Edit';
    editButton.style.border ='none';
    editButton.style.padding = '10px 20px';
    editButton.style.display = 'flex';
    editButton.style.gap = '4px';


    //Add a event listener for deleteButton hover
    editButton.addEventListener("mouseover",function(){
        editButton.style.color = '#818cf8'
    });

    editButton.addEventListener("mouseout",function(){
        editButton.style.color = 'black'
    });

    // Add a click event listener to the Edit button
    editButton.addEventListener("click", function () {
        EditTask(li, inputValueDiv);
        li.remove();
        if (listItems.children.length === 0) {
            listItems.appendChild(taskEmptyMessage);
        }
    });

    taskOptionContainer.appendChild(editButton);

    // Creating a button element for deleting
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i id="task-option-button" class="fa-solid fa-trash-can"></i> Delete';
    deleteButton.style.border ='none';
    deleteButton.style.padding = '10px 20px'
    deleteButton.style.display = 'inline-block';
    deleteButton.style.display = 'flex';
    deleteButton.style.gap = '4px'


    //Add a event listener for deleteButton hover
    deleteButton.addEventListener("mouseover",function(){
        deleteButton.style.color = 'red'
    });

    deleteButton.addEventListener("mouseout",function(){
        deleteButton.style.color = 'black'
    });

    // Add a click event listener to the button to remove the corresponding list item
    deleteButton.addEventListener("click", function () {
        li.remove();
        // If there are no more tasks, display the task empty message
        if (listItems.children.length === 0) {
            listItems.appendChild(taskEmptyMessage);
        }
    });

    taskOptionContainer.appendChild(deleteButton);

    // Adding the task option container to the task option div
    taskOption.appendChild(taskOptionContainer);
    taskOptionContainer.style.display = 'flex';
    taskOptionContainer.style.flexDirection = 'column';
    taskOptionContainer.style.position = 'relative';
    

    // Adding the task content and task option divs to the list item
    li.appendChild(taskContent);
    li.appendChild(taskOption);

    // Appending the list item to the list
    listItems.appendChild(li);

    // Clearing the input field
    todoValue.value = '';
    taskOptionContainer.style.display = "none";

    // Add hover event listener to task-menu-button
    taskMenuButton.addEventListener("mouseover", function () {
        taskOptionContainer.style.display = "flex";
    });

    taskMenuButton.addEventListener("mouseout", function () {
        taskOptionContainer.style.display = "none";
    });

    // Add hover event listener to task-option-container
    taskOptionContainer.addEventListener("mouseover", function () {
        taskOptionContainer.style.display = "flex";
    });

    taskOptionContainer.addEventListener("mouseout", function () {
        taskOptionContainer.style.display = "none";
    });

    const taskOptionContainerBefore = document.querySelector(".task-option-container::before");

    // Add a mouseover event listener to task-option-container::before
    taskOptionContainerBefore.addEventListener("mouseover", function () {
    // Show the taskOptionContainer
    taskOptionContainer.style.display = "flex";
    });

    // Add a mouseout event listener to task-option-container::before
    taskOptionContainerBefore.addEventListener("mouseout", function () {
    // Hide the taskOptionContainer
    taskOptionContainer.style.display = "none";
    });
    
}




function EditTask(taskItem, inputValueDiv) {
    // Clear the todoValue input field
    todoValue.value = inputValueDiv.textContent;
    todoValue.focus();

    // Function to handle key press events
    function handleKeyPress(e) {
        if (e.key === "Enter") {
            const newText = todoValue.value.trim();
            if (newText !== "") {
                inputValueDiv.textContent = newText;
            }
            // Remove the event listener after updating the task
            todoValue.removeEventListener("keypress", handleKeyPress);
        }
    }

    // Add key press event listener
    todoValue.addEventListener("keypress", handleKeyPress);

    // Add blur event listener to remove the event listener if focus is lost without pressing Enter
    todoValue.addEventListener("blur", function () {
        todoValue.removeEventListener("keypress", handleKeyPress);
    });

    // Remove the taskContent input element from the taskItem
    const taskContent = taskItem.querySelector(".task-content");
    taskContent.removeChild(taskContent.querySelector("input[type='checkbox']")); // Remove checkbox
    taskContent.removeChild(taskContent.querySelector("div")); // Remove inputValueDiv
    taskContent.innerHTML = ''; // Clear the content
}




//----------FILTER---------------------------------------------//
function filterTasks(filterType) {
    const tasks = document.querySelectorAll(".list-item li");
 
    tasks.forEach((task) => {
       task.style.display = "none";
       switch (filterType) {
          case "all":
             task.style.display = "flex";
             break;
          case "pending":
             if (!task.querySelector("input[type='checkbox']").checked) {
                task.style.display = "flex"; 
             }
             break;
          case "completed":
             if (task.querySelector("input[type='checkbox']").checked) {
                task.style.display = "flex";
             }
             break;
       }
    });
 }
 
 // Add click event listeners to filter options     
 filterOptions.forEach((filterOption) => {
    filterOption.addEventListener("click", function () {
       // Remove the "selected" class from all filter options
       filterOptions.forEach((option) => option.classList.remove("selected"));
       this.classList.add("selected");
       filterTasks(this.id);
    });
 });
 

// Initial check to display the task empty message if there are no tasks
if (listItems.children.length === 0) {
    listItems.appendChild(taskEmptyMessage);
}
