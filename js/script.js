function mostrarMensaje() {
    alert("Reserva realizada");
    window.location.href = "index.html";
    return false; 
}
document.addEventListener("DOMContentLoaded", function() {
    const btnReserva = document.getElementById("btn-reserva");
    const inputNoches = document.getElementById("noches1");
    const precioTotalElement = document.getElementById("precioTotal1");
    
    function calcularTotal(precioPorNoche, noches) {
        const total = precioPorNoche * noches;
        precioTotalElement.textContent = `$${total}`;
        return total;
    }
    
    inputNoches.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const precioTotal = calcularTotal(1500000, parseInt(inputNoches.value));
        }
    });
    
    btnReserva.addEventListener("click", function() {
        const precioTotal = calcularTotal(1500000, parseInt(inputNoches.value));
        const url = `Reserva.html?costoTotal=${precioTotal}`;
        window.location.href = url;
    });
});