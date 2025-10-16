const inputTarea = document.getElementById("tarea");
const btnGuardar = document.getElementById("btnGuardar");
const listaTareas = document.getElementById("listaTareas");

window.addEventListener("DOMContentLoaded", mostrarTareas);

btnGuardar.addEventListener("click", () => {
    const texto = inputTarea.value.trim();
    if (texto === "") return;

    agregarTarea(texto, false);
    guardarTareas();
    inputTarea.value = "";
});

function agregarTarea(texto, completada) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const etiqueta = document.createElement("label");

    checkbox.type = "checkbox";
    etiqueta.textContent = texto;

    if (completada) {
        checkbox.checked = true;
        etiqueta.classList.add("completada");
    }

    checkbox.addEventListener("change", () => {
        etiqueta.classList.toggle("completada");
        guardarTareas();
    });

    li.appendChild(checkbox);
    li.appendChild(etiqueta);
    listaTareas.appendChild(li);
}

function guardarTareas() {
    let tareas = [];
    document.querySelectorAll("#listaTareas li").forEach(li => {
        const texto = li.querySelector("label").textContent;
        const check = li.querySelector("input").checked ? "*" : "";
        tareas.push(texto + check);
    });
    localStorage.setItem("tareas", tareas.join("|"));
}

function mostrarTareas() {
    const datos = localStorage.getItem("tareas");
    if (!datos) return;

    const tareas = datos.split("|");
    tareas.forEach(t => {
        if (t.trim() !== "") {
            const texto = t.replace("*", "");
            const completada = t.includes("*");
            agregarTarea(texto, completada);
        }
    });
}
