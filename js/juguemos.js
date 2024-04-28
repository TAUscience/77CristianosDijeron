// Definimos el número de repeticiones deseado
const n_preguntas = DB_PREGUNTA.length; //Longitud de la lista de preguntas

//Puntaje de cada equipo
let contador1=0; 
let contador2=0; 

let preguntaNueva;
let sumarPuntos=0;


function inicializar(){
    esconderRespuestas();
    esconderContestar();
    iterarPreguntas();
    limpiarRespuestas();


}



function iterarPreguntas(){

        // Bucle for que se repetirá n veces
    for (let i = 0; i < n_preguntas; i++) {
        let preguntasUsadas=[]; //Almacena indices de preguntas que ya ocurrieron

        actualizarPuntuacion(contador1,contador2);
        actualizarErrores(1);
        //esconderRespuestas();

        preguntaNueva=indicePreguntaAleatoria(preguntasUsadas,0,n_preguntas-1)
  
        manejoInicialPregunta(preguntaNueva);
        
        //mostrarRespuestas()
        let animacionPuntuacion=resaltarPuntuacionActiva('puntos2', 'puntuacion-activa');
        //console.log("Iteración número", i + 1);
     
        //Agregar pregunta actual a lista de preguntas usadas
        preguntasUsadas.push(preguntaNueva);
    }

    console.info("Id pregunta: "+preguntaNueva);
    //console.info("pregunta: "+obtenerPregunta(preguntaNueva));
    console.info("numeroIndice ->"+obtenerRespuestas(preguntaNueva));
}





//noResaltarPuntuacion('puntos1', 'puntuacion-activa',animacionPuntuacion)
