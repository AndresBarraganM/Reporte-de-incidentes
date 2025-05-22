document.getElementById('cerrar-sesion').addEventListener('click', function(e) {
    e.preventDefault();
    // Opcional: confirmar cierre
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Tu sesión actual se cerrará.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4d5fdb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken'); // Borrar token
        window.location.href = 'login.html'; // Redirigir al login
      }
    });
  });