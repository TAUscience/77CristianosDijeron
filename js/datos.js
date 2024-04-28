
/*
$(document).ready(function(){
  inicializar();
  });
*/
let popularidadAnterior=0;
let segundaOportunidad=false;
let contadorRonda=0;
let respuestasCorrectas=0;


function jugarEquipo(idEquipo){
  mostrarContestar();
  normalizarPregunta();
  estilo_equipo_activo(idEquipo);

  //Manejo de animación
  if(idEquipo===1){
    let radio=document.getElementById('juega-equipo1');
    radio.checked=true;
    noResaltarPuntuacion('puntos2', 'puntuacion-activa',animacionPuntuacion);
    animacionPuntuacion=resaltarPuntuacionActiva('puntos1', 'puntuacion-activa');
  }else{
    let radio=document.getElementById('juega-equipo2');
    radio.checked=true;
    noResaltarPuntuacion('puntos1', 'puntuacion-activa',animacionPuntuacion);
    animacionPuntuacion=resaltarPuntuacionActiva('puntos2', 'puntuacion-activa');
  }
  

}

function enviar(){
    //Evitar doble pulsación de botón
    document.getElementById('btnEnviar').disabled = true;
    setTimeout(function() {
      document.getElementById('btnEnviar').disabled = false;
    }, 3000);


    respuestasEnviadas+=1;
    let element = document.getElementById("posible-respuesta");
    let respuesta=element.value;
    let numeroIndice=preguntaNueva;

    let respuestas=obtenerRespuestas(numeroIndice);
    let valoresResp=obtenerValoresRespuestas(numeroIndice);
  
    // obtener equipo
    let valorActivo = document.querySelector('input[name="juega-equipo"]:checked').value;
    console.info("valorActivo ->"+valorActivo);

    let equipo=(valorActivo==='juega-equipo1'?1:2);
    
   
    console.info(respuestas);
    let respuestaEsIncorrecta=true;
    

    for(let i = 0; i < respuestas.length; i++){
      if(respuesta === respuestas[i]){ //Respuesta correcta
        reproducir('audio-positivo');
        respuestasCorrectas+=1;
        mostrarRespuestas();
        
        console.info("sumarPuntos ->"+sumarPuntos);
        console.info("valoresResp ->"+valoresResp[i]);
        sumarPuntos=sumarPuntos+valoresResp[i];
        console.info("sumarPuntos ->"+sumarPuntos);
        
        colocarRespuesta(i, respuestas[i], valoresResp[i], valoresResp, equipo);
        contadorRonda+=valoresResp[i]; //Sumar al contador de ronda

        if(respuestasEnviadas===1){ //¿Es la primer respuesta?
          if(respuestaMasPopular(valoresResp[i],valoresResp)){//Es la más popular?
            console.log("Es la más popular");
            if(equipo===1){actualizarPuntuacion(contador1+contadorRonda,contador2);}else{
              actualizarPuntuacion(contador1,contador2+contadorRonda);}
          }else{ //No es la más popular
            segundaOportunidad=true;
            popularidadAnterior=valoresResp[i];
            jugarEquipo((valorActivo==='juega-equipo1'?2:1)); //Cambio de equipo 2da oportunidad
            console.log("Jugando para segunda oportunidad");
          }

        }else if(segundaOportunidad){ //Es una segunda oportunidad correcta
          segundaOportunidad=false;
          if(valoresResp[i]>popularidadAnterior){ //Mayor popularidad
            if(equipo===1){actualizarPuntuacion(contador1+contadorRonda,contador2);}
            else{actualizarPuntuacion(contador1,contador2+contadorRonda);}
          }else{ //No gana en popularidad
            if(equipo===1){
              actualizarPuntuacion(contador1,contador2+contadorRonda);
              jugarEquipo(2); //Regresa el otro equipo
            }
            else{
              actualizarPuntuacion(contador1+contadorRonda,contador2);
              jugarEquipo(1); //Regresa el otro equipo
            }
          }

        }else if(respuestasCorrectas===3 || errores===2){ //Se acaban las respuestas o Robo de puntos
          reproducir("audio-ganador"); //Hay ganador
          if(equipo===1){
            contador1+=contadorRonda;
            actualizarPuntuacion(contador1,contador2);
          }
          else{
            contador2+=contadorRonda;
            actualizarPuntuacion(contador1,contador2);
          }

        }else{ //Respuestas normal
          if(equipo===1){
            actualizarPuntuacion(contador1+contadorRonda,contador2);
          }
          else{
            actualizarPuntuacion(contador1,contador2+contadorRonda);
          }
        }

        respuestaEsIncorrecta=false;
        //break;
      }else{ //Respuesta incorrecta
        console.info("NO EXISTE");
        //break;
      }
    }
    if(respuestaEsIncorrecta){
      reproducir('audio-negativo');
      errores+=1;
      actualizarErrores(errores);

      if(respuestasEnviadas===1){ //Si es la primer respuesta
        jugarEquipo((valorActivo==='juega-equipo1'?2:1)); //Cambio de equipo
        errores=0;
        actualizarErrores(0);

      }else if(segundaOportunidad){ //Segunda oportunidad fallada
        segundaOportunidad=false;
        if(equipo===1){
          actualizarPuntuacion(contador1,contador2+contadorRonda);
          jugarEquipo(2); //Regresa el otro equipo
        }
        else{
          actualizarPuntuacion(contador1+contadorRonda,contador2);
          jugarEquipo(1); //Regresa el otro equipo
        }

      }else if(errores===2){ //En caso de robo de puntos
        jugarEquipo((valorActivo==='juega-equipo1'?2:1));
        reproducir('audio-robo');
      
      }else if(errores===3){//No se logró robar puntos
        reproducir("audio-ganador"); //Hay ganador
        if(equipo===1){
          contador2+=contadorRonda;
          actualizarPuntuacion(contador1,contador2);
        }
        else{
          contador1+=contadorRonda;
          actualizarPuntuacion(contador1,contador2);
        }
      } 


    }

    //actualizarPuntuacion();
    //let idPuntos=(equipo===1?"puntos1":"puntos2");

    //let ve= document.getElementById(idPuntos);
    //ve.innerHTML=sumarPuntos;


}

function obtenerPuntaje(indice){
  r1=DB_PREGUNTA[indice].valor1;
  r2=DB_PREGUNTA[indice].valor2;
  r3=DB_PREGUNTA[indice].valor3;

  //let puntos1=document.getElementById("puntos1").value;
  //alert(puntos1);

  //document.getElementById("puntos1").value=r3;

  //alert(r3);
    return [r1,r2,r3];    
}

function colocarRespuesta(indice, respuesta, valor, valoresResp, equipo){
    
  /*
    console.info("respuesta: "+respuesta);
    console.info("valor: "+valor);
    console.info(valoresResp);
    console.info("sort ->"+valoresResp.sort());
    */

    let respuestaTexto="responseTexto"+(indice+1);
    let respuestaValor="responseValor"+(indice+1);
    let etiqquetaEquipo="puntos"+equipo;

    let rt = document.getElementById(respuestaTexto);
    let rv = document.getElementById(respuestaValor);

    console.info("etiqquetaEquipo: "+etiqquetaEquipo);

    //let ve= document.getElementById(etiqquetaEquipo);
    
    rt.innerHTML=respuesta;
    rv.innerHTML=valor;
    //ve.innerHTML=valor;
    

    
}
function siguiente(){
  console.log(contador1,contador2);
  contadorRonda=0;
  respuestasCorrectas=0;
  respuestasEnviadas=0;
  segundaOportunidad=false;
  reproducir('audio-nueva-ronda');
  limpiarRespuestas();
  esconderRespuestas();
  //document.getElementById("pregunta").innerHTML="";
  errores=0;
  actualizarErrores(errores);
  iterarPreguntas();
}

function sumarPuntosEquipo(){

}
