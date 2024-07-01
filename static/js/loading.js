class Loading {
  /**
   * The constructor function initializes properties for a loading panel, current value, and data
   * array.
   */
  constructor () {
    this.loadingPanel = document.getElementById('loading')
    this.current = 0
    this.data = []
  }

  /**
   * The `load` function reads multiple files as data URLs, loads each file, and checks for
   * completion.
   */
  load () {
    const files = Array.from(main.upload.files)
    const filePromises = files.map(file => this.readFileAsDataURL(file))

    Promise.all(filePromises).then(results => {
      results.forEach(result => this.loadFile(result))
      this.checkComplete()
    })
  }

  /**
   * The function `readFileAsDataURL` reads a file and returns its data URL using a Promise.
   * @param file - The `file` parameter in the `readFileAsDataURL` function is expected to be a File
   * object representing the file that you want to read and convert to a Data URL.
   * @returns The `readFileAsDataURL` function returns a Promise that resolves with the data URL of
   * the file once it has been read successfully, or rejects with an error if there was a problem
   * reading the file.
   */
  readFileAsDataURL (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = event => resolve(event.target.result)
      fileReader.onerror = error => reject(error)
    })
  }

  /**
   * The function `checkComplete` checks if the current progress is equal to the total number of
   * files to be uploaded and triggers the next action accordingly.
   */
  checkComplete () {
    if (this.current >= main.upload.files.length) {
      console.log('loaded')
      main.loading.next()
    } else {
      requestAnimationFrame(this.checkComplete.bind(this))
    }
  }

  /**
   * The `loadFile` function parses GPX data, extracts track points based on user selection, and
   * stores them in an array.
   * @param data - The `loadFile` function you provided seems to be parsing a GPX file and extracting
   * track points based on a skip amount determined by user selection. The function decodes the file
   * content, extracts track segments, and then iterates over track points to extract latitude and
   * longitude information.
   * @returns The `loadFile` function returns nothing explicitly. It increments the `this.current`
   * property and then exits the function without a return statement.
   */
  loadFile (data) {
    const fileContent = data.substring(32).trim(); // Trim leading/trailing whitespace

    // Normalize line endings if needed
    const normalizedContent = fileContent.replace(/\r\n/g, '\n');
    let textData = ""
    // Check if content is valid base64 before decoding
    if (/^[A-Za-z0-9+/]*={0,2}$/.test(normalizedContent)) {
        const binaryData = atob(normalizedContent);
        textData = new TextDecoder().decode(Uint8Array.from(binaryData, c => c.charCodeAt(0)));

        // Use textData as needed
    } else {
        console.error('Invalid base64 encoded data');
        // Handle error condition
    }

    const parser = new DOMParser()
    const gpx = parser.parseFromString(textData, 'text/xml')
    const trk = gpx.querySelector('gpx > trk')

    if (!trk) {
      this.current++
      return
    }

    const tracks = Array.from(trk.getElementsByTagName('trkseg'))
    const skipAmount = main.process.getUserSelection()
    let current = 0

    tracks.forEach(track => {
      Array.from(track.children).forEach(point => {
        current++
        if (current >= skipAmount) {
          const lat = parseFloat(point.getAttribute('lat'))
          const lon = parseFloat(point.getAttribute('lon'))
          this.data.push([lat, lon, 1])
          current = 0
        }
      })
    })

    this.current++
  }

  /**
   * The "next" function triggers a series of actions including scrolling, removing/loading CSS
   * classes, and creating a map.
   */
  next () {
    main.paralax.scroll(true)
    this.loadingPanel.classList.remove('loading-in')
    this.loadingPanel.classList.add('loading-out')
    main.map.mapPanel.classList.add('map-in')
    main.map.createMap()
  }
}
