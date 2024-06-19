class Paralax {
  constructor () {
    this.current = 0
    this.reflect = document.getElementById('paralax-reflect')
    this.panels = []
    for (let i = 1; i < 10; i++) {
      this.panels.push(document.getElementById('paralax-' + i.toString()))
    }
  }

  scroll (forward = true) {
    if (this.current == 0) {
      if (forward) {
        this.current += 1
        this.scrollToMiddle()
      } else {
        console.error('cannot scroll back more!')
        return
      }
    } else if (this.current == 1) {
      if (forward) {
        this.current += 1
        this.scrollToEnd()
      } else {
        this.current -= 1
        this.scrollToStart()
      }
    } else if (this.current == 2) {
      if (forward) {
        this.current += 1
        this.scrollToResult()
      } else {
        this.current -= 1
        this.scrollToMiddle()
      }
    } else if (this.current == 3) {
      if (forward) {
        console.error('cannot scroll futher more!')
        return
      } else {
        this.current -= 1
        this.scrollToEnd()
      }
    }
  }

  scrollToStart () {
    this.reflect.removeAttribute('style')
    this.panels[0].removeAttribute('style')
    this.panels[1].removeAttribute('style')
    this.panels[2].removeAttribute('style')
    this.panels[3].removeAttribute('style')
    this.panels[4].removeAttribute('style')
    this.panels[5].removeAttribute('style')
    this.panels[6].removeAttribute('style')
    this.panels[7].removeAttribute('style')
    this.panels[8].removeAttribute('style')
  }

  scrollToMiddle () {
    this.panels[2].style.bottom = '45vh'
    this.panels[3].style.top = '37vh'
    this.panels[4].style.top = '34vh'
    this.panels[5].style.top = '25vh'
    this.panels[6].style.top = '18vh'
    this.panels[7].style.top = '15vh'
    this.panels[8].style.height = '40vh'
  }

  scrollToEnd () {
    this.panels[2].style.bottom = '42vh'
    this.panels[3].style.top = '35vh'
    this.panels[4].style.top = '28vh'
    this.panels[5].style.top = '18vh'
    this.panels[6].style.top = '5vh'
    this.panels[7].style.top = '5vh'
    this.panels[8].style.height = '30vh'
  }

  scrollToResult () {
    this.panels[0].style.height = '120vh'
    this.panels[0].style.top = '-20vh'
    this.panels[1].style.top = '-30vh'
    this.panels[2].style.bottom = '130vh'
    this.panels[3].style.top = '-90vh'
    this.panels[4].style.top = '-90vh'
    this.panels[5].style.top = '-90vh'
    this.panels[6].style.top = '-90vh'
    this.panels[7].style.top = '-50vh'
    this.panels[8].style.height = '0vh'
    this.reflect.style.top = '-50vh'

    setTimeout(function () {
      main.paralax.reflect.style.display = 'none'
      main.paralax.panels[1].style.display = 'none'
      main.paralax.panels[2].style.display = 'none'
      main.paralax.panels[3].style.display = 'none'
      main.paralax.panels[4].style.display = 'none'
      main.paralax.panels[5].style.display = 'none'
      main.paralax.panels[6].style.display = 'none'
      main.paralax.panels[7].style.display = 'none'
      main.paralax.panels[8].style.display = 'none'
      main.paralax.panels[0].style.top = '-100vh'
    }, 700)

    setTimeout(function () {
      main.paralax.panels[0].style.display = 'none'
    }, 1500)
  }
}
