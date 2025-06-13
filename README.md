# Aplicación de Lista de Tareas (To-Do List)


Una sencilla pero potente aplicación web para gestionar tus tareas diarias. Este proyecto está construido con HTML, CSS y JavaScript puro (Vanilla JS), y utiliza el `localStorage` del navegador para asegurar que tus tareas se guarden incluso después de cerrar la ventana.

## ✨ Características Principales

-   **Añadir Tareas**: Agrega nuevas tareas a tu lista de forma rápida y sencilla.
-   **Marcar como Completadas**: Haz clic en una tarea para marcarla como completada (y viceversa).
-   **Eliminar Tareas**: Borra tareas individuales que ya no necesites.
-   **Limpiar Todo**: Elimina todas las tareas de la lista con un solo clic.
-   **Persistencia de Datos**: Tus tareas se guardan automáticamente en el `localStorage` del navegador, por lo que no las perderás al recargar la página o cerrar el navegador.
-   **Diseño Limpio**: Interfaz de usuario intuitiva y minimalista para una experiencia sin distracciones.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando tecnologías web fundamentales, sin frameworks ni librerías complejas.

-   ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
-   ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
-   ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
-   ![Font Awesome](https://img.shields.io/badge/Font%20Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white) (para los iconos)

## 🚀 Instalación y Uso

No se necesita ninguna instalación compleja ni dependencias. Simplemente sigue estos pasos:

1.  **Clona el repositorio:**
    ```sh
    git clone https://github.com/Raulvidalvalles/To-Do-List.git
    ```

2.  **Navega al directorio del proyecto:**
    ```sh
    cd To-Do-List
    ```

3.  **Abre el archivo `index.html` en tu navegador web preferido.**

¡Y listo! Ya puedes empezar a gestionar tus tareas.

## 📁 Estructura del Repositorio

El proyecto está organizado de la siguiente manera para mantener la claridad y la separación de responsabilidades:

-   **`index.html`**: Contiene el esqueleto de la aplicación, incluyendo el formulario de entrada y el contenedor para la lista de tareas.
-   **`css/style.css`**: Define todos los estilos visuales, como colores, tipografía, espaciado y el efecto de tachado para las tareas completadas.
-   **`js/app.js`**: El corazón de la aplicación. Gestiona los eventos (añadir, eliminar, completar), manipula el DOM para actualizar la lista y se encarga de la comunicación con el `localStorage` para guardar y cargar las tareas.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles (si existe) o revisa los términos a continuación.

**MIT License**

Copyright (c) 2025 Raul Vidal Valles

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
