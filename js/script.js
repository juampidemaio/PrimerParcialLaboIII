$(document).ready(function() {
    // Configuración de Slick Carousel
    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1020,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.multiple-items').css({
        'width': '80%',
        'position': 'relative',
        'left': '10%',
        'top': '-90px',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    });

    $('.multiple-items a').css({
        'margin-left': '60px',
        'margin-right': '0px'
    });

    // Añadir estilos de las media queries al elemento .multiple-items
    function AplicarMediaQueries() {
        if ($(window).width() <= 1300) {
            $('.multiple-items').css({
                'top': '-250px',
                'height': '500px'
            });
        }

        if ($(window).width() <= 1050) {
            $('.multiple-items').css({
                'width': '50%',
                'left': '25%'
            });
            $('.multiple-items a').css({
                'margin-left': '2%'
            });
        }

        if ($(window).width() <= 990) {
            $('.multiple-items').css({
                'top': '-250px',
                'height': '500px'
            });
        }

        if ($(window).width() <= 850) {
            $('.multiple-items').css({
                'width': '50%',
                'left': '25%'
            });
            $('.multiple-items a').css({
                'margin-left': '2%'
            });
        }

        if ($(window).width() <= 720) {
            $('.multiple-items a').css({
                'margin-left': '1%'
            });
        }
    }

    
    // Llamar a AplicarMediaQuerys al cargar y redimensionar la ventana
    AplicarMediaQueries();
    $(window).resize(AplicarMediaQueries);
    

   

});
// Función para mostrar/ocultar el mapa
function toggleMap(mapId) {
    var map = document.getElementById(mapId);
    if (map.style.display === "none") {
        map.style.display = "block";
    } else {
        map.style.display = "none";
    }
}
