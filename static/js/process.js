class Process {
    /**
     * The constructor function initializes properties related to processing panel, button,
     * performance, and recommended settings.
     */
    constructor() {
        this.processPanel = document.getElementById("process");
        this.processButton = document.getElementById("process-next");
        this.performance = this.calculatePerformance();
        this.recommendedSettings = this.calculateRecommendedSettings();
        this.init();
    }

    /**
     * The `init` function sets the recommended settings text and adds a click event listener to the
     * process button to call the `next` function.
     */
    init() {
        document.getElementById("process-recomended").innerText = this.recommendedSettings;
        this.processButton.addEventListener('click', () => this.next());
    }

    /**
     * The function `getUserSelection` retrieves the value of the selected input from a panel with the
     * id "debt-amount-slider".
     * @returns The function `getUserSelection()` returns the value of the selected input within the
     * element with the id "debt-amount-slider", or `null` if no input is selected.
     */
    getUserSelection() {
        const panel = document.getElementById("debt-amount-slider");
        const selectedInput = panel.querySelector("input:checked");
        return selectedInput ? selectedInput.value : null;
    }

    /**
     * The `next` function disables a button, triggers a scroll effect, animates a panel, and initiates
     * a loading process after a delay.
     * @returns If the `processButton` is disabled, the function will return early and nothing will be
     * returned explicitly.
     */
    next() {
        if (this.processButton.disabled) return;
        this.processButton.disabled = true;
        main.paralax.scroll(true);
        this.processPanel.classList.remove("process-in");
        this.processPanel.classList.add("process-out");
        main.loading.loadingPanel.classList.add("loading-in");

        setTimeout(() => main.loading.load(), 4000);
    }

    /**
     * The function `calculatePerformance` measures the time taken to push data into an array and
     * returns the total time elapsed.
     * @returns The `calculatePerformance()` function returns the total time taken to execute the loop
     * that populates the `counter.data` array with 1,000,000 elements. The function measures the
     * performance using the `performance.now()` method to calculate the difference between the start
     * and end times of the loop execution. The `counter.data` array is deleted before returning the
     * total time.
     */
    calculatePerformance()
    {
        const startTime = performance.now();

        const counter = { data: []};
        for (let i = 0; i < 1000000; i++) {
            counter.data.push([i/5,i*10])
        }
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        delete counter.data;
        return totalTime;
    }

    /**
     * The function calculates recommended settings based on the performance value provided.
     * @returns The `calculateRecommendedSettings()` function is returning a string indicating the
     * recommended settings based on the value of the `performance` property. The possible return
     * values are "poor", "low", "medium", "high", or "best" depending on the value of `performance`.
     */
    calculateRecommendedSettings() {
        if (this.performance > 1000) {
            return "poor";
        } else if (this.performance > 500) {
            return "low";
        } else if (this.performance > 300) {
            return "medium";
        } else if (this.performance > 100) {
            return "high";
        } else {
            return "best";
        }
    }
}



