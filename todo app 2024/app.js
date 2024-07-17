document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            saveTask(taskText);
            taskInput.value = '';
        } else {
            alert('Please enter a task');
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const taskItem = e.target.parentElement;
            removeTask(taskItem);
        } else if (e.target.classList.contains('edit-btn')) {
            const taskItem = e.target.parentElement;
            editTask(taskItem);
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <p class="task-text">${taskText}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    }

    function saveTask(taskText) {
        const tasks = getTasks();
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => addTask(task));
    }

    function removeTask(taskItem) {
        const taskText = taskItem.querySelector('.task-text').textContent;
        taskItem.remove();
        const tasks = getTasks();
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function editTask(taskItem) {
        const taskTextElement = taskItem.querySelector('.task-text');
        const newTaskText = prompt('Edit task:', taskTextElement.textContent);
        if (newTaskText) {
            const tasks = getTasks();
            const taskIndex = tasks.indexOf(taskTextElement.textContent);
            tasks[taskIndex] = newTaskText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskTextElement.textContent = newTaskText;
        }
    }
});
