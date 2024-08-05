document.addEventListener('DOMContentLoaded', () =>{

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskListElement = document.getElementById('task-list');
    const taskList = JSON.parse(localStorage.getItem('task')) || [];

    function saveTasks(){
        localStorage.setItem('task', JSON.stringify(taskList));
    }

    function loadTasks(){
        taskList.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true){
        
        if (taskText ===''){
            alert("please enter a task")
            return;
        }
            const li = document.createElement('li');
            li.textContent =  taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = 'remove-btn';

            removeButton.onclick = function(){
                const index = taskList.indexOf(taskText);
                if (index > -1){
                    taskList.splice(index, 1);
                    saveTasks();
                }
                li.remove();
            };

            li.appendChild(removeButton);
            taskListElement.appendChild(li);
            
            if (save){
            taskList.push(taskText);
            saveTasks();
        }
            taskInput.value="";
        }
    
    addButton.addEventListener('click', () => addTask(taskInput.value.trim()));
    taskInput.addEventListener('keypress', function(event){
        if(event.key === 'Enter'){
            addTask(taskInput.value.trim());
        }
    });

    loadTasks();


});