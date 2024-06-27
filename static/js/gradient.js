class Gradient
{   
    constructor() 
    {
        this.panel = document.getElementById("heatmap-gradient-container");
        this.gradientPanel = document.getElementById("heatmap-gradient");
        this.gradient = {};
        this.addNewColor("#4287f5", 0);
        this.addNewColor("#42f545", 0.2);
        this.addNewColor("#f5ec42", 0.8);
        this.addNewColor("#d6660b", 0.9);
        this.addNewColor("#fa1616", 1);
        this.updateGradient();
    }

    addNewColor(color = "#4287f5", pos= 0)
    {
        let s = `<div class="heatmap-gradient-panel">
        <div>
          <input oninput="gradient.updateGradient();" name="color" type="color" value="`+color+`" /><label for="color">color</label>
        </div>
        <div>
          <input oninput="gradient.updateGradient();" name="color-pos" type="range" step="0.05" min="0" max="1" value="`+pos+`" /><label for="color-pos">position</label>
        </div>
        <button onclick="gradient.removeColor(this)" class="heatmap-gradient-remove">-</button>
        </div>`;

        let temp = document.createElement('div');
        temp.innerHTML = s;
        let htmlObject = temp.firstChild;
        this.panel.appendChild(htmlObject);

        this.updateGradient()
    }   

    updateGradient()
    {
        let inputs = this.panel.getElementsByTagName("input");
        let colors = [];
        let pos = [];
        let css =  "linear-gradient(90deg,";
        for(let i = 0; i < inputs.length; i++)
        {
            if(inputs[i].type == "color")
            {
                colors.push(inputs[i].value);
                css += inputs[i].value;
            }
            else
            {
                pos.push(inputs[i].value)
                css += " " + (parseFloat(inputs[i].value) * 100).toString() + "% ,";
            }
            
        }
        css = css.slice(0, -1);
        css += ")";

        this.gradientPanel.style.background = css;
        
        this.gradient = {};

        for(let i = 0; i < colors.length; i++)
        {
            this.gradient[parseFloat(pos[i])] = colors[i];
        }

        main.map.updateHeatMap();

    }

    removeColor(obj)
    {
        obj.parentNode.remove();
        this.updateGradient();
    }

}



var gradient = new Gradient();