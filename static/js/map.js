class Map {
    /**
     * The constructor function initializes variables for a map, map panel, and heat map in JavaScript.
     */
    constructor() {
        this.map = null;
        this.mapPanel = document.getElementById("map");
        this.heat = null;
    }

    /**
     * The function `getOptions` retrieves user input values for radius, blur, minOpacity, and
     * gradient.
     * @returns The `getOptions()` function is returning an object with the following properties:
     */
    getOptions() {
        return {
            radius: parseFloat(document.getElementById("gradient-radius").value),
            blur: parseFloat(document.getElementById("gradient-blur").value),
            minOpacity: parseFloat(document.getElementById("gradient-opacity").value),
            gradient: gradient.gradient
        };
    }

    /**
     * The `updateHeatMap` function updates the options of a heat map if it exists.
     */
    updateHeatMap() {
        if (this.heat) {
            this.heat.setOptions(this.getOptions());
        }
    }

    /**
     * The function `createTileLayer` creates a tile layer with specified URL, maximum zoom level, and
     * attribution.
     * @param url - The `url` parameter is the URL template for the tile layer. It specifies the
     * location from which the tiles will be loaded for the map layer.
     * @param [maxZoom=12] - The `maxZoom` parameter specifies the maximum zoom level at which the tile
     * layer will be displayed on the map. In this case, the default value is set to 12 if not provided
     * explicitly.
     * @param [attribution] - The `attribution` parameter in the `createTileLayer` function is used to
     * specify the attribution information for the tile layer. This information typically includes
     * credits to the data source or map provider. If provided, it will be displayed on the map to give
     * credit to the appropriate parties for the map data
     * @returns A Leaflet tile layer with the specified URL, maximum zoom level, and attribution is
     * being returned.
     */
    createTileLayer(url, maxZoom = 12, attribution = '') {
        return L.tileLayer(url, { maxZoom, attribution });
    }

    /**
     * The `createMap` function sets up a Leaflet map with different base tile layers and a heat layer
     * using specified data and options.
     * @returns The `createMap()` function returns the Leaflet map object that is created with
     * specified base maps, layers, and controls.
     */
    createMap() {
        const baseMaps = {
            "osm": this.createTileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
            "osm hot": this.createTileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'),
            "topo": this.createTileLayer('https://tile.tracestrack.com/topo__/{z}/{x}/{y}.png'),
            "cycle": this.createTileLayer('https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png')
        };

        this.map = L.map('map-canvas', {
            center: [51, 10],
            zoom: 5,
            layers: [baseMaps.osm]
        });

        L.control.layers(baseMaps).addTo(this.map);
        this.heat = L.heatLayer(main.loading.data, this.getOptions()).addTo(this.map);

        return this.map;
    }
}
