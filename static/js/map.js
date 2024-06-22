class Map {
    constructor () 
    {
        this.map = null;
        this.mapPanel = document.getElementById("map");
        this.heat = null;
    }

    getOptions()
    {
        let val = gradient.gradient;
        let options = 
        {
            radius: parseFloat(document.getElementById("gradient-radius").value),
            blur: parseFloat(document.getElementById("gradient-blur").value),
            minOpacity: parseFloat(document.getElementById("gradient-opacity").value),
            gradient: val
        }
        return options;
    }

    updateHeatMap()
    {
        if(this.heat != null)
        {
            let options = this.getOptions();
            this.heat.setOptions(options);
        } 
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
        let options = this.getOptions();
        this.heat = L.heatLayer(main.loading.data, options).addTo(this.map);

        return this.map;
    }


}