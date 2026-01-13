document.addEventListener("DOMContentLoaded", function() {

    // ===============================================
    // 1. TRANSICIONES DE PÁGINA (APARECER)
    // ===============================================
    setTimeout(() => {
        document.body.classList.add('fade-in');
    }, 10);


    // ===============================================
    // 2. EFECTO DE SALIDA (DESAPARECER)
    // ===============================================
    const anchors = document.querySelectorAll('a');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', e => {
            // Ignoramos enlaces que abren pestaña nueva o anclas #
            if (anchor.target === '_blank' || anchor.getAttribute('href').startsWith('#')) {
                return;
            }

            e.preventDefault();
            let target = anchor.href;

            // Quitamos la clase 'fade-in' -> LA WEB SE VUELVE TRANSPARENTE
            document.body.classList.remove('fade-in');

            // Esperamos 0.5 segundos y cambiamos
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });


    // ===============================================
    // 3. BUSCADOR (SEARCH BAR)
    // ===============================================
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                var term = searchInput.value.toLowerCase();
                if (term.trim() === "") return;

                var titles = document.getElementsByClassName('section-title');
                var found = false;

                for (var i = 0; i < titles.length; i++) {
                    var titleText = titles[i].innerText.toLowerCase();
                    if (titleText.includes(term)) {
                        titles[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
                        found = true;
                        break;
                    }
                }

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

    // ===============================================
    // 4. NUEVO: BOTÓN VOLVER ARRIBA (BACK TO TOP)
    // ===============================================
    // Esto es lo nuevo que hemos añadido:

    const btnScroll = document.getElementById('btnScrollToTop');

    if (btnScroll) {
        // A. DETECTAR SCROLL PARA MOSTRAR/OCULTAR
        window.addEventListener('scroll', function() {
            // Si bajamos más de 300px, mostramos el botón
            if (window.scrollY > 300) {
                btnScroll.classList.add('show');
            } else {
                btnScroll.classList.remove('show');
            }
        });

        // B. AL HACER CLIC, SUBIR SUAVEMENTE
        btnScroll.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});