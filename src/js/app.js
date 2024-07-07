document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
    navegacionFija();
    resaltarEnlace();
    scrollNav()
} )
const rutaImagenes = "src/img/gallery/full/";

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector(".sobre-festival");

    document.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add("fixed");
        }else {
            header.classList.remove("fixed");
        }
    })
}
function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;
     
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement("img");
        imagen.alt = "imagen Galeria";
        imagen.src = `${rutaImagenes}${i}.jpg`;

        // Event Handler usando un closure para capturar el valor actual de i
        imagen.onclick = (function(index) {
            return function() {
                mostrarImagen(index);
            }
        })(i);

        galeria.appendChild(imagen);
    }
}

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')
 
        let actual = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3 ) ) {
                actual = section.id
            }
        })
 
        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function mostrarImagen(i) {
    // Generar Modal
    const modal = document.createElement('div'); // Creo un div para el modal
    modal.classList.add('modal'); // Agrego la clase 'modal' al div modal

    // Crear imagen dentro del modal
    const imagenModal = document.createElement('img');
    imagenModal.src = `${rutaImagenes}${i}.jpg`; // Ruta completa de la imagen grande
    imagenModal.alt = 'Imagen de Galería';

    // Agregar la imagen al modal
    modal.appendChild(imagenModal);

    // Agregar el modal al cuerpo del documento
    document.body.appendChild(modal);

    // Establecer estilos para el modal (por ejemplo, para que sea visible)
    modal.style.display = 'block'; // Mostrar el modal

    // Agregar evento para cerrar el modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function() {
        modal.remove(); // Eliminar el modal al hacer clic fuera de la imagen
    });
}
function scrollNav() {
    const navLinks = document.querySelectorAll(".navegacion-principal a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute("href");
            const sectionId = sectionScroll.substring(1); // Elimina el primer carácter '#'
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}


 