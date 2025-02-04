// Evento que se ejecuta al cargar el contenido del DOM
document.addEventListener('DOMContentLoaded', function (event) {

    // ====================== Constantes del DOM ======================
    const campana = document.getElementById("campana");
    const mensajes = document.getElementById("mensajes");
    const boton_error = document.getElementById("boton_error");
    const boton_exito = document.getElementById("boton_exito");
    const boton_info = document.getElementById("boton_info");

    // ====================== Variables ======================

    // ====================== Flujo ======================
    setInterval(nuevaNotificacion, 5000);

    // ====================== Eventos ======================
    campana.addEventListener("click", () => mostrarOcultarNotificaciones());
    boton_error.addEventListener("click", () => mostrarMensajeFooter('error'));
    boton_exito.addEventListener("click", () => mostrarMensajeFooter('exito'));
    boton_info.addEventListener("click", () => mostrarMensajeFooter('info'));

    // ====================== Funciones ======================

    // FUNCION PARA MOSTRAR AVISOS EN EL FOOTER
    function mostrarMensajeFooter(tipo_mensaje) {
        const caja = document.getElementById("mensajes_footer");
        let mensaje = "";
        caja.classList.remove("hidden");

        switch (tipo_mensaje) {
            case 'error':
                caja.classList.add('msg-error');
                mensaje = "❌ Ha ocurrido un error.";
                break;
            case 'exito':
                caja.classList.add('msg-exito');
                mensaje = "✅ Operación realizada con éxito.";
                break;
            case 'info':
                caja.classList.add('msg-info');
                mensaje = "<b>i</b> Información importante.";
                break;
            default:
                mensaje = "";
        }
        caja.innerHTML = `<h3>${mensaje}</h3>`
    }

    // Función para añadir notificaciones
    function nuevaNotificacion() {
        const notificacion = document.createElement("div");
        notificacion.classList.add("notificacion");
        notificacion.innerHTML = seleccionarNotificacion();
        mensajes.appendChild(notificacion);
    }

    // Función para seleccionar las notificaciones
    function seleccionarNotificacion() {
        const notificaciones = [
            "❤️ Nuevo Me Gusta: A un usuario le gustó tu publicación.",
            "💬 Nuevo Comentario: Un usuario comentó en tu publicación.",
            "📢 Nueva Mención: Un usuario te mencionó en una publicación",
            "👥 Nueva Solicitud de Amistad : Un usuario quiere ser tu amigo"
        ];

        const randomNoti = notificaciones[Math.floor(Math.random() * notificaciones.length)];

        return randomNoti;
    }

    // Función para mostrar las notificaciones
    function mostrarOcultarNotificaciones() {
        if (mensajes.classList.contains("invisible")) {
            mensajes.classList.remove("invisible");
        } else {
            mensajes.classList.add("invisible");
        }
    }


});