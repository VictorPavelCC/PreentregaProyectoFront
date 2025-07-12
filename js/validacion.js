function validateForm() {
  const name = document.getElementById('nombre').value.trim();
  const age = document.getElementById('edad').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const email = document.getElementById('email').value.trim();
  
  let isValid = true;

  const errores = [
    { cond: name === '', id: 'empty-name', msg: 'El nombre es obligatorio' },
    { cond: name.length <= 1, id: 'min-name', msg: 'El nombre debe tener al menos 2 caracteres' },
    { cond: age === '', id: 'empty-age', msg: 'El campo edad es obligatorio' },
    { cond: age !== '' && age < 18, id: 'min-age', msg: 'El usuario es menor de edad' },
    { cond: mensaje === '', id: 'empty-message', msg: 'El mensaje es obligatorio' },
    { cond: email === '', id: 'empty-email', msg: 'El correo electrónico es obligatorio' },
    { cond: email !== '' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email), id: 'invalid-email', msg: 'El correo electrónico no es válido' }
  ];

  errores.forEach(({ cond, id, msg }) => {
    if (cond) {
      showError(id, msg);
      isValid = false;
    } else {
      hideError(id);
    }
  });

  return isValid;
}

function showError(id, msg) {
  const el = document.getElementById(`${id}-error`);
  el.textContent = "❌ " + msg;
  el.style.display = 'block';
}

function hideError(id) {
  const el = document.getElementById(`${id}-error`);
  el.style.display = 'none';
}

document.getElementById('btnEnviar').addEventListener('click', e => {
  e.preventDefault();
  if (validateForm()) {
    Swal.fire({
      icon: 'success',
      title: 'Formulario válido',
      text: 'Redirigiendo a la página de éxito...',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      window.location.href = "../index.html";
    });
  }
});