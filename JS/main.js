document.addEventListener("DOMContentLoaded", function() {

    // --- 1. TRANSICIONES DE PÁGINA (Funciona en todas) ---
    const transitionEl = document.querySelector('.page-transition');

    if (transitionEl) {
        // Al entrar: quitamos el negro
        setTimeout(() => {
            transitionEl.classList.add('fade-out');
        }, 100);

        // Al salir: ponemos el negro
        const anchors = document.querySelectorAll('a');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', e => {
                if (anchor.target === '_blank' || anchor.getAttribute('href').startsWith('#')) return;

                e.preventDefault();
                let target = anchor.href;
                transitionEl.classList.remove('fade-out');
                setTimeout(() => { window.location.href = target; }, 500);
            });
        });
    }

    // --- 2. BUSCADOR (Solo funciona si existe el input) ---
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterProjects);
    }
});

function filterProjects() {
    var input = document.getElementById('searchInput');
    var filter = input.value.toUpperCase();
    var groups = document.getElementsByClassName('project-group');

    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var boxes = group.getElementsByClassName('project-box');
        var hasVisible = false;

        for (var j = 0; j < boxes.length; j++) {
            var txt = boxes[j].textContent || boxes[j].innerText;
            if (txt.toUpperCase().indexOf(filter) > -1) {
                boxes[j].style.display = "";
                hasVisible = true;
            } else {
                boxes[j].style.display = "none";
            }
        }
        // Ocultar grupo si está vacío
        group.style.display = hasVisible ? "" : "none";
    }
}