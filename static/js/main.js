class Main {
  /**
   * The constructor function initializes instances of various classes for parallax, uploading,
   * processing, loading, and mapping functionalities.
   */
  constructor () {
    this.paralax = new Paralax()
    this.upload = new Upload()
    this.process = new Process()
    this.loading = new Loading()
    this.map = new Map()

    window.onload = function() {
        document.getElementById("upload").classList.add("upload-in")
      };
  }
}

var main = new Main()
