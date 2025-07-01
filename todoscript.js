let textInput = document.getElementById('textinput');
let addBtn = document.getElementById('addbtn');
let displayText = document.getElementById('displaytext');
let taskfilertag = document.getElementById('taskfiltertag');






let todoArray = JSON.parse(localStorage.getItem('tasks')) || [];





// Create filter buttons


let allBtn = document.createElement('button');
allBtn.innerText = 'All Tasks';
allBtn.style.margin = '5px';
allBtn.style.padding = '8px 16px';
allBtn.style.backgroundColor = '#007bff';
allBtn.style.color = 'white';
allBtn.style.border = 'none';
allBtn.style.borderRadius = '4px';
allBtn.style.cursor = 'pointer';

let completedBtn = document.createElement('button');
completedBtn.innerText = 'Completed';
completedBtn.style.margin = '5px';
completedBtn.style.padding = '8px 16px';
completedBtn.style.backgroundColor = '#28a745';
completedBtn.style.color = 'white';
completedBtn.style.border = 'none';
completedBtn.style.borderRadius = '4px';
completedBtn.style.cursor = 'pointer';

let incompleteBtn = document.createElement('button');
incompleteBtn.innerText = 'Incomplete';
incompleteBtn.style.margin = '5px';
incompleteBtn.style.padding = '8px 16px';
incompleteBtn.style.backgroundColor = '#dc3545';
incompleteBtn.style.color = 'white';
incompleteBtn.style.border = 'none';
incompleteBtn.style.borderRadius = '4px';
incompleteBtn.style.cursor = 'pointer';


// Filter event listeners
allBtn.onclick = function() {
    
};

completedBtn.onclick = function() {
     displayText.innerHTML = ''; // Clear existing
    todoArray.forEach(taskText => {
        createTaskElement(taskText);})
};

incompleteBtn.onclick = function() {
    
};


// Create this as a separate function
function createTaskElement(taskText) {
    // Create a container for the task
    let taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    // Create task text element
    let taskContent = document.createElement('span');
    taskContent.innerText = taskText;

    // Create time display element 
    let taskTime = document.createElement('span');
    taskTime.style.fontSize = '12px';
    taskTime.style.color = 'gray';
    taskTime.style.marginLeft = '10px';

// Create Complete button
let completeBtn = document.createElement('button');
completeBtn.innerText = 'Complete';
let isCompleted = false; // Track the state

completeBtn.onclick = function () {
    if (isCompleted) {
            // Change back to incomplete
            completeBtn.innerText = 'Not Complete';
            completeBtn.style.color = 'red';
            completeBtn.style.backgroundColor = 'black';
            taskTime.innerText = ''; // Clear time
            isCompleted = false;
        } else {
            // Mark as completed and add timestamp
            completeBtn.innerText = 'Completed';
            completeBtn.style.color = 'white';
            completeBtn.style.backgroundColor = 'black';
            
            // Get current time and display it
            let now = new Date();
            let timeString = now.toLocaleTimeString();
            taskTime.innerText = `Completed at: ${timeString}`;
            
            isCompleted = true;
        }
};

    // Create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = function () {
        displayText.removeChild(taskDiv);

        // Remove task from array
        const index = todoArray.indexOf(taskText);
        if (index > -1) {
            todoArray.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(todoArray));
        }

        alert('Task deleted');
        console.log("Current tasks:", todoArray);
    };

  

// Create Edit button
    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.onclick = function () {
        // Get current task text
        let currentText = taskContent.innerText;
        
        // Prompt user for new text
        let newText = prompt('Edit task:', currentText);
        
        // If user didn't cancel and entered text
        if (newText !== null && newText.trim() !== '') {
            // Find the index of the old text in the array
            let index = todoArray.indexOf(currentText);
            
            if (index > -1) {
                // Update the array
                todoArray[index] = newText.trim();
                
                // Update the display
                taskContent.innerText = newText.trim();
                
                // Save to localStorage
                localStorage.setItem('tasks', JSON.stringify(todoArray));
                
               // console.log("Task updated:", todoArray);
            }
        }
    };


    // Assemble the task item

    
    taskDiv.appendChild(taskContent);
    
     
    taskDiv.appendChild(completeBtn);
    taskDiv.appendChild(deleteBtn);
     taskDiv.appendChild(editBtn);
     taskDiv.appendChild(taskTime);  

    displayText.appendChild(taskDiv);
    
   
     taskfiltertag.appendChild(allBtn); 
    taskfiltertag.appendChild(incompleteBtn); 
    taskfilertag.appendChild(completedBtn); 
    
}

function renderTasks() {
    displayText.innerHTML = ''; // Clear existing
    todoArray.forEach(taskText => {
        createTaskElement(taskText);
    });
}

// This is the event listener - separate from createTaskElement
addBtn.addEventListener('click', function () {
    let taskText = textInput.value.trim();
    if (taskText === "") return;

    // Add task to array
    todoArray.push(taskText);

    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(todoArray));

    // Create and display the task element
    createTaskElement(taskText);

    // Clear input
    textInput.value = '';

    // Show current array (for testing)
    console.log("Current tasks:", todoArray);
});

renderTasks();