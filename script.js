// -----------------------------------------------------
// VALIDACIÓN
// -----------------------------------------------------
function validar() {
  let nombre = document.getElementById("nombre").value.trim();
  let email = document.getElementById("email").value.trim();
  let edad = document.getElementById("edad").value.trim();

  let errorNombre = document.getElementById("error-nombre");
  let errorEmail = document.getElementById("error-email");
  let errorEdad = document.getElementById("error-edad");

  let valido = true;

  // Validación nombre
  if (nombre === "") {
    errorNombre.textContent = "El nombre es obligatorio.";
    valido = false;
  } else {
    errorNombre.textContent = "";
  }

  // Validación email
  if (email === "") {
    errorEmail.textContent = "El email es obligatorio.";
    valido = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errorEmail.textContent = "Formato de email inválido.";
    valido = false;
  } else {
    errorEmail.textContent = "";
  }

  // Validación edad
  if (edad === "") {
    errorEdad.textContent = "La edad es obligatoria.";
    valido = false;
  } else if (edad < 1 || edad > 120) {
    errorEdad.textContent = "Edad no válida.";
    valido = false;
  } else {
    errorEdad.textContent = "";
  }

  return valido;
}

// -----------------------------------------------------
// GUARDAR DATOS
// -----------------------------------------------------
function guardar() {
  if (!validar()) {
    mostrarMensaje("Corrige los errores antes de guardar.");
    return;
  }

  const nuevoUsuario = {
    nombre: document.getElementById("nombre").value.trim(),
    email: document.getElementById("email").value.trim(),
    edad: document.getElementById("edad").value.trim()
  };

  // 1. Obtener la lista actual (si existe)
  let lista = JSON.parse(localStorage.getItem("usuarios")) || [];

  // 2. Agregar el nuevo usuario
  lista.push(nuevoUsuario);

  // 3. Guardar la nueva lista
  localStorage.setItem("usuarios", JSON.stringify(lista));

  mostrarMensaje("Usuario guardado correctamente. ");
}

// -----------------------------------------------------
// VER DATOS
// -----------------------------------------------------

function verDatos() {
    const contenedor = document.getElementById("resultado");
    const btnVer = document.getElementById("btnVer");
    const datos = localStorage.getItem("usuarios");

    if (!datos || JSON.parse(datos).length === 0) {
        mostrarMensaje("No hay datos guardados.");
        return;
    }

    // Si ya está visible → ocultarlo
    if (contenedor.style.display === "block") {
        contenedor.style.display = "none";
        btnVer.textContent = "Ver datos";
        return;
    }

    const usuarios = JSON.parse(datos);
    let html = "<strong>Usuarios almacenados:</strong><br><br>";

    usuarios.forEach((u, index) => {
        html += `
            <div class="usuario-item">
                <strong>Usuario ${index + 1}</strong><br>
                Nombre: ${u.nombre}<br>
                Email: ${u.email}<br>
                Edad: ${u.edad}<br>
                <button class="btnEliminarUno" data-index="${index}">
                    Eliminar este usuario
                </button>
                <br><br>
            </div>
        `;
    });

    mostrarMensaje(html);
    btnVer.textContent = "Ocultar datos";

    // Activar botones individuales
    document.querySelectorAll(".btnEliminarUno").forEach(btn => {
        btn.addEventListener("click", function () {
            eliminarUsuario(parseInt(this.dataset.index));
        });
    });
}

// -----------------------------------------------------
// LIMPIAR FORMULARIO
// -----------------------------------------------------

function limpiarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    // Si todos los campos están vacíos → no hay nada que limpiar
    if (nombre === "" && email === "" && edad === "") {
        mostrarMensaje("No hay datos para limpiar.");
        return;
    }

    // Si hay algo escrito → limpiar
    document.getElementById("formulario").reset();
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    mostrarMensaje("Formulario limpiado.");
}


// -----------------------------------------------------
// BORRAR DATOS DEL LOCALSTORAGE
// -----------------------------------------------------

function borrarDatos() {
    const usuariosGuardados = localStorage.getItem("usuarios");

    // Validación: si no hay datos o está vacío
    if (!usuariosGuardados || JSON.parse(usuariosGuardados).length === 0) {
        mostrarMensaje("No hay datos para eliminar.");
        return;
    }

    // Si sí hay datos, se eliminan
    localStorage.removeItem("usuarios");
    mostrarMensaje("Usuarios eliminados correctamente.");
}

// -----------------------------------------------------
// MOSTRAR MENSAJES
// -----------------------------------------------------
function mostrarMensaje(msg) {
  const res = document.getElementById("resultado");
  res.innerHTML = msg;
  res.style.display = "block";
}

function eliminarUsuario(index) {
    let usuarios = localStorage.getItem("usuarios");

    if (!usuarios) {
        mostrarMensaje("No hay datos para eliminar.");
        return;
    }

    usuarios = JSON.parse(usuarios);

    // Eliminar uno por índice
    usuarios.splice(index, 1);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("Usuario eliminado correctamente.");

    verDatos();
}
