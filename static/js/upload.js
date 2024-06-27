class Upload {
    /**
     * The constructor function initializes properties and sets up event listeners for a file upload
     * feature in JavaScript.
     */
    constructor() {
        this.files = [];
        this.localFiles = [];
        this.uploadPanel = document.getElementById("upload");
        this.fileInput = document.getElementById("upload-input");
        this.fileNames = document.getElementById("upload-container-names");
        this.fileTable = document.getElementById("upload-history-table");
        this.empty = document.getElementById("upload-empty");
        this.nextButton = document.getElementById("upload-next");
        this.dropZone = document.getElementById("upload-drag");
        this.maxNamesLength = 25;

        this.addEventListeners();
    }

    /**
     * The `addEventListeners` function sets up event listeners for file input change, dragover,
     * dragleave, and drop events.
     */
    addEventListeners() {
        this.fileInput.addEventListener('change', (event) => this.handleFiles(event.target.files));

        this.dropZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.dropZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.dropZone.addEventListener('drop', (e) => this.handleDrop(e));
    }

    /**
     * The handleDragOver function prevents the default behavior and adds a 'dragover' class to the
     * drop zone element.
     * @param event - The `event` parameter in the `handleDragOver` function is an object that contains
     * information about the dragover event, such as the type of event, the element on which the event
     * occurred, and any related data. In this case, it is used to prevent the default behavior of the
     * drag
     */
    handleDragOver(event) {
        event.preventDefault();
        this.dropZone.classList.add('dragover');
    }

    /**
     * The handleDragLeave function prevents the default behavior and removes the 'dragover' class from
     * the drop zone element.
     * @param event - The `event` parameter in the `handleDragLeave` function is an object that
     * represents the dragleave event that occurred. It contains information about the event, such as
     * the type of event, the target element, and any other relevant data associated with the event.
     */
    handleDragLeave(event) {
        event.preventDefault();
        this.dropZone.classList.remove('dragover');
    }

    /**
     * The handleDrop function in JavaScript removes the 'dragover' class from an element and processes
     * the files that are dropped.
     * @param event - The `event` parameter in the `handleDrop` function is an event object that
     * represents the drop event that occurred. It contains information about the event, such as the
     * type of event, the target element, and any data associated with the event. In this case, it is
     * used to prevent the
     */
    handleDrop(event) {
        event.preventDefault();
        this.dropZone.classList.remove('dragover');
        this.handleFiles(event.dataTransfer.files);
    }

    /**
     * The getFiles function returns the files stored in the object.
     * @returns The `files` array is being returned.
     */
    getFiles() {
        return this.files;
    }

    /**
     * The function `handleFiles` takes an array of files, adds them to a local array, and displays
     * their names in a formatted way on the webpage.
     * @param files - The `files` parameter in the `handleFiles` function is an array of file objects
     * that are being passed as input. The function first checks if the length of the `files` array is
     * greater than 0 to ensure that there are files to handle. If there are files present, it app
     */
    handleFiles(files) {
        if (files.length > 0) {
            this.localFiles.push(...files);

            let fileNames = Array.from(files).map(file => file.name).join(', ');
            if (fileNames.length > this.maxNamesLength) {
                fileNames = fileNames.substring(0, this.maxNamesLength) + "...";
            }
            this.fileNames.innerHTML = fileNames;
        }
    }

    /**
     * The "next" function disables a button, scrolls a parallax element, adds a class to an upload
     * panel, and adds a class to a process panel.
     */
    next() {
        this.nextButton.disabled = true;
        main.paralax.scroll(true);
        this.uploadPanel.classList.add("upload-move");
        main.process.processPanel.classList.add("process-in");
    }

    /**
     * The function `checkReady` checks if there are any files selected and updates the display and
     * disabled state of elements accordingly.
     */
    checkReady() {
        if (this.files.length === 0) {
            this.empty.style.display = "block";
            this.nextButton.disabled = true;
        } else {
            this.empty.style.display = "none";
            this.nextButton.disabled = false;
        }
    }

    /**
     * The `remove` function removes a specified element from the DOM, updates the list of files, and
     * checks if the operation is complete.
     * @param elem - Elem is a reference to the HTML element that triggered the removal action. It is
     * used to locate the closest table row (`<tr>`) element that contains the file to be removed.
     * @param filename - The `filename` parameter in the `remove` function refers to the name of the
     * file that needs to be removed from the list of files.
     */
    remove(elem, filename) {
        console.log("removing " + filename);
        elem.closest('tr').remove();
        this.files = this.files.filter(file => file.name !== filename);
        this.checkReady();
    }

    /**
     * The `addToFileList` function logs the filename and size, inserts a new row into a file table
     * with truncated filename if necessary, displays the size in KB, and adds a remove button with an
     * onclick event to remove the file.
     * @param filename - The `filename` parameter is a string that represents the name of the file
     * being added to the file list.
     * @param size - Size is the size of the file in bytes that you want to add to the file list.
     */
    addToFileList(filename, size) {
        console.log(filename, size);
        let row = this.fileTable.insertRow(-1);
        row.innerHTML = `
            <td>${filename.length > this.maxNamesLength ? filename.substring(0, this.maxNamesLength) + "..." : filename}</td>
            <td>${(size / 1024).toFixed(2)} KB</td>
            <td><button onclick="main.upload.remove(this, '${filename}')" class="upload-element-remove">🗙</button></td>
        `;
        this.checkReady();
    }

    /**
     * The `upload` function iterates through local files, adds them to a list, and clears the local
     * files array and file names display.
     */
    upload() {
        this.localFiles.forEach(file => {
            this.files.push(file);
            this.addToFileList(file.name, file.size);
        });
        this.localFiles = [];
        this.fileNames.innerHTML = "";
    }
}