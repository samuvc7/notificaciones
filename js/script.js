// Evento que se ejecuta al cargar el contenido del DOM
document.addEventListener('DOMContentLoaded', function (event) {

    // ====================== Constantes del DOM ======================
    const icono_campana = document.getElementById("icono_campana");
    const campana = document.getElementById("campana");
    const mensajes = document.getElementById("mensajes");
    const boton_error = document.getElementById("boton_error");
    const boton_exito = document.getElementById("boton_exito");
    const boton_info = document.getElementById("boton_info");
    const boton_eliminar_footer = document.getElementById("quitar_footer");
    const caja_footer = document.getElementById("caja_footer");
    const texto_msg_footer = document.getElementById("texto_msg_footer");


    // ====================== Variables ======================

    // ====================== Flujo ======================
    setInterval(nuevaNotificacion, 5000);

    // ====================== Eventos ======================
    campana.addEventListener("click", () => mostrarOcultarNotificaciones());
    boton_error.addEventListener("click", () => mostrarMensajeFooter('error'));
    boton_exito.addEventListener("click", () => mostrarMensajeFooter('exito'));
    boton_info.addEventListener("click", () => mostrarMensajeFooter('info'));
    boton_eliminar_footer.addEventListener("click", () => ocultarElemento(caja_footer));

    // ====================== Funciones ======================

    // FUNCION PARA MOSTRAR AVISOS EN EL FOOTER
    function mostrarMensajeFooter(tipo_mensaje) {
        let mensaje = "";
        caja_footer.classList.remove("hidden", "bg-green", "bg-gray", "bg-red");

        switch (tipo_mensaje) {
            case 'error':
                caja_footer.classList.add('bg-red');
                mensaje = "❌ Ha ocurrido un error.";
                break;
            case 'exito':
                caja_footer.classList.add('bg-green');
                mensaje = "✅ Operación realizada con éxito.";
                break;
            case 'info':
                caja_footer.classList.add('bg-gray');
                mensaje = "ℹ️ Información importante.";
                break;
            default:
                mensaje = "";
        }

        texto_msg_footer.textContent = mensaje;

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            caja_footer.classList.add("hidden");
        }, 3000);
    }

    function ocultarElemento(elemento) {
        elemento.classList.add("hidden");
    }

    // Función para añadir notificaciones
    function nuevaNotificacion() {
        if(mensajes.childNodes.length == 9){
            mensajes.removeChild(mensajes.firstChild);
        }

        const notificacion = document.createElement("div");
        notificacion.classList.add("notificacion");
        notificacion.innerHTML = seleccionarNotificacion();

        const icono_cerrar = document.createElement("img");
        icono_cerrar.src = "imgs/cerrar_negro.png";
        icono_cerrar.className = "icono_cerrar";
        icono_cerrar.addEventListener("click", function(){
            icono_cerrar.parentElement.remove();
        });

        notificacion.appendChild(icono_cerrar);
        mensajes.appendChild(notificacion);
    }

    // Función para seleccionar las notificaciones
    function seleccionarNotificacion() {
        const nombres = ["Diego", "Ángel", "Mario", "María", "Aitor", "Elena", "Samuel", "Pedro"];

        const notificaciones = [
            "❤️ Nuevo Me Gusta: A {nombre} le gustó tu publicación.",
            "💬 Nuevo Comentario: {nombre} comentó en tu publicación.",
            "📢 Nueva Mención: {nombre} te mencionó en una publicación",
            "👥 Nuevo Seguidor : {nombre} ha comenzado a seguirte"
        ];


        // Seleccionamos una notificación y una persona aleatoria
        const notificacion = notificaciones[Math.floor(Math.random() * notificaciones.length)];
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        
        // Reemplazamos el nombre que hemos seleccionado en la notificación
        return notificacion.replace("{nombre}", nombre);
    }

    // Función para mostrar las notificaciones
    function mostrarOcultarNotificaciones() {
        if (mensajes.classList.contains("invisible")) {
            icono_campana.src = "imgs/campana.png";
            mensajes.classList.remove("invisible");
        } else {
            icono_campana.src = "imgs/campana_tachada.png";
            mensajes.classList.add("invisible");
        }
    }






});