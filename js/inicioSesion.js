async function obtenerUsuarios() {
    try {
        const respuesta = await fetch('../usuarios.json'); 
        const datos = await respuesta.json();
        return datos.usuarios;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}

async function validarInicioSesion(evento) {
    evento.preventDefault();

    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const usuarios = await obtenerUsuarios();

    const usuario = usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario && usuario.contraseña === contraseña);

    if (usuario) {
        mostrarModal('Inicio de sesión exitoso');
    } else {
        mostrarModal('El nombre de usuario o la contraseña es incorrecta. Inténtelo de nuevo.');
    }
}

function mostrarModal(mensaje) {
    const modalMessage = document.getElementById('modal-message');
    const modal = document.getElementById('modal');
    
    modalMessage.textContent = mensaje;
    modal.style.display = 'flex';
}

// Event listener para el formulario de inicio de sesión
document.getElementById('formulario-inicio-sesion').addEventListener('submit', validarInicioSesion);

// Event listener para cerrar el modal
document.getElementById('modal-close').addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});

// Event listener para cerrar el modal haciendo clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
