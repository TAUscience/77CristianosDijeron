// Definimos el número de repeticiones deseado
const n_preguntas = DB_PREGUNTA.length-1; //Longitud de la lista de preguntas
console.log(n_preguntas);
//Puntaje de cada equipo
let contador1=0; 
let contador2=0; 

let preguntaNueva;
let preguntasUsadas=[];  //Almacena indices de preguntas que ya ocurrieron

let sumarPuntos=0;


function inicializar(){
    esconderRespuestas();
    esconderContestar();
    iterarPreguntas();
    limpiarRespuestas();


}



function iterarPreguntas(){

    console.log(preguntasUsadas.length);

    if(preguntasUsadas.length<n_preguntas){
        console.log(preguntasUsadas);
        preguntaNueva=indicePreguntaAleatoria(preguntasUsadas,1,n_preguntas)
  
        manejoInicialPregunta(preguntaNueva);
        
        let animacionPuntuacion=resaltarPuntuacionActiva('puntos2', 'puntuacion-activa');
        //console.log("Iteración número", i + 1);
     
        //Agregar pregunta actual a lista de preguntas usadas
        preguntasUsadas.push(preguntaNueva);

        console.info("Id pregunta: "+preguntaNueva);
        //console.info("pregunta: "+obtenerPregunta(preguntaNueva));
        console.info("numeroIndice ->"+obtenerRespuestas(preguntaNueva));
    }
    else{
        preguntaNueva=0;
        manejoInicialPregunta(preguntaNueva);
    }
}





//noResaltarPuntuacion('puntos1', 'puntuacion-activa',animacionPuntuacion)
