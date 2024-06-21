class Map {
    constructor () 
    {
        this.map = null;
        this.mapPanel = document.getElementById("map");
    }

    createMap()
    {

        let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ''
        });

        let osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ''
        });

        let topo = L.tileLayer('https://tile.tracestrack.com/topo__/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ''
        });

        let cycle = L.tileLayer('https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
            maxZoom: 19,
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

        

        return this.map;
    }


}