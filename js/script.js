// 1. Seleccionar los elementos del DOM que necesitamos
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const noteInput = document.querySelector('#note-input');
const tagSelect = document.querySelector('#tag-select');
const customTagInput = document.querySelector('#custom-tag-input');
const filterTag = document.querySelector('#filter-tag');

// Guardar tareas en localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const tags = Array.from(li.querySelectorAll('.tag')).map(tag => tag.textContent);
        tasks.push({
            text: li.querySelector('span').textContent,
            note: li.querySelector('.note') ? li.querySelector('.note').textContent : '',
            tags: tags,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas desde localStorage
function loadTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.note, task.tags, task.completed);
    });
}

function addTaskToDOM(text, note, tags, completed) {
    const newTask = document.createElement('li');
    // Botón para completar tarea
    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = completed ? 'Completada' : 'Completar';
    if (completed) completeBtn.classList.add('completed');
    newTask.appendChild(completeBtn);
    // Texto de la tarea
    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
    newTask.appendChild(taskSpan);
    if (note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = note;
        newTask.appendChild(noteDiv);
    }
    if (tags && tags.length > 0) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'tags';
        tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tagsDiv.appendChild(tagSpan);
        });
        newTask.appendChild(tagsDiv);
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Borrar';
    deleteBtn.classList.add('delete-btn');
    newTask.appendChild(deleteBtn);
    if (completed) newTask.classList.add('completed');
    taskList.appendChild(newTask);
}

// Cargar tareas al iniciar la página
document.addEventListener('DOMContentLoaded', loadTasks);

// 2. Añadir un "escuchador de eventos" (Event Listener) al formulario
taskForm.addEventListener('submit', function(event) {
    // 3. Prevenir el comportamiento por defecto del formulario (que es recargar la página)
    event.preventDefault();

    // 4. Obtener el texto que el usuario escribió en el input
    const taskText = taskInput.value.trim(); // .trim() quita espacios en blanco al inicio y final
    const noteText = noteInput.value.trim();
    const selectedTags = Array.from(tagSelect.selectedOptions).map(opt => opt.value);
    const customTag = customTagInput.value.trim();
    let tags = selectedTags;
    if (customTag) tags = [...tags, customTag];

    // 5. Si el input no está vacío, crear y añadir la tarea
    if (taskText !== '') {
        addTaskToDOM(taskText, noteText, tags, false);
        saveTasks();
        // 6. Limpiar el input para que el usuario pueda escribir otra tarea
        taskInput.value = '';
        noteInput.value = '';
        customTagInput.value = '';
        tagSelect.selectedIndex = -1;
    }
});

// Pon este código debajo del listener del formulario
taskList.addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('delete-btn')) {
        const taskItem = clickedElement.parentElement;
        taskItem.remove();
        saveTasks();
    } else if (clickedElement.classList.contains('complete-btn')) {
        const taskItem = clickedElement.parentElement;
        const isCompleted = taskItem.classList.toggle('completed');
        clickedElement.textContent = isCompleted ? 'Completada' : 'Completar';
        clickedElement.classList.toggle('completed', isCompleted);
        saveTasks();
    }
});

taskList.addEventListener('change', function(event) {
    if (event.target.classList.contains('complete-checkbox')) {
        const taskItem = event.target.parentElement;
        taskItem.classList.toggle('completed', event.target.checked);
        saveTasks();
    }
});

filterTag.addEventListener('change', function() {
    const filter = filterTag.value;
    Array.from(taskList.children).forEach(li => {
        if (!filter || Array.from(li.querySelectorAll('.tag')).some(tag => tag.textContent === filter)) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    });
});