class Upload {
    constructor () {
        this.files = []
        this.localFiles = []
        this.fileInput = document.getElementById("upload-input");
        this.fileNames = document.getElementById("upload-container-names");
        this.fileTable = document.getElementById("upload-history-table");
        this.empty = document.getElementById("upload-empty");
        this.nextButton = document.getElementById("upload-next");
        this.dropZone = document.getElementById("upload-drag")
        this.maxNamesLength = 25;

        this.fileInput.addEventListener('change', (event) => {
            let files = event.target.files;
            this.handleFiles(files);
        });


        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.add('dragover');
        });
    
        this.dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.remove('dragover');
        });
    
        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.remove('dragover');
    
            let files = e.dataTransfer.files;
            this.handleFiles(files);
        });
    }

    handleFiles(files)
    {
        if (files.length > 0) 
        {
            for(let i = 0; i < files.length; i++)
            {
                this.localFiles.push(files[i]);
            }

            let fileNames = Array.from(files).map(file => file.name).join(', ');
            if(fileNames.length > this.maxNamesLength)
            {
                fileNames = fileNames.substring(0, this.maxNamesLength) + "...";
            }
            this.fileNames.innerHTML = fileNames;
        }
    }

    next()
    {
        main.paralax.scroll(true);
    }

    checkReady()
    {
        if(this.files.length == 0)
        {
            this.empty.style.display = "block";
            this.nextButton.disabled = true;
        }
        else
        {
            this.empty.style.display = "none";
            this.nextButton.disabled = false;
        }
    }

    remove(elem, filename)
    {
        console.log("removing " + filename)
        let row = elem.parentNode.parentNode;
        row.remove();
        for(let i = 0; i < this.files.length; i++)
        {
            if(filename == this.files[i]["name"])
            {
                this.files.splice(i, 1);
                break;
            }
        }
        this.checkReady();
    }

    addToFileList(filename, size)
    {
        console.log(filename, size);
        let row = this.fileTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        
        let kilobytes = size / 1024;
        let newSize = kilobytes.toFixed(2) + ' KB';

        let newFilename = filename;
        if(newFilename.length > 25)
        {
            newFilename = newFilename .substring(0, 25) + "...";
        }

        cell1.innerHTML = newFilename;
        cell2.innerHTML = newSize;
        cell3.innerHTML = '<button onclick="main.upload.remove(this,\''+filename+'\')" class="upload-element-remove">🗙</button>';

        this.checkReady();
    }

    upload()
    {
        for(let i = 0; i < this.localFiles.length; i++)
        {
            this.files.push(this.localFiles[i])
            this.addToFileList(this.localFiles[i]["name"], this.localFiles[i]["size"])
        }
        this.localFiles = []
        this.fileNames.innerHTML = ""
    }


}

