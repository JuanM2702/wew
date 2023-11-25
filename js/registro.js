document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registro-form");
    const mensajeDiv = document.getElementById("mensaje");

    registroForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
       
        mensajeDiv.textContent = "Registro exitoso. ¡Bienvenido, " + nombre + "!";
        
        registroForm.reset();
    });
});
