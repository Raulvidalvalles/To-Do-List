// 1. Seleccionar los elementos del DOM que necesitamos
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const noteInput = document.querySelector('#note-input');
const tagSelect = document.querySelector('#tag-select');
const customTagInput = document.querySelector('#custom-tag-input');
const filterTag = document.querySelector('#filter-tag');
const themeToggle = document.querySelector('#theme-toggle');
const tagSearch = document.querySelector('#tag-search');

// ============ FUNCIONALIDAD DEL TEMA ============

// Función para aplicar el tema
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Función para obtener el tema guardado o el preferido del sistema
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Si no hay tema guardado, usar la preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

// Función para alternar el tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Inicializar el tema al cargar la página
function initTheme() {
    const theme = getPreferredTheme();
    applyTheme(theme);
}

// Event listener para el botón de cambio de tema
themeToggle.addEventListener('click', toggleTheme);

// Escuchar cambios en la preferencia del sistema
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo cambiar automáticamente si no hay tema guardado manualmente
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// ============ FUNCIONALIDAD DE TAREAS ============

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
    
    // Nota si existe
    if (note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = note;
        newTask.appendChild(noteDiv);
    }
    
    // Etiquetas si existen
    if (tags && tags.length > 0) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'tags';
        tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tagSpan.setAttribute('data-tag', tag);
            tagsDiv.appendChild(tagSpan);
        });
        newTask.appendChild(tagsDiv);
    }
    
    // Botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Borrar';
    deleteBtn.classList.add('delete-btn');
    newTask.appendChild(deleteBtn);
    
    // Marcar como completada si corresponde
    if (completed) newTask.classList.add('completed');
    
    taskList.appendChild(newTask);
}

// Cargar tareas y aplicar tema al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    loadTasks();
});

// 2. Añadir un "escuchador de eventos" (Event Listener) al formulario
taskForm.addEventListener('submit', function(event) {
    // 3. Prevenir el comportamiento por defecto del formulario (que es recargar la página)
    event.preventDefault();

    // 4. Obtener el texto que el usuario escribió en el input
    const taskText = taskInput.value.trim(); // .trim() quita espacios en blanco al inicio y final
    const noteText = noteInput.value.trim();
    const selectedTags = Array.from(tagSelect.selectedOptions).map(opt => opt.value);
    const customTag = customTagInput.value.trim();
    let tags = [...selectedTags];
    if (customTag) {
        tags.push(customTag);
    }
    
    // 5. Si el input no está vacío, crear y añadir la tarea
    if (taskText !== '') {
        addTaskToDOM(taskText, noteText, tags, false);
        saveTasks();
        
        // 6. Limpiar el input para que el usuario pueda escribir otra tarea
        taskInput.value = '';
        noteInput.value = '';
        customTagInput.value = '';
        // Deseleccionar todas las opciones
        Array.from(tagSelect.options).forEach(opt => opt.selected = false);
    }
});

// Event listener para botones de eliminar y completar
taskList.addEventListener('click', function(event) {
    const clickedElement = event.target;
    
    if (clickedElement.classList.contains('delete-btn')) {
        const taskItem = clickedElement.parentElement;
        
        // Añadir animación de eliminación
        taskItem.classList.add('removing');
        
        // Eliminar después de la animación
        setTimeout(() => {
            taskItem.remove();
            saveTasks();
        }, 300);
        
    } else if (clickedElement.classList.contains('complete-btn')) {
        const taskItem = clickedElement.parentElement;
        const isCompleted = taskItem.classList.toggle('completed');
        
        clickedElement.textContent = isCompleted ? 'Completada' : 'Completar';
        clickedElement.classList.toggle('completed', isCompleted);
        
        saveTasks();
    }
});

function filterTasks() {
    const selectedTag = filterTag.value;
    const searchText = tagSearch.value.trim().toLowerCase();
    
    Array.from(taskList.children).forEach(li => {
        const tags = Array.from(li.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        const matchesSelect = !selectedTag || tags.includes(selectedTag.toLowerCase());
        const matchesSearch = !searchText || tags.some(tag => tag.includes(searchText));
        
        // Mostrar la tarea si coincide con ambos filtros o si no hay filtros activos
        if ((matchesSelect && matchesSearch) || (!selectedTag && !searchText)) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    });
}

// Actualizar los listeners para usar la nueva función de filtrado
filterTag.addEventListener('change', filterTasks);

// Agregar filtrado en tiempo real mientras se escribe
tagSearch.addEventListener('input', filterTasks);

// Limpiar búsqueda cuando se selecciona una etiqueta predefinida
filterTag.addEventListener('change', function() {
    if (this.value) {
        tagSearch.value = '';
    }
    filterTasks();
});

// Limpiar selector cuando se escribe en la búsqueda
tagSearch.addEventListener('input', function() {
    if (this.value) {
        filterTag.value = '';
    }
    filterTasks();
});

// Permitir deseleccionar opciones en el select múltiple
tagSelect.addEventListener('mousedown', function(event) {
    event.preventDefault();
    const option = event.target;
    if (option.tagName === 'OPTION') {
        option.selected = !option.selected;
    }
});