// 1. Seleccionar los elementos del DOM que necesitamos
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// Guardar tareas en localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas desde localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newTask = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.classList.add('delete-btn');
        newTask.appendChild(taskSpan);
        newTask.appendChild(deleteBtn);
        if (task.completed) newTask.classList.add('completed');
        taskList.appendChild(newTask);
    });
}

// Cargar tareas al iniciar la página
document.addEventListener('DOMContentLoaded', loadTasks);

// 2. Añadir un "escuchador de eventos" (Event Listener) al formulario
taskForm.addEventListener('submit', function(event) {
    // 3. Prevenir el comportamiento por defecto del formulario (que es recargar la página)
    event.preventDefault();

    // 4. Obtener el texto que el usuario escribió en el input
    const taskText = taskInput.value.trim(); // .trim() quita espacios en blanco al inicio y final

    // 5. Si el input no está vacío, crear y añadir la tarea
    if (taskText !== '') {
        // Crear un nuevo elemento <li>
        const newTask = document.createElement('li');
        
        // Crear un <span> para el texto de la tarea
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Crear un botón para borrar la tarea
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.classList.add('delete-btn');
        
        // Añadir el <span> y el botón al <li>
        newTask.appendChild(taskSpan);
        newTask.appendChild(deleteBtn);
        
        // Añadir el <li> a la lista <ul>
        taskList.appendChild(newTask);
        saveTasks(); // Guardar después de añadir

        // 6. Limpiar el input para que el usuario pueda escribir otra tarea
        taskInput.value = '';
    }
});

// Pon este código debajo del listener del formulario
taskList.addEventListener('click', function(event) {
    const clickedElement = event.target; // El elemento exacto donde se hizo clic

    // Si se hizo clic en un botón de borrar...
    if (clickedElement.classList.contains('delete-btn')) {
        const taskItem = clickedElement.parentElement; // El <li> que contiene el botón
        taskItem.remove(); // ¡Borramos la tarea!
        saveTasks(); // Guardar después de borrar
    }
    // Si se hizo clic en el texto de la tarea (el <span>)
    else if (clickedElement.tagName === 'SPAN') {
        const taskItem = clickedElement.parentElement; // El <li> padre
        taskItem.classList.toggle('completed'); // 'toggle' añade la clase si no la tiene, y la quita si la tiene
        saveTasks(); // Guardar después de marcar completada
    }
});