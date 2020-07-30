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

      //agregar el PIN
      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude)
      ]);
      this.markers.addLayer(marker);
    });
    this.kermakers.addTo(this.mapa);
  }

}