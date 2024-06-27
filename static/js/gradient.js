class Gradient {
  /**
   * The constructor function initializes a heatmap gradient with specified colors and stops.
   */
  constructor () {
    this.panel = document.getElementById('heatmap-gradient-container')
    this.gradientPanel = document.getElementById('heatmap-gradient')
    this.gradient = {}
    this.addNewColor('#4287f5', 0)
    this.addNewColor('#42f545', 0.2)
    this.addNewColor('#f5ec42', 0.8)
    this.addNewColor('#d6660b', 0.9)
    this.addNewColor('#fa1616', 1)
    this.updateGradient()
  }

  /**
   * The `addNewColor` function dynamically adds a new color input field with a position
   * range input and a remove button to a heatmap gradient panel.
   * @param [color=#4287f5] - The `color` parameter in the `addNewColor` function represents the color
   * value that will be used for the new color input field. It is a hexadecimal color value that
   * determines the initial color displayed in the color input field. For example, `'#4287f5'`
   * represents a shade
   * @param [pos=0] - The `pos` parameter in the `addNewColor` function represents the position of the
   * color in the gradient scale. It is a value between 0 and 1 that determines where the color should
   * be placed in the gradient. A `pos` value of 0 represents the start of the gradient
   */
  addNewColor (color = '#4287f5', pos = 0) {
    const newColorHTML = `
    <div class="heatmap-gradient-panel">
      <div>
        <input oninput="gradient.updateGradient();" name="color" type="color" value="${color}" />
        <label for="color">color</label>
      </div>
      <div>
        <input oninput="gradient.updateGradient();" name="color-pos" type="range" step="0.05" min="0" max="1" value="${pos}" />
        <label for="color-pos">position</label>
      </div>
      <button onclick="gradient.removeColor(this)" class="heatmap-gradient-remove">-</button>
    </div>`

    const temp = document.createElement('div')
    temp.innerHTML = newColorHTML
    this.panel.appendChild(temp.firstElementChild)
    this.updateGradient()
  }

  /**
   * The `updateGradient` function dynamically generates a linear gradient CSS style
   * based on user input and updates the gradient panel accordingly.
   */
  updateGradient () {
    let inputs = this.panel.getElementsByTagName('input')
    let css = 'linear-gradient(90deg,'
    this.gradient = {}

    for (let i = 0; i < inputs.length; i += 2) {
      if (
        inputs[i].type === 'color' &&
        inputs[i + 1] &&
        inputs[i + 1].type !== 'color'
      ) {
        let color = inputs[i].value
        let position = parseFloat(inputs[i + 1].value) * 100
        css += `${color} ${position}%,`
        this.gradient[position / 100] = color
      }
    }

    css = css.slice(0, -1) + ')'
    this.gradientPanel.style.background = css
    main.map.updateHeatMap()
  }

  /**
   * The `removeColor` function removes the parent node of an object and then updates the gradient.
   * @param obj - The `obj` parameter in the `removeColor` function refers to an element in the
   * DOM (Document Object Model) that you want to remove from its parent node.
   */
  removeColor (obj) {
    obj.parentNode.remove()
    this.updateGradient()
  }
}

var gradient = new Gradient()
