class UI {
  constructor() {

    // instanciar la API
    this.api = new API();

    // crear los markers con layerGroup
    this.markers = new L.LayerGroup();

    // Iniciar el mapa
    this.mapa = this.inicializarMapa();

  }

  inicializarMapa() {
    // Inicializar y obtener la propiedad del mapa
    const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
    const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + enlaceMapa + ' Contributors',
        maxZoom: 18,
        }).addTo(map);
    return map;

  }

  mostrarEstablecimientos(){
    this.api.obtenerDatos()
        .then(datos => {
          const resultado = datos.respuestaJSON.results;

          // ejecutar la funcion para mostrar los pines
          this.mostrarPines(resultado);
        })
  }

  mostrarPines(datos){
    //limpiar los markers
    this.markers.crearLayers();

    //recorrer los establecimientos
    datos.forEach(dato => {
      //destructuring
      const {latitude, longitude, calle, regular, premium} = dato;

      //crear popup o tooltip
      const opcionesPopUp = L.popup()
            .setContent(`
              <p>Calle: ${calle}</p>
              <p><b>Regular</b> $ ${regular}</p>
              <p><b>Premium: $ ${premium}</b></p>
            `);

      //agregar el PIN
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]).bindPopup(opcionesPopUp);
      this.markers.addLayer(marker);
    });
    this.kermakers.addTo(this.mapa);
  }

  //buscador
  obtenerSugerencias(busqueda){
    this.api.obtenerDatos()
        .then(datos => {
          //obtener los datos
          const resultados = datos.respuestaJSON.results;

          //enviar el JSON y la busqueda para el filtrado
          this.filtrarSugerencias(resultados, busqueda);
        })
  }
  //filtra las sugerencias en base al input
  filtrarSugerencias(resultado, busqueda){
    //filtrar con .filter
    const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1); // aca recorremos todos los items y devolvemos todos los que coincidan con la busqueda, el -1 no existe en un array por lo que decir !== es que sea contrario a.

    //mostrar los pines
    this.mostrarPines(filtro);
  }

}