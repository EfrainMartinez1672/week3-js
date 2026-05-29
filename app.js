// ==========================================
// TASK 2: Selección e inspección
// ==========================================
// Usamos getElementById y querySelector como se solicitó
const inputNota = document.getElementById("inputNota");
const btnAgregar = document.querySelector("#btnAgregar");
const listaNotas = document.getElementById("listaNotas");

// Verificamos en consola que las referencias existen
console.log("--- Elementos del DOM seleccionados ---");
console.log("Input DOM:", inputNota);
console.log("Botón DOM:", btnAgregar);
console.log("Lista DOM:", listaNotas);

// ==========================================
// TASK 5: Arreglo en memoria para Local Storage
// ==========================================
let notasEnMemoria = [];

// Función auxiliar para guardar el estado actual en Local Storage
function guardarEnLocalStorage() {
    localStorage.setItem("notas", JSON.stringify(notasEnMemoria));
    console.log("Local Storage actualizado:", notasEnMemoria);
}

// Función encargada de crear el elemento visual en el DOM
function renderizarNotaDOM(textoDeLaNota) {
    // TASK 3: Crear el elemento li
    const li = document.createElement("li");
    li.textContent = textoDeLaNota + " ";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    // TASK 4: Eliminar notas del DOM
    btnEliminar.addEventListener("click", () => {
        // Removemos usando removeChild desde el elemento padre (ul)
        listaNotas.removeChild(li);
        console.log(`Nota eliminada del DOM: "${textoDeLaNota}"`);

        // Actualizamos el arreglo en memoria filtrando la nota borrada
        notasEnMemoria = notasEnMemoria.filter(nota => nota !== textoDeLaNota);
        guardarEnLocalStorage();
    });

    // Anidamos el botón dentro del li, y el li dentro del ul usando appendChild
    li.appendChild(btnEliminar);
    listaNotas.appendChild(li);
}

// ==========================================
// TASK 3: Agregar notas al DOM
// ==========================================
btnAgregar.addEventListener("click", () => {
    const texto = inputNota.value.trim();

    // Validación: El input no puede estar vacío
    if (texto === "") {
        alert("El campo no puede estar vacío. Por favor escribe una nota.");
        return; 
    }

    // Insertar en el DOM
    renderizarNotaDOM(texto);
    console.log(`Nota agregada al DOM: "${texto}"`);

    // Actualizar arreglo y Local Storage
    notasEnMemoria.push(texto);
    guardarEnLocalStorage();

    // Limpiar y enfocar el input
    inputNota.value = "";
    inputNota.focus();
});

// ==========================================
// TASK 5: Recuperación inicial de datos
// ==========================================
function cargarNotasIniciales() {
    const notasGuardadas = localStorage.getItem("notas");

    if (notasGuardadas) {
        notasEnMemoria = JSON.parse(notasGuardadas);
        console.log(`Se cargaron ${notasEnMemoria.length} notas desde Local Storage al inicio.`);
        
        // Dibujamos las notas guardadas previamente en la pantalla
        notasEnMemoria.forEach(nota => {
            renderizarNotaDOM(nota);
        });
    } else {
        console.log("No hay notas previas en el Local Storage. Lista vacía.");
    }
}

// Ejecutamos la carga inicial al arrancar el archivo
cargarNotasIniciales();
