import peliculas from './peliculas.js';
            
//variables que traemos del DOM
const input = document.querySelector('#buscador');
const calificacion = document.querySelector('#calificacion');
const resultado = document.querySelector('#filtrado');

//filtrar segun lo ingresado en el input del HTML
input.addEventListener('input', (e) => {
    let keyword = e.target.value;
    if(keyword.length >= 1){
        const resultados = peliculas.filter((pelicula) => {
            const regex = new RegExp(keyword,'gi');
            return pelicula.nombre.match(regex);
        })
        mostrarPeliculas(resultados);
    }
})

//Objeto con datos del select
const datoFiltrado = {
    calificacion : ''
}

//forma de leer el cambio de un select es "change"
// e = para leer el valor
calificacion.addEventListener('change', e => {
    datoFiltrado.calificacion = e.target.value;
    filtrarCal();
})


function filtrarCal(){
    const resultado = peliculas.filter(filtrarCalificacion);
    if(resultado.length){
        mostrarPeliculas(resultado);
    }else{
        sinResultado();
    }
}

function sinResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta');
    noResultado.textContent = 'No hay resultados...';
    resultado.appendChild(noResultado);
}


function filtrarCalificacion(pelicula){
    const {calificacion} = datoFiltrado;
    if(calificacion){
        return pelicula.calificacion === calificacion;
    }
    return pelicula;
}

//Mostrar en el HTML
function mostrarPeliculas(peliculas){
    limpiarHTML();
    peliculas.forEach(pelicula => {
        const {calificacion, nombre, url, director, clasificacion} = pelicula;
        
        const pCalificacion = document.createElement('p');
        const pDirector = document.createElement('p');
        const pClasificacion = document.createElement('p');
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");
        
        resultado.appendChild(div);
        
        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(pCalificacion);
        div.appendChild(pDirector);
        div.appendChild(pClasificacion);

        div.classList.add('card_pelicula');

        img.src = url;
        h2.innerText = nombre;
        pCalificacion.innerText = `Calificación: ${calificacion}`;
        pDirector.innerText = `Director: ${director}`;
        pClasificacion.innerText = `Clasificación: ${clasificacion}`;
    })
}


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

