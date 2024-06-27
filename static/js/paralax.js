class Paralax {
  /**
   * The constructor function initializes properties for a parallax effect script.
   */
  constructor() {
    this.current = 0;
    this.reflect = document.getElementById('paralax-reflect');
    this.panels = [];
    for (let i = 1; i < 10; i++) {
      this.panels.push(document.getElementById('paralax-' + i.toString()));
    }
  }

  returnToStart()
  {
    console.log("returning to start")
    main.map.mapPanel.classList.remove('map-in')
    main.map.mapPanel.classList.add('map-out')
    this.reflect.removeAttribute('style');
    this.panels.forEach(panel => panel.removeAttribute('style'));
    setTimeout(() => {
      window.location.reload(); 
    }, 4500);
  }

  /**
   * The scroll function in JavaScript allows for scrolling forward and backward through different
   * actions based on the current state.
   * @param [forward=true] - The `forward` parameter in the `scroll` function is a boolean value that
   * determines the direction of scrolling. When `forward` is `true`, the function will attempt to
   * scroll forward based on the defined actions.
   */
  scroll(forward = true) {
    const actions = [
      { forward: this.scrollToMiddle.bind(this), backward: this.errorCannotScrollBack },
      { forward: this.scrollToEnd.bind(this), backward: this.scrollToStart.bind(this) },
      { forward: this.scrollToResult.bind(this), backward: this.scrollToMiddle.bind(this) },
      { forward: this.errorCannotScrollFurther, backward: this.scrollToEnd.bind(this) }
    ];

    const action = actions[this.current];

    if (forward) {
      if (this.current < actions.length - 1) {
        this.current += 1;
        action.forward();
      } else {
        this.errorCannotScrollFurther();
      }
    } else {
      if (this.current > 0) {
        this.current -= 1;
        action.backward();
      } else {
        this.errorCannotScrollBack();
      }
    }
  }

  /**
   * The function `errorCannotScrollBack()` logs an error message saying "cannot scroll back more!".
   */
  errorCannotScrollBack() {
    console.error('cannot scroll back more!');
  }

  /**
   * The function `errorCannotScrollFurther` logs an error message saying "cannot scroll further
   * more!".
   */
  errorCannotScrollFurther() {
    console.error('cannot scroll further more!');
  }

  /**
   * The function `scrollToStart` removes the inline style attribute from the `reflect` element and all
   * elements in the `panels` array.
   */
  scrollToStart() {
    this.reflect.removeAttribute('style');
    this.panels.forEach(panel => panel.removeAttribute('style'));
  }

  /**
   * The function `scrollToMiddle()` applies a set of styles to scroll to the middle of the page.
   */
  scrollToMiddle() {
    const styles = [
      { bottom: '45vh' }, { top: '37vh' }, { top: '34vh' },
      { top: '25vh' }, { top: '18vh' }, { top: '15vh' },
      { height: '40vh' }
    ];
    this.applyStyles(styles);
  }

  /**
   * The function `scrollToEnd` applies a series of styles to elements to scroll to the end of a page.
   */
  scrollToEnd() {
    const styles = [
      { bottom: '42vh' }, { top: '35vh' }, { top: '28vh' },
      { top: '18vh' }, { top: '5vh' }, { top: '5vh' },
      { height: '30vh' }
    ];
    this.applyStyles(styles);
  }

  /**
   * The scrollToResult function adjusts the styling of multiple panels to simulate scrolling to a
   * specific result on a webpage.
   */
  scrollToResult() {
    this.panels[0].style.height = '120vh';
    this.panels[0].style.top = '-20vh';
    this.panels[1].style.top = '-30vh';
    this.panels[2].style.bottom = '130vh';
    this.panels[3].style.top = '-90vh';
    this.panels[4].style.top = '-90vh';
    this.panels[5].style.top = '-90vh';
    this.panels[6].style.top = '-90vh';
    this.panels[7].style.top = '-50vh';
    this.panels[8].style.height = '0vh';
    this.reflect.style.top = '-50vh';

    setTimeout(() => {
      [this.reflect, ...this.panels.slice(1, 9)].forEach(el => el.style.display = 'none');
      this.panels[0].style.top = '-100vh';
    }, 700);

    setTimeout(() => {
      this.panels[0].style.display = 'none';
    }, 1500);
  }

  /**
   * The `applyStyles` function iterates through an array of styles and applies them to specific panels
   * starting from the third panel.
   * @param styles - An array of CSS styles to be applied to the panels starting from the third panel
   * (index 2) in the `panels` array.
   */
  applyStyles(styles) {
    styles.forEach((style, i) => {
      Object.assign(this.panels[i + 2].style, style);
    });
  }
}