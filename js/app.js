const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  ui.mostrarEstablecimientos();
});

//habilitar busqueda de establecimientos
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
  //empezar a buscar cuando escribamos al menos 5 letras
  if(buscador.nodeValue.length > 5){
    //buscar en la API
    ui.obtenerSugerencias(buscador.value);
  }else{
    ui.mostrarEstablecimientos();
  }
})