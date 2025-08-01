const inputTarea = document.querySelector("#inputTarea")
const agregarTareas = document.querySelector("#btnTarea")
const listaTareas = document.querySelector("#listaTareas")
const tbody = document.querySelector("tbody")
const total = document.querySelector("#total")
const realizadas = document.querySelector("#realizadas")

const tareas = [
    {id: 1234567890123, nombre: "Lavar loza", completado: false},
    {id: 2345678901234, nombre: "Barrer", completado: false},
    {id: 3456789012345, nombre: "Hacer la cama", completado: false},
    {id: 4567890123456, nombre: "Cocinar", completado: false},
]
actualizar()

btnTarea.addEventListener("click", () =>{
    const nuevaTarea = inputTarea.value
    tareas.push({id: Date.now(), nombre: inputTarea.value, completado: false})
    inputTarea.value = ""
    actualizar()
})

function borrar(id){
    const index = tareas.findIndex((ele) => ele.id == id)
    tareas.splice(index, 1)

    let html = ""
    for (let tarea of tareas) {
        html += `<tr><td>${tarea.id}</td><td>${tarea.nombre}</td><td><input type="checkbox" class="check-tarea" id="${tarea.id}" ${tarea.completado ? "checked" : ""}></td><td><button onclick="borrar(${tarea.id})"> X </button></td></tr>`
    }
    listaTareas.innerHTML = html;
    actualizar()
    contarRealizadas()
}

function actualizar(){
        let html = ""
    for (let tarea of tareas) {
        html += `<tr><td>${tarea.id}</td><td>${tarea.nombre}</td><td><input type="checkbox" class="check-tarea" id="${tarea.id}" ${tarea.completado ? "checked" : ""}></td><td><button onclick="borrar(${tarea.id})"> X </button></td></tr>`
    }
    listaTareas.innerHTML = html;

    total.textContent = tareas.length

    const checkboxes = document.querySelectorAll(".check-tarea");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const id = Number(checkbox.id);
            const tarea = tareas.find((t) => t.id === id);
            if (tarea) {
                tarea.completado = checkbox.checked;
                contarRealizadas()
            }
        })
    });
}

function contarRealizadas(){
    const count = tareas.filter((t) => t.completado).length;
    realizadas.textContent = count;
    const checkboxes = document.querySelectorAll(".check-tarea");
    let realizadasCount = 0;

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            realizadasCount++;
        }
    });
    realizadas.textContent = realizadasCount;
}