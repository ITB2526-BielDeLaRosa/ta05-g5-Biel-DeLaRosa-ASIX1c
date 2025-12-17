alert("¡El archivo JS está conectado!");

/* =========================================
   1. FUNCIÓN DEL BUSCADOR (FILTRO)
   ========================================= */
function filterProjects() {
    var input = document.getElementById('searchInput');
    // Protección por si estamos en una página que no tiene buscador
    if (!input) return;

    var filter = input.value.toUpperCase();
    var groups = document.getElementsByClassName('project-group');

    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var boxes = group.getElementsByClassName('project-box');
        var hasVisibleProjects = false;

        for (var j = 0; j < boxes.length; j++) {
            var txtValue = boxes[j].textContent || boxes[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                boxes[j].style.display = "";
                hasVisibleProjects = true;
            } else {
                boxes[j].style.display = "none";
            }
        }

        if (hasVisibleProjects) {
            group.style.display = "";
        } else {
            group.style.display = "none";
        }
    }
}

/* =========================================
   2. TRANSICIÓN DE PÁGINAS (FADE IN/OUT)
   ========================================= */
window.addEventListener('load', () => {
    const transitionEl = document.querySelector('.page-transition');
    const anchors = document.querySelectorAll('a');

    // Si no existe el elemento de transición en esta página, no hacemos nada
    if (!transitionEl) return;

    // 1. Al cargar, quitamos el negro suavemente
    setTimeout(() => {
        transitionEl.classList.add('fade-out');
    }, 100);

    // 2. Detectamos clics en los enlaces
    for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];

        anchor.addEventListener('click', e => {
            if (anchor.target === '_blank') return; // Si abre pestaña nueva, ignorar
            if (anchor.getAttribute('href').startsWith('#')) return; // Si es ancla interna, ignorar

            e.preventDefault();
            let target = anchor.href;

            // Ponemos la pantalla en negro
            transitionEl.classList.remove('fade-out');

            // Esperamos 0.5s y cambiamos
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    }
});