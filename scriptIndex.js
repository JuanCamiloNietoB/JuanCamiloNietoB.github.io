// Mostrar/ocultar los botones según el estado del checkbox
document.getElementById('toggleButtons').addEventListener('change', function() {
    const buttons = document.getElementById('buttons');
    if (this.checked) {
        buttons.style.display = 'block'; // Mostrar botones
    } else {
        buttons.style.display = 'none'; // Ocultar botones
    }
});