class Process {
    constructor () 
    {
        this.processPanel = document.getElementById("process")
        this.processButton = document.getElementById("process-next")
        this.performance = this.calculatePerformance()
        this.recomendedSettings = this.calculateRecomendedSettings()
        this.init();
    }

    init()
    {
        document.getElementById("process-recomended").innerHTML = this.recomendedSettings;
    }

    getUserSelection()
    {
        let panel = document.getElementById("debt-amount-slider");
        let inputs = panel.getElementsByTagName("input");
        for(let  i = 0; i < inputs.length; i++)
        {
            if(inputs[i].checked)
            {
                return inputs[i].value;
            }
        }
    }

    next()
    {
        this.processButton.disabled = true;
        main.paralax.scroll(true);
        this.processPanel.classList.remove("process-in");
        this.processPanel.classList.add("process-out");
        main.loading.loadingPanel.classList.add("loading-in");

        setTimeout(function()
        {
            main.loading.load();
        }, 4000); 
        
    }

    calculatePerformance()
    {
        let startTime = performance.now();

        let counter = { data: []};
        for (let i = 0; i < 1000000; i++) {
            counter.data.push([i/5,i*10])
        }
        let endTime = performance.now();
        let totalTime = endTime - startTime;
        delete counter.data;
        return totalTime;
    }

    calculateRecomendedSettings()
    {
        if(this.performance > 1000)
        {
            return "poor";
        }
        else if(this.performance > 500)
        {
            return "low";
        }
        else if(this.performance > 300)
        {
            return "medium";
        }
        else if(this.performance > 100)
        {
            return "high";
        }else
        {
            return "best";
        }
    }
}