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

// Función para guardar usuarios en el JSON local
async function guardarUsuariosLocal(usuarios) {
    try {
        // Obtener los datos actuales del archivo JSON
        const respuesta = await fetch('../usuarios.json');
        const datosActuales = await respuesta.json();

        // Actualizar los usuarios en los datos actuales
        datosActuales.usuarios = usuarios;

        // Sobrescribir el archivo JSON con los datos actualizados
        const archivoNuevo = new Blob([JSON.stringify(datosActuales)], { type: 'application/json' });
        const urlArchivo = URL.createObjectURL(archivoNuevo);

        const a = document.createElement('a');
        a.href = urlArchivo;
        a.download = 'usuarios.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error al guardar usuarios:', error);
    }
}

// Función para verificar si el usuario ya existe en el JSON
async function usuarioExiste(nombreUsuario) {
    const usuarios = await obtenerUsuarios();
    return usuarios.some(usuario => usuario.nombreUsuario === nombreUsuario);
}

// Función para mostrar el modal con un mensaje
function mostrarModal(mensaje) {
    document.getElementById('modal-message').textContent = mensaje;
    document.getElementById('modal').style.display = 'flex';
}

// Función para registrar un nuevo usuario
async function registrarUsuario(evento) {
    evento.preventDefault();

    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contraseña = document.getElementById('contraseña').value;

    if (await usuarioExiste(nombreUsuario)) {
        mostrarModal('El nombre de usuario ya está en uso. Inténtelo con otro nombre de usuario.');
        return false; // Evitar recarga de página
    }

    let usuarios = await obtenerUsuarios();

    const nuevoUsuario = {
        nombreUsuario: nombreUsuario,
        contraseña: contraseña
    };

    usuarios.push(nuevoUsuario);

    await guardarUsuariosLocal(usuarios);

    mostrarModal('Usuario registrado con éxito');
    
    document.getElementById('nombreUsuario').value = '';
    document.getElementById('contraseña').value = '';

    return false; 
}

// Manejar el evento submit del formulario de registro
document.getElementById('formulario-registro').addEventListener('submit', registrarUsuario);

// Manejar el cierre del modal
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});
