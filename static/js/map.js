class Map {
    /**
     * The constructor function initializes variables for a map, map panel, and heat map in JavaScript.
     */
    constructor() {
        this.map = null;
        this.mapPanel = document.getElementById("map");
        this.heat = null;
        this.loadOptions();
    }


    saveOptions()
    {
        localStorage.setItem("save", true);
        localStorage.setItem("radius", document.getElementById("gradient-radius").value);
        localStorage.setItem("blur", document.getElementById("gradient-blur").value);
        localStorage.setItem("opacity", document.getElementById("gradient-opacity").value);
        
        let panel = document.getElementById('heatmap-gradient-container')
        let inputs = panel.getElementsByTagName('input')
        let gradient = {}

        for (let i = 0; i < inputs.length; i += 2) {
        if (
            inputs[i].type === 'color' &&
            inputs[i + 1] &&
            inputs[i + 1].type !== 'color'
        ) {
            let color = inputs[i].value
            let position = parseFloat(inputs[i + 1].value) * 100
            gradient[position] = color
        }
        }

        localStorage.setItem("gradient", JSON.stringify(gradient));

        console.log("options saved!")
    }

    resetOptions()
    {
        localStorage.setItem("save", true);
        localStorage.setItem("gradient", '{"0":"#4287f5","100":"#fa1616","20":"#42f545","80":"#f5ec42","90":"#d6660b"}');
        localStorage.setItem("radius", 25);
        localStorage.setItem("blur", 15);
        localStorage.setItem("opacity", 1);

        document.getElementById("gradient-radius").value = localStorage.getItem('radius');
        document.getElementById("gradient-blur").value = localStorage.getItem('blur');
        document.getElementById("gradient-opacity").value = localStorage.getItem('opacity');

        let gradientDict = {"0":"#4287f5","100":"#fa1616","20":"#42f545","80":"#f5ec42","90":"#d6660b"}

        const entries = Object.entries(gradientDict);
        entries.sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]));
        gradientDict = Object.fromEntries(entries);
        gradient.removeAllColors();
        for (const key in gradientDict) {
            if (gradientDict.hasOwnProperty(key)) {
                const value = gradientDict[key];
                gradient.addNewColor(value, parseFloat(key)/100);
            }
        }

        this.updateHeatMap();

        console.log("options reset")
    }

    loadOptions()
    {   
        let isSaved = true;

        if (localStorage.getItem("save") === null) {isSaved = false}
        
        if(isSaved)
        {
            console.log("loading saved options")
            document.getElementById("gradient-radius").value = localStorage.getItem('radius');
            document.getElementById("gradient-blur").value = localStorage.getItem('blur');
            document.getElementById("gradient-opacity").value = localStorage.getItem('opacity');

            let di = JSON.parse(localStorage.getItem('gradient'))

            const entries = Object.entries(di);
            entries.sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]));
            let gradientDict = Object.fromEntries(entries);
            gradient.removeAllColors();
            for (const key in gradientDict) {
                if (gradientDict.hasOwnProperty(key)) {
                    const value = gradientDict[key];
                    gradient.addNewColor(value, parseFloat(key)/100);
                }
            }
            
        }
        else
        {
            console.warn("no save detected!")
        }


        

        this.updateHeatMap();
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
