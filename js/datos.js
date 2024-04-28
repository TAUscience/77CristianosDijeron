
/*
$(document).ready(function(){
  inicializar();
  });
*/

function jugarEquipo(idEquipo){
  mostrarContestar();
  normalizarPregunta();
  estilo_equipo_activo(idEquipo);
}

function enviar(){
    let element = document.getElementById("posible-respuesta");
    let respuesta=element.value;
    let numeroIndice=preguntaNueva;

    let respuestas=obtenerRespuestas(numeroIndice);
    let valoresResp=obtenerValoresRespuestas(numeroIndice);

    // obtener equipo
    let equipo=1;
   
    console.info(respuestas);

    for(let i = 0; i < respuestas.length; i++){

      if(respuesta === respuestas[i]){
        mostrarRespuestas();

        console.info("sumarPuntos ->"+sumarPuntos);
        console.info("valoresResp ->"+valoresResp[i]);

        sumarPuntos=sumarPuntos+valoresResp[i];

        console.info("sumarPuntos ->"+sumarPuntos);
        

        colocarRespuesta(i, respuestas[i], valoresResp[i], valoresResp, 1);
        break;
      }else{
        console.info("NO EXISTE");
        //break;
      }
    }

    let ve= document.getElementById("puntos1");

    ve.innerHTML=sumarPuntos;


}

function obtenerPuntaje(indice){
  r1=DB_PREGUNTA[indice].valor1;
  r2=DB_PREGUNTA[indice].valor2;
  r3=DB_PREGUNTA[indice].valor3;

  let puntos1=document.getElementById("puntos1").value;
  //alert(puntos1);

  document.getElementById("puntos1").value=r3;

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

    let ve= document.getElementById(etiqquetaEquipo);
    
    rt.innerHTML=respuesta;
    rv.innerHTML=valor;
    ve.innerHTML=valor;
    

    
}
function siguiente(){
  limpiarRespuestas();
  esconderRespuestas();
  document.getElementById("pregunta").innerHTML="";

  iterarPreguntas();
}

function sumarPuntosEquipo(){

}
