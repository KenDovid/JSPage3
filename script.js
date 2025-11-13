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

  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    email: document.getElementById("email").value.trim(),
    edad: document.getElementById("edad").value.trim()
  };

  localStorage.setItem("usuario", JSON.stringify(datos));

  mostrarMensaje("Datos guardados correctamente ✨");
}



// -----------------------------------------------------
// VER DATOS
// -----------------------------------------------------
function verDatos() {
  const datos = localStorage.getItem("usuario");

  if (!datos) {
    mostrarMensaje("No hay datos guardados.");
    return;
  }

  const user = JSON.parse(datos);

  mostrarMensaje(`
    <strong>Nombre:</strong> ${user.nombre}<br>
    <strong>Email:</strong> ${user.email}<br>
    <strong>Edad:</strong> ${user.edad}
  `);
}



// -----------------------------------------------------
// LIMPIAR FORMULARIO
// -----------------------------------------------------
function limpiarFormulario() {
  document.getElementById("formulario").reset();
  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  mostrarMensaje("Formulario limpiado.");
}



// -----------------------------------------------------
// BORRAR DATOS DEL LOCALSTORAGE
// -----------------------------------------------------
function borrarDatos() {
  localStorage.removeItem("usuario");
  mostrarMensaje("Datos eliminados.");
}



// -----------------------------------------------------
// MOSTRAR MENSAJES
// -----------------------------------------------------
function mostrarMensaje(msg) {
  const res = document.getElementById("resultado");
  res.innerHTML = msg;
  res.style.display = "block";
}
