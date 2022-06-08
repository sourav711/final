function listFolders() {
    try
    {
      var create = document.getElementById("create");
      create.innerHTML = '';
    fetch('https://localhost:44392/api/Fileview/'+sessionStorage.getItem("folderId"), {
      method: 'GET'
    })
    .then(response => response.json())
    .then((folders) => {
      console.log(folders);
      folders.forEach(folder => {
    
      var create = document.getElementById("create");
      var art = document.createElement("article");
      // console.log(folder);
      const fold = folder.documentName;
      // console.log(fold);
const docId=folder.documentId;
      // fold.style.backgroundColor = "red";
      // console.log(fold);
      art.innerHTML = `<i class=" filei fa-2x fa-solid fa-file"></i>
      <label class="dropdown">
  

      <div class="dd-button btnn">
      <i class=" drop fa-solid fa-ellipsis-vertical"></i>
      
    
      <input type="checkbox" class="dd-input" id="test">
    
      <ul class="dd-menu " style ="position: relative;
      right: 99px;
  ">
        <li><button id="viewdetails" type="button" onclick="sendToTrash(${docId})" >view details</button></li>
       
        <li class="divider"></li>
        
         <button id="viewdetails" type="button" onclick="downloadFile(${docId})" >Delete the Folder</button>
        
      </ul>
      </div>
       
    </label>
     
      <button style="font-size:  20px;text-decoration: none;position: relative;left: 400px;bottom: 2px;cursor: pointer;">${fold}</button>
      
      </i>`;
      create.appendChild(art);
      });
    })
    
    }
    catch(err)
    {
      console.log(err);
    }
  }

  listFolders();