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

  let lista = JSON.parse(localStorage.getItem("usuarios")) || [];
  lista.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(lista));

  mostrarMensaje("Usuario guardado correctamente.");
  limpiarFormulario();
}

// -----------------------------------------------------
// VER DATOS (con botón dinámico y validación extra)
// -----------------------------------------------------
function verDatos() {
    const contenedor = document.getElementById("resultado");
    const btnVer = document.getElementById("btnVer");

    const datos = localStorage.getItem("usuarios");
    const usuarios = datos ? JSON.parse(datos) : [];

    // 🔥 VALIDACIÓN EXTRA: si NO hay datos → mostrar msj y NO cambiar botón
    if (usuarios.length === 0) {
        mostrarMensaje("No hay datos guardados.");
        return;
    }

    // Si ya está visible → ocultarlo
    if (contenedor.style.display === "block") {
        contenedor.style.display = "none";
        btnVer.textContent = "Ver datos";
        return;
    }

    // Construir HTML si hay datos
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

    // 🔥 Cambio de texto SOLO si sí había datos
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

    if (nombre === "" && email === "" && edad === "") {
        mostrarMensaje("No hay datos para limpiar.");
        return;
    }

    document.getElementById("formulario").reset();
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    mostrarMensaje("Formulario limpiado.");
}

// -----------------------------------------------------
// BORRAR TODOS LOS DATOS
// -----------------------------------------------------
function borrarDatos() {
    const usuariosGuardados = localStorage.getItem("usuarios");

    if (!usuariosGuardados || JSON.parse(usuariosGuardados).length === 0) {
        mostrarMensaje("No hay datos para eliminar.");
        return;
    }

    localStorage.removeItem("usuarios");
    mostrarMensaje("Usuarios eliminados correctamente.");

    // Opcional: ocultar si estaba visible
    document.getElementById("resultado").style.display = "none";
    document.getElementById("btnVer").textContent = "Ver datos";
}

// -----------------------------------------------------
// MOSTRAR MENSAJE
// -----------------------------------------------------
function mostrarMensaje(msg) {
  const res = document.getElementById("resultado");
  res.innerHTML = msg;
  res.style.display = "block";
}

// -----------------------------------------------------
// ELIMINAR USUARIO INDIVIDUAL
// -----------------------------------------------------
function eliminarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.length === 0) {
        mostrarMensaje("No hay datos para eliminar.");
        return;
    }

    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensaje("Usuario eliminado correctamente.");

    // 🔥 Refrescar vista sin ocultar datos
    setTimeout(() => verDatos(), 100);
}
