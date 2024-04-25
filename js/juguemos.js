// Definimos el número de repeticiones deseado
const n_preguntas = DB_PREGUNTA.length; //Longitud de la lista de preguntas

//Puntaje de cada equipo
let contador1=300; 
let contador2=220; 

// Bucle for que se repetirá n veces
for (let i = 0; i < n_preguntas; i++) {
    let preguntasUsadas=[]; //Almacena indices de preguntas que ya ocurrieron

    actualizarPuntuacion(contador1,contador2);
    actualizarErrores(1);
    esconderRespuestas();

    let preguntaNueva=indicePreguntaAleatoria(preguntasUsadas,0,n_preguntas-1)
    manejoInicialPregunta(preguntaNueva);
    
    //mostrarRespuestas()
    let animacionPuntuacion=resaltarPuntuacionActiva('puntos2', 'puntuacion-activa');
    console.log("Iteración número", i + 1);
    


    //Agregar pregunta actual a lista de preguntas usadas
    preguntasUsadas.push(preguntaNueva);
}




//noResaltarPuntuacion('puntos1', 'puntuacion-activa',animacionPuntuacion)
