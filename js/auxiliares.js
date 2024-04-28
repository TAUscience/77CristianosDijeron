// Animación que quita y pone una clase cada segundo, recibe un id que será el objeto que se animará y una clase
function resaltarPuntuacionActiva(elementId, className) {
    let element = document.getElementById(elementId);
    let toggle = true;
  
    if (!element) {
      console.error("Element with id '" + elementId + "' not found.");
      return;
    }
  
    let intervalo = window.setInterval(function() {
      if (toggle) {
        element.classList.add(className); // Agrega la clase CSS
      } else {
        element.classList.remove(className); // Quita la clase CSS
      }
      toggle = !toggle; // Alterna entre true y false cada segundo
    }, 1000);
    return intervalo // Regresa un intervalo que es lo que mantendrá activa la animación
}
// Detener la animación, recibe algún intervalo creado previamente y lo limpia 
// además se asegura de dejar el elemento con la clase css de interés
function noResaltarPuntuacion(elementId,className,intervalo){
  clearInterval(intervalo)
  var element = document.getElementById(elementId);
  element.classList.remove(className);
}
// Recibe valores enteros p1 y p2 que colocará en los marcadores de puntos 1 y 2 respectivamente
function actualizarPuntuacion(p1,p2){
  let pnts1 = document.getElementById("puntos1");
  let pnts2 = document.getElementById("puntos2");
  pnts1.innerHTML=p1;
  pnts2.innerHTML=p2;
}


function esconderContestar(){
  let element = document.getElementById("contestar");
  element.classList.add("oculto");
  //let element2 = document.getElementById("introducir-respuesta")
  //element2.classList.add("oculto");
}

function mostrarContestar(){
  let element = document.getElementById("contestar");
  element.classList.remove("oculto");
}


// Oculta toda la interfaz de respuestas
function esconderRespuestas(){
  let element = document.getElementById("respuestas");
  element.classList.add("oculto");
  let element2 = document.getElementById("introducir-respuesta")
  //element2.classList.add("oculto");
}
// Vuelve a desplegar la interfaz de respuestas
function mostrarRespuestas(){
  let element = document.getElementById("respuestas");
  element.classList.remove("oculto");
  let element2 = document.getElementById("introducir-respuesta")
  element2.classList.remove("oculto");
}
// Obtiene las 3 cadenas de caracteres correspondientes a cada respuesta de una pregunta
function obtenerRespuestas(indice){ // Recibe un indice entero como entrada que es el indice de la pregunta en el vector de preguntas
  r1=DB_PREGUNTA[indice].respuesta1;
  r2=DB_PREGUNTA[indice].respuesta2;
  r3=DB_PREGUNTA[indice].respuesta3;

  return [r1,r2,r3]; // Devuelve una lista de 3 elementos con las 3 respuesta en cadenas
}

/*
obtenerValoresRespuestas
@param indice Obtener que busca en el vector la información solicitada.
Response Regresa 3 respuestas.
*/
function obtenerValoresRespuestas(indice){ 
  v1=DB_PREGUNTA[indice].valor1;
  v2=DB_PREGUNTA[indice].valor2;
  v3=DB_PREGUNTA[indice].valor3;

  return [v1,v2,v3];
}

// Coloca la interfaz de la pregunta en la posición normal
function normalizarPregunta(){
  let element = document.getElementById("pregunta")
  element.classList.remove("exponer-pregunta");
}
// Obtiene un indice de pregunta aleatorio y verifica que ese indice no haya pasado antes
function indicePreguntaAleatoria(preguntasPasadas,min,max){ //Recibe un arreglo de indices que ya ocurrieron y el valor max y min de indices disponibles
  proximaPregunta=Math.floor(Math.random() * (max - min + 1)) + min;
  while (preguntasPasadas.includes(proximaPregunta)){
    proximaPregunta=Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return proximaPregunta;
}
// Obtiene la cadena de caracteres correspondiente a la pregunta que está en el indice que recibe de entrada
function obtenerPregunta(indice){
  return DB_PREGUNTA[indice].pregunta;
}
// Realiza una dinámica inicial con la interfaz de pregunta recibe el indice de la pregunta deseada
function manejoInicialPregunta(indice){
  let preguntaTexto=obtenerPregunta(indice); //Obtiene la cadena de caract. de la pregunta

  //Ocultar pregunta - Muestra una interfaz de pregunta (clase css pregunta-oculta) donde no está la pregunta sino un texto
  let element =document.getElementById("pregunta");
  element.classList.add("pregunta-oculta");
  element.innerHTML="Mostrar pregunta..."; //Texto que se despliega

  //Exponer pregunta - Espera un click para mostrar la pregunta y hacer un cambio de interfaz 
  element.addEventListener("click", function(){
    element.classList.remove("pregunta-oculta");
    element.classList.add('exponer-pregunta'); //Texto de pregunta
    element.innerHTML=preguntaTexto;  
  });
}


// Cambia el marcador de errores
function actualizarErrores(errores){ //El numero entero que recibe, define la cantidad de errores
  let element = document.getElementById('img-strikes');
  // Para cada numero entero entre 0 y 2 se cambia el marcador de errores mediante imagenes 
  if(errores===0){
    element.src="imagenes/error0.png"; //Imagen para 0 errores 
  } else if (errores===1){
    element.src="imagenes/error1.png";
  } else {
    element.src="imagenes/error2.png";
  }
}

// generar un numero entero aleatorio en un rango [max,min] 
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function limpiarRespuestas(){
    document.getElementById("responseTexto1").innerHTML="";
    document.getElementById("responseValor1").innerHTML="";

    document.getElementById("responseTexto2").innerHTML="";
    document.getElementById("responseValor2").innerHTML="";

    document.getElementById("responseTexto3").innerHTML="";
    document.getElementById("responseValor3").innerHTML="";

    document.getElementById("puntos1").innerHTML="";
   
}

function estilo_equipo_activo(idEquipo){
  if(idEquipo==1){
    lbl_activo=document.getElementById("label-equipo1");
    lbl_activo.classList.add("label-equipo-seleccionado");
    lbl_activo.classList.remove("label-equipo");

    lbl_inactivo=document.getElementById("label-equipo2");
    lbl_inactivo.classList.add("label-equipo");
    lbl_inactivo.classList.remove("label-equipo-seleccionado");
  }else{
    lbl_activo=document.getElementById("label-equipo2");
    lbl_activo.classList.add("label-equipo-seleccionado");
    lbl_activo.classList.remove("label-equipo");

    lbl_inactivo=document.getElementById("label-equipo1");
    lbl_inactivo.classList.add("label-equipo");
    lbl_inactivo.classList.remove("label-equipo-seleccionado");
  }
}

function bloquearEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    return false;
  }
}