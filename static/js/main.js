class Main
{
    constructor()
    {
        this.map = null;
        this.paralax = new Paralax();


        setTimeout(function(){
           main.paralax.scrollToMiddle();
       }, 2000); 

       setTimeout(function(){
            main.paralax.scrollToEnd();
        }, 6000);

        setTimeout(function(){
            main.paralax.scrollToResult();
        }, 10000); 

        setTimeout(function(){
            main.paralax.scrollToStart();
        }, 14000); 
 
    }

    createMap()
    {
        let map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            .openPopup();
    }
    
}


class Paralax
{
    constructor()
    {
        this.panels = [];
        for(let i = 1; i < 10; i++)
        {
            this.panels.push(document.getElementById("paralax-" + i.toString()));
        }     
    }

    scrollToStart()
    {
        window.location.reload();
    }

    scrollToMiddle()
    {
        this.panels[2].style.bottom = "45vh";
        this.panels[3].style.top = "37vh";
        this.panels[4].style.top = "34vh";
        this.panels[5].style.top = "25vh";
        this.panels[6].style.top = "18vh";
        this.panels[7].style.top = "15vh";
        this.panels[8].style.height = "40vh";
    }

    scrollToEnd()
    {
        this.panels[2].style.bottom = "42vh";
        this.panels[3].style.top = "35vh";
        this.panels[4].style.top = "28vh";
        this.panels[5].style.top = "18vh";
        this.panels[6].style.top = "5vh";
        this.panels[7].style.top = "5vh";
        this.panels[8].style.height = "30vh";
    }

    scrollToResult()
    {
        this.panels[0].style.height = "120vh";
        this.panels[0].style.top = "-20vh";
        this.panels[1].style.top = "-30vh";
        this.panels[2].style.bottom = "130vh";
        this.panels[3].style.top = "-90vh";
        this.panels[4].style.top = "-90vh";
        this.panels[5].style.top = "-90vh";
        this.panels[6].style.top = "-90vh";
        this.panels[7].style.top = "-50vh";
        this.panels[8].style.height = "0vh";

        setTimeout(function()
        {
            main.paralax.panels[1].style.display = "none";
            main.paralax.panels[2].style.display = "none";
            main.paralax.panels[3].style.display = "none";
            main.paralax.panels[4].style.display = "none";
            main.paralax.panels[5].style.display = "none";
            main.paralax.panels[6].style.display = "none";
            main.paralax.panels[7].style.display = "none";
            main.paralax.panels[8].style.display = "none";
            main.paralax.panels[0].style.top = "-100vh";
        }, 700);

        setTimeout(function()
        {
            main.paralax.panels[0].style.display = "none";
        }, 1500);

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










function a() {
    const bg = document.querySelector("#bg");
    const base = document.querySelector("#base");
    const reflect = document.querySelector("#reflect");
    let flg, flg_now;
    const root = document.documentElement;
    //let gap = parseInt(getComputedStyle(root).getPropertyValue("--gap"));
  
    function pointer(e) {
        let value = 45;
        flg = flg_now;

        let css_ratio = 100 - value;
        root.style.setProperty("--ratio", css_ratio + "vh");
        if (value == 50) {
          flg_now = true;
          base.style.setProperty("background-position", "center");
          reflect.style.setProperty("background-position", "center");
        } else if (value > 50) {
          flg_now = true;
          base.style.setProperty(
            "background-position",
            "top calc(50% + ( var(--ratio) - 50vh ) * 2) center"
          );
          reflect.style.setProperty("background-position", "center");
        } else {
          flg_now = false;
          base.style.setProperty("background-position", "center");
          reflect.style.setProperty(
            "background-position",
            "bottom calc(50% + ( var(--ratio) - 50vh ) * 2) center"
          );
        }
    
        //
        if (flg != flg_now) {
          //let filter = "";
          if (value < 50) {
            bg.style.setProperty("transform", "scale3d(1, 1, 1)");
    
            //bg.style.setProperty("filter", filter);
          } else {
            bg.style.setProperty("transform", "scale3d(1, -1, 1)");
            /*
            filter = getComputedStyle(reflect).getPropertyValue("--filter");
    
            bg.style.setProperty("filter", filter);
            alert(String(filter));
    */
          }
        }
      }
  
    window.addEventListener("load", pointer);
  };

  a();
  
  