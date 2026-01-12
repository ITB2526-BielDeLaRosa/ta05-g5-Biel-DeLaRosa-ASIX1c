document.addEventListener("DOMContentLoaded", function() {
    const transitionEl = document.querySelector('.page-transition');

    if (transitionEl) {
        // Al entrar: quitamos el telón
        setTimeout(() => {
            transitionEl.classList.add('reveal');
        }, 100);

        // Al salir: ponemos el telón
        const anchors = document.querySelectorAll('a');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', e => {
                if (anchor.target === '_blank' || anchor.getAttribute('href').startsWith('#')) return;

                e.preventDefault();
                let target = anchor.href;

                transitionEl.classList.remove('reveal'); // Reset
                transitionEl.classList.add('cover');     // Animación entrar

                setTimeout(() => {
                    window.location.href = target;
                }, 600);
            });
        });
    }

    // 2. ACTIVAR EL BUSCADOR (Si existe en la página)
    const input = document.getElementById('searchInput');
    if (input) {
        // Escuchamos cuando alguien escribe
        input.addEventListener('keyup', ejecutarBuscador);
    }
});


// 3. FUNCIÓN DEL BUSCADOR (FUERA para que sea global)
function ejecutarBuscador() {
    // A. Cogemos el texto
    var input = document.getElementById('searchInput');
    var filter = input.value.toUpperCase();

    // B. Cogemos TODOS los proyectos (cajas)
    var boxes = document.getElementsByClassName('project-box');

    // C. Primero filtramos las CAJAS individuales
    for (var i = 0; i < boxes.length; i++) {
        var txtValue = boxes[i].textContent || boxes[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            boxes[i].style.display = ""; // Mostrar
        } else {
            boxes[i].style.display = "none"; // Ocultar
        }
    }

    // D. Ahora miramos los GRUPOS (Títulos) - Si existen
    var groups = document.getElementsByClassName('project-group');
    if (groups.length > 0) {
        for (var j = 0; j < groups.length; j++) {
            var group = groups[j];
            // Buscamos si hay alguna caja visible dentro de este grupo
            var visibleBoxes = group.querySelectorAll('.project-box:not([style*="display: none"])');

            if (visibleBoxes.length > 0) {
                group.style.display = ""; // Mostrar título
            } else {
                group.style.display = "none"; // Ocultar título vacío
            }
        }
    }
}