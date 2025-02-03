// Evento que se ejecuta al cargar el contenido del DOM
document.addEventListener('DOMContentLoaded', function (event) {

    // Constantes del DOM
    const boton_error = document.getElementById("boton_error");
    const boton_exito = document.getElementById("boton_exito");
    const boton_info = document.getElementById("boton_info");


    // Variables

    // Eventos
    boton_error.addEventListener("click", () => mostrarMensajeFooter('error'));
    boton_exito.addEventListener("click", () => mostrarMensajeFooter('exito'));
    boton_info.addEventListener("click", () => mostrarMensajeFooter('info'));

    // Funciones

    //FUNCION PARA MOSTRAR AVISOS EN EL FOOTER
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
})