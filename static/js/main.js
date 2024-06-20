class Main
{
    constructor()
    {
        this.map = null;
        this.paralax = new Paralax();
        this.upload = new Upload();
        this.process = new Process();
        this.loading = new Loading();
 
    }

    createMap()
    {
        this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        return this.map;
    }
    
}




class Point
{
    constructor(lat, lon)
    {
        this.lat = lat;
        this.lon = lon;
    }

    get()
    {
        return [this.lat, this.lon];
    }
}


var main = new Main();



  
  