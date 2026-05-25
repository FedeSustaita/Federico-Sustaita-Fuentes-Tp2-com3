const API_URL = "http://localhost:3000/tasks";

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let tareas = [];
let filtro = "all";


async function obtenerTareas() {

    const response = await fetch(API_URL);
    tareas = await response.json();

    mostrarTareas();
}

function mostrarTareas() {

    taskList.innerHTML = "";

    let tareasFiltradas = tareas;

    if(filtro === "pending"){
        tareasFiltradas = tareas.filter(t => !t.completed);
    }

    if(filtro === "completed"){
        tareasFiltradas = tareas.filter(t => t.completed);
    }

    tareasFiltradas.forEach(tarea => {

        const div = document.createElement("div");
        div.classList.add("task");

        if(tarea.completed){
            div.classList.add("completed");
        }

div.innerHTML = `
    <span>${tarea.title}</span>

    <div class="acciones">

        <button onclick="completarTarea('${tarea.id}', ${tarea.completed})">
            ✓
        </button>

        <button onclick="editarTarea('${tarea.id}')">
            Editar
        </button>

        <button onclick="eliminarTarea('${tarea.id}')">
            X
        </button>

    </div>
`;

        taskList.appendChild(div);
    });
}

async function agregarTarea() {

    const texto = taskInput.value.trim();

    if(texto === ""){
        alert("Ingrese una tarea");
        return;
    }

    const nuevaTarea = {
        title: texto,
        completed: false
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaTarea)
    });

    taskInput.value = "";

    obtenerTareas();
}


async function eliminarTarea(id){

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    obtenerTareas();
}


async function completarTarea(id, estado){

    await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: !estado
        })
    });

    obtenerTareas();
}

async function editarTarea(id){

    const tarea = tareas.find(t => t.id === id);

    const nuevoTitulo = prompt("Editar tarea", tarea.title);

    if(nuevoTitulo === null || nuevoTitulo.trim() === ""){
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: nuevoTitulo
        })
    });

    obtenerTareas();
}


addBtn.addEventListener("click", agregarTarea);

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        filterBtns.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        filtro = btn.dataset.filter;

        mostrarTareas();
    });
});


obtenerTareas();


window.eliminarTarea = eliminarTarea;
window.completarTarea = completarTarea;
window.editarTarea = editarTarea;