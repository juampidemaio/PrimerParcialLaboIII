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

// Función asincrónica para guardar usuarios en el JSON
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

// Función asincrónica para modificar la contraseña de un usuario
async function modificarContraseña(nombreUsuario, nuevaContraseña) {
    try {
        let usuarios = await obtenerUsuarios();

        // Buscar al usuario por nombre de usuario
        const usuarioIndex = usuarios.findIndex(usuario => usuario.nombreUsuario === nombreUsuario);

        if (usuarioIndex !== -1) {
            if (usuarios[usuarioIndex].contraseña === nuevaContraseña) {
                console.log(`La nueva contraseña es la misma que la actual para ${nombreUsuario}. No se realizaron cambios.`);
                return { success: false, message: `La nueva contraseña es la misma que la actual para ${nombreUsuario}. No se realizaron cambios.` };
            }

            usuarios[usuarioIndex].contraseña = nuevaContraseña;

            await guardarUsuariosLocal(usuarios);

            console.log(`Contraseña de ${nombreUsuario} modificada correctamente.`);
            return { success: true, message: `Contraseña de ${nombreUsuario} modificada correctamente.` };
        } else {
            console.error(`No se encontró al usuario ${nombreUsuario}.`);
            return { success: false, message: `No se encontró al usuario ${nombreUsuario}.` };
        }
    } catch (error) {
        console.error('Error al modificar contraseña:', error);
        return { success: false, message: 'Error al modificar contraseña. Inténtelo nuevamente.' };
    }
}

// Función para mostrar el modal con el mensaje
function mostrarModal(mensaje) {
    document.getElementById('modal-message').textContent = mensaje;
    document.getElementById('modal').style.display = 'flex';
}

// Manejar el evento submit del formulario de cambio de contraseña
document.getElementById('formulario-actualizar-contraseña').addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const nuevaContraseña = document.getElementById('nuevaContraseña').value;

    const resultado = await modificarContraseña(nombreUsuario, nuevaContraseña);

    mostrarModal(resultado.message);

    document.getElementById('nombreUsuario').value = '';
    document.getElementById('nuevaContraseña').value = '';

    return false; 
});

// Cerrar el modal al hacer clic en el botón de cerrar
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});
