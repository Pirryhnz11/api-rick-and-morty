
const urlAPI = "https://rickandmortyapi.com/api/character";


// Función encargada de ocultar la Pantalla 1 y mostrar la Pantalla 2

function irAPantalla2() { 
    document.getElementById("pantalla-inicio").classList.add("hidden");
    document.getElementById("pantalla-personajes").classList.remove("hidden");
    obtenerDatosDeAPI();
} 


// Función encargada de ocultar la Pantalla 2 y restaurar la Pantalla 1
function irAPantalla1() { 
    document.getElementById("pantalla-inicio").classList.remove("hidden");
    document.getElementById("pantalla-personajes").classList.add("hidden");
} 

// Función principal para obtener los datos.
function obtenerDatosDeAPI() { 
    document.getElementById("mensaje-cargando").style.display = "block";
    document.getElementById("contenedor-tarjetas").innerHTML = "";

    fetch(urlAPI) // Solicita la información
        .then(function(respuesta) { 
            return respuesta.json(); 
        })
        .then(function(datos) { 
            document.getElementById("mensaje-cargando").style.display = "none";
            const personajes = datos.results;
            const contenedor = document.getElementById("contenedor-tarjetas");

            for (let i = 0; i < 6; i = i + 1) {

                // Guarda la información del personaje actual
                const personajeActual = personajes[i];
                // Construcción visual de la tarjeta con estilo Tailwind CSS
                const tarjetaHTML = `
                    <div class="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 flex flex-col items-center hover:scale-105 transition duration-300">
                        <img src="${personajeActual.image}" alt="${personajeActual.name}" class="w-32 h-32 rounded-full mb-4 border-2 border-emerald-400">
                        <h3 class="text-xl font-bold text-white mb-1">${personajeActual.name}</h3>
                        <p class="text-sm text-slate-400">Especie: <span class="text-slate-200">${personajeActual.species}</span></p>
                        <p class="text-sm text-slate-400">Estado: <span class="text-slate-200">${personajeActual.status}</span></p>
                    </div>
                `;

                // Inserta la tarjeta en la pantalla
                contenedor.innerHTML = contenedor.innerHTML + tarjetaHTML;

            } 
        })
        .catch(function(error) { 
            document.getElementById("mensaje-cargando").innerText = "No se pudieron cargar los datos en este momento.";
            console.log("Detalles del error: ", error);
        });
} 