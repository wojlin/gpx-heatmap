class Map {
    constructor () 
    {
        this.map = null;
        this.mapPanel = document.getElementById("map");
    }

    createMap()
    {

        let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 12,
            attribution: ''
        });

        let osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 12,
            attribution: ''
        });

        let topo = L.tileLayer('https://tile.tracestrack.com/topo__/{z}/{x}/{y}.png', {
            maxZoom: 12,
            attribution: ''
        });

        let cycle = L.tileLayer('https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
            maxZoom: 12,
            attribution: ''
        });

        let baseMaps = {
            "osm": osm,
            "osm hot": osmHOT,
            "topo": topo,
            "cycle": cycle,
        };


        this.map = L.map('map-canvas', {
            center: [51, 0],
            zoom: 5,
            layers: [osm]
        });

        let layerControl = L.control.layers(baseMaps).addTo(this.map);

        let gradient = {0.4: 'blue', 0.65: 'lime', 0.80: 'yellow', 0.94: 'orange', 1: 'red'}
        let options = {radius: 18, max: 1, blur: 15, maxZoom:10, gradient: gradient}
        let heat = L.heatLayer(main.loading.data, options).addTo(this.map);

        return this.map;
    }


}