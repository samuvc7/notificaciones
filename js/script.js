// Evento que se ejecuta al cargar el contenido del DOM
document.addEventListener('DOMContentLoaded', function () {

    // ====================== Constantes del DOM ======================
    const icono_campana = document.getElementById("icono_campana");
    const campana = document.getElementById("campana");
    const mensajes = document.getElementById("mensajes");
    const boton_error = document.getElementById("boton_error");
    const boton_exito = document.getElementById("boton_exito");
    const boton_info = document.getElementById("boton_info");
    const despliegue = document.getElementById("despliegue-notif");
    const boton_eliminar_footer = document.getElementById("quitar_footer");
    const caja_footer = document.getElementById("caja_footer");
    const texto_msg_footer = document.getElementById("texto_msg_footer");
    const boton_mandar_alerta = document.getElementById("mandar_msg_alerta");
    const boton_marcar_como_leido = document.getElementById("icono_correo");


    // ====================== Variables ======================
    const nombres = ["Diego", "Ángel", "Mario", "María", "Aitor", "Elena", "Samuel", "Pedro"];
    let timeout = null;
    let notif_id = 0;
    let seguidores = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    let likes = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    // ====================== Flujo ======================
    setInterval(nuevaNotificacion, 5000);

    // ====================== Eventos ======================
    icono_campana.addEventListener("click", () => mostrarOcultarNotificaciones());
    boton_error.addEventListener("click", () => mostrarMensajeFooter('error'));
    boton_exito.addEventListener("click", () => mostrarMensajeFooter('exito'));
    boton_info.addEventListener("click", () => mostrarMensajeFooter('info'));
    boton_eliminar_footer.addEventListener("click", () => ocultarElemento(caja_footer));
    boton_mandar_alerta.addEventListener("click", () => mandar_alerta());
    boton_marcar_como_leido.addEventListener("click", () => eliminarTodosMensajes());

    //Poder dar enter y mandar msg
    document.getElementById("texto-enviar").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {  
            event.preventDefault();   //no salto de linea
            boton_mandar_alerta.click();  // Simular clic en el botón
        }
    });

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
        clearTimeout(timeout);

        // Ocultar el mensaje después de 3 segundos
        timeout = setTimeout(() => {
            caja_footer.classList.add("hidden");
        }, 5000);
    }

    function ocultarElemento(elemento) {
        elemento.classList.add("hidden");
    }

    function eliminarTodosMensajes() {
        let notificaciones = document.querySelectorAll(".notificacion");
        notificaciones.forEach(elemento => elemento.remove());

        despliegue.innerHTML = '';

    }

    // Función para añadir notificaciones
    function nuevaNotificacion() {

        const notificacion = document.createElement("div");
        notificacion.classList.add("notificacion");
        notificacion.id = notif_id++;
        notificacion.innerHTML = seleccionarNotificacion();

        const icono_cerrar = document.createElement("img");
        icono_cerrar.src = "imgs/cerrar_negro.png";
        icono_cerrar.className = "icono_cerrar";
        icono_cerrar.addEventListener("click", function(event) {

            let notif = icono_cerrar.parentElement;

            if (despliegue.querySelector('article') != null) {

                if (notif.id == despliegue.querySelector('article').id) {
                    despliegue.innerHTML = '';
                }

            }

            notif.remove();

        });

        // Evento para desplegar las notificaciones
        notificacion.addEventListener("click", function (event) {

            if (event.target == notificacion) {

                let mensaje = notificacion.innerHTML;
                let id = notificacion.id;
                let nombre = nombres.find(nombre => mensaje.includes(nombre));
    
                if (mensaje.includes("Gusta")) {
                    mostrarMeGusta(id, nombre);
    
                } else if (mensaje.includes("Comentario")) {
                    mostrarComentario(id, nombre);
    
                } else if (mensaje.includes("Mención")) {
                    mostrarMencion(id, nombre);
    
                } else if (mensaje.includes("Seguidor")) {
                    mostrarSeguidor(id, nombre)
    
                }
            }

        });

        notificacion.appendChild(icono_cerrar);
        mensajes.appendChild(notificacion);
    }

    // Función para seleccionar las notificaciones
    function seleccionarNotificacion() {

        const notificaciones = [
            "❤️ Nuevo Me Gusta: A {nombre} le gustó tu publicación.",
            "💬 Nuevo Comentario: {nombre} comentó en tu publicación.",
            "📢 Nueva Mención: {nombre} te mencionó en una publicación",
            "👥 Nuevo Seguidor : {nombre} ha comenzado a seguirte"
        ];


        // Seleccionamos una notificación y una persona aleatoria
        const notificacion = notificaciones[Math.floor(Math.random() * notificaciones.length)];
        if (notificacion == notificaciones[0]) likes++;
        if (notificacion == notificaciones[3]) seguidores++;
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        
        // Reemplazamos el nombre que hemos seleccionado en la notificación
        return notificacion.replace("{nombre}", nombre);
    }

    // Función para mostrar las notificaciones
    function mostrarOcultarNotificaciones() {
        if (mensajes.classList.contains("invisible")) {
            icono_campana.src = "imgs/campana.png";
            mensajes.style.visibility = "visible";
            mensajes.classList.remove("invisible");

        } else {
            icono_campana.src = "imgs/campana_tachada.png";
            setTimeout(() => {
                mensajes.style.visibility = "hidden";
            }, 500);
            mensajes.classList.add("invisible");
            
        }
    }

    function mandar_alerta() {
        let texto_mensaje = document.getElementById('texto-enviar').value;
        let tipo_mensaje = document.getElementById('opciones-mensaje').value;
        caja_footer.classList.remove("hidden", "bg-green", "bg-gray", "bg-red");
        let texto = "";
        switch (tipo_mensaje) {
            case 'msg-error':
                texto = "❌ Error: " + texto_mensaje;
                caja_footer.classList.add('bg-red');
                break;
            case 'msg-exito':
                texto = "✅ Exito: " + texto_mensaje;
                caja_footer.classList.add('bg-green');
                break;
            case 'msg-info':
                texto = "ℹ️ Importante: " + texto_mensaje;
                caja_footer.classList.add('bg-gray');
                break;
            default:
                texto = "";
        }

        texto_msg_footer.textContent = texto;

        clearTimeout(timeout);

        // Ocultar el mensaje después de 5 segundos
        timeout = setTimeout(() => {
            caja_footer.classList.add("hidden");
        }, 5000);
    }

    // Función para mostrar un articulo
    function mostrarMeGusta(id, nombre) {
        despliegue.innerHTML = `
            <article id="${id}">
                <img src="https://picsum.photos/id/972/600/400" alt="">
                <figcaption>❤️ A ${nombre} le gustó tu publicación.</figcaption>
                <p>❤️ ${likes} Me Gustas</p>
            </article>
        `;
    }

    function mostrarComentario(id, nombre) {
        despliegue.innerHTML = `
            <article id="${id}">
                <img src="https://picsum.photos/id/972/600/400" alt="">
                <figcaption>💬 ${nombre} comentó en tu publicación.</figcaption>
                <p>${nombre}: ¡Qué chulo!</p>
            </article>
        `;
    }

    function mostrarMencion(id, nombre) {
        despliegue.innerHTML = `
            <article id="${id}">
                <img src="https://picsum.photos/id/42/600/400" alt="">
                <figcaption>📢 ${nombre} te mencionó en una publicación.</figcaption>
            </article>
        `;
    }

    function mostrarSeguidor(id, nombre) {
        despliegue.innerHTML = `<article id="${id}"> ${nombre} ha comenzado a seguirte.
        <p>👥 ${seguidores} Seguidores</p></article>`;
    }

});