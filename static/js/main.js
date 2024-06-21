class Main
{
    constructor()
    {
        this.paralax = new Paralax();
        this.upload = new Upload();
        this.process = new Process();
        this.loading = new Loading();
        this.map = new Map();
 
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



  
  