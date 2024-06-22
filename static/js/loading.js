class Loading {
    constructor () 
    {
        this.loadingPanel = document.getElementById("loading");
        this.current = 0;
        this.data = []
    }

    load()
    {
        for(let a = 0; a < main.upload.files.length; a++)
        {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(main.upload.files[a]);
            fileReader.onload = event => this.loadFile(event.target.result)
        }
        this.checkComplete();
    }

    checkComplete()
    {
        if(this.current == main.upload.files.length)
        {
            console.log("loaded")
            main.loading.next();
            return;
        }

        setTimeout(function()
        {
            main.loading.checkComplete();
        }, 1000);
    }

    loadFile(data)
    {
        
        let fileContent = data.substring(32);            
        let binaryData = atob(fileContent);
        let textData = new TextDecoder().decode(new Uint8Array(Array.prototype.map.call(binaryData, function (c) {
            return c.charCodeAt(0);
        })));

        let parser = new DOMParser();
        let gpx = parser.parseFromString(textData, "text/xml");

        let content = gpx.getElementsByTagName("gpx")[0].getElementsByTagName("trk")[0];
        if(content == undefined)
        {
            this.current++;
            return
        }

        let tracks = content.getElementsByTagName("trkseg");
        
        if(tracks == undefined)
        {
            this.current++;
            return
        }

        //console.log(tracks)

        let skipAmount = main.process.getUserSelection();
        let current = 0;

        for (let trackIndex = 0;  trackIndex < tracks.length;  trackIndex++)
        {
            let points = tracks[trackIndex].children;
            for(let pointIndex = 0; pointIndex < points.length; pointIndex++)
            {
                current += 1;
                if(current >= skipAmount)
                {
                    let x = parseFloat(points[pointIndex].getAttribute("lat"));
                    let y = parseFloat(points[pointIndex].getAttribute("lon"));
                    this.data.push([x, y, 1]);
                    current = 0;
                }
                
            }
        }

        this.current++;
    }

    next()
    {
        main.paralax.scroll(true);
        this.loadingPanel.classList.remove("loading-in");
        this.loadingPanel.classList.add("loading-out");
        main.map.mapPanel.classList.add("map-in")
        main.map.createMap();
    }
}