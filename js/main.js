document.addEventListener("DOMContentLoaded", function() {

    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        // Detectamos cuando pulsas una tecla dentro del buscador
        searchInput.addEventListener('keydown', function(e) {

            // Solo actuamos si la tecla es ENTER
            if (e.key === 'Enter') {
                e.preventDefault(); // Evitamos que se recargue la página

                // 1. Cogemos lo que has escrito (en minúsculas)
                var term = searchInput.value.toLowerCase();
                if (term.trim() === "") return; // Si está vacío no hacemos nada

                // 2. Buscamos todos los TÍTULOS de sección
                var titles = document.getElementsByClassName('section-title');
                var found = false;

                // 3. Recorremos los títulos para ver si alguno coincide
                for (var i = 0; i < titles.length; i++) {
                    var titleText = titles[i].innerText.toLowerCase();

                    // Si el título contiene la palabra (ej: "CSS" dentro de "CSS & DESIGN")
                    if (titleText.includes(term)) {

                        // --- AQUÍ ESTÁ LA CLAVE: HACEMOS SCROLL HASTA EL TÍTULO ---
                        titles[i].scrollIntoView({
                            behavior: 'smooth', // Desplazamiento suave
                            block: 'start'
                        });

                        found = true;
                        break; // Paramos de buscar, ya lo hemos encontrado
                    }
                }

                // (Opcional) Si no encontramos título, buscamos en las cajas de proyectos
                if (!found) {
                    var boxes = document.getElementsByClassName('project-box');
                    for (var j = 0; j < boxes.length; j++) {
                        if (boxes[j].innerText.toLowerCase().includes(term)) {
                            boxes[j].scrollIntoView({ behavior: 'smooth', block: 'center' });
                            break;
                        }
                    }
                }
            }
        });
    }
});
