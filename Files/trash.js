
function listFolders() {
  
  
  try
  {
   const create = document.getElementById("create");
    create.innerHTML = '';
  fetch('https://localhost:44366/api/Folder/Trash/'+sessionStorage.getItem("id"), {
    method: 'GET'
  })
  .then(response => response.json())
  .then((folders) => {
    folders.forEach(folder => {
  
    var create = document.getElementById("create");
    var art = document.createElement("article");
    art.setAttribute("id" , "clickable");
    const fold = folder.folderName;
    const folderId=folder.folderId;
    art.innerHTML = `
    
    <div id ="click" class="divfolder" onclick="openfile(${folderId}") >
  <i class="fa-regular fa-star star " id="icon"  onclick="favorites(${folderId})"></i>
<img   class="folderimage" src="https://img.freepik.com/free-vector/portfolio-management-previous-projects-samples-works-catalog-skills-presentation-successful-graphic-designer-web-developer-cartoon-character_335657-1586.jpg?size=338&ext=jpg&ga=GA1.2.1396277465.1652109765" height=120px; width=150px;>
  <label class="dropdown"> 
  <div class=" dropdowndiv dd-button">
    <i class=" dots fa-solid fa-ellipsis-vertical "></i> 
   </div>
   <input type="checkbox" class="dd-input" id="test">
   <ul class=" menulist dd-menu">
   <li class="menuu" onclick="removeFromTrash(${folderId})"><span clas="trigger"  id="favorites">Remove From Trash</span>

     <li class="divider"></li>
     <li class="menuu" onclick="popup(${folderId})"><span clas="trigger"  id="favorites"> Delete Permanently</span>
     </li>
   </ul>
  </label>   
  
  <button  id="clickableimg" class="folderName" style="color: black">${fold}</button>

    
    
    ` ;
    

    create.appendChild(art);
    });
  })
  
  }
  catch(err)
  {
    console.log(err);
  }
}
function onLoad() {
  
  listFiles();
  document.getElementById("admin1").innerHTML=sessionStorage.getItem("name");
  document.getElementById("email").innerHTML=sessionStorage.getItem("email");
  document.getElementById("admin").innerHTML=sessionStorage.getItem("name");
}listFolders();
onLoad();

function listFiles() {
try
{
  var created = document.getElementById("trash");
  created.innerHTML = '';
fetch('https://localhost:44366/api/Document/Trash/'+sessionStorage.getItem("id"), {
  method: 'GET'
})
.then(response => response.json())
.then((folders) => {
  folders.forEach(folder => {
const create = document.getElementById("trash");
  var art = document.createElement("article");
  art.setAttribute("id" , "clickable");
  const fold = folder.documentName;
  const docId = folder.documentId;
  art.innerHTML = `

  <div class= "file">
        <i class="fa-regular fa-star star " id="icon"  onclick="addToFavourites(${docId})"></i>
        <img  class="documentimg" src ="https://img.freepik.com/free-vector/open-folder-folder-with-documents-document-protection-concept_183665-104.jpg?w=826" height=90px>
        <button  onclick="viewFile(${docId})" class="documentName">${fold}</button> 
        <label class="dropdown"> 
  <div class=" dropdowndiv dd-button">
  <i class=" dotsFile fa-solid fa-ellipsis-vertical "></i> 
   </div>
   <input type="checkbox" class="dd-input" id="test">
   <ul class=" menulistFile dd-menu">
   <li class="menuu" onclick="removeFileTrash(${docId})"><span clas="trigger"  id="favorites">Remove From Trash</span>

   <li class="divider"></li>
   <li class="menuu" onclick="popupFile(${docId})"><span clas="trigger"  id="favorites"> Delete Permanently</span>
   </li>
    
   
   </ul>
   </label>  
   
   </div>
  
  ` ;
  

  created.appendChild(art);
  });
})

}
catch(err)
{
  console.log(err);
}
}
function removeFromTrash(folderId){
  
var requestOptions = {
method: 'PUT',
redirect: 'follow'
};

fetch("https://localhost:44366/api/Folder/Undelete/"+folderId, requestOptions)
.then(response => response.text())
.then(result =>{
  listFolders()})
.catch(error => console.log('error', error));
}
function removeFileTrash(docId){
  
  var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
  };
  
  fetch("https://localhost:44366/api/Document/Undelete/"+docId, requestOptions)
  .then(response => response.text())
  .then(result =>{
    listFiles()})
  .catch(error => console.log('error', error));
  }

//deleting a folder
function permanentDelete(folder) {
var requestOptions = {
  method: 'DELETE',
  redirect: 'follow'
};
var url="https://localhost:44366/api/Folder/"+folder;
fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => {
    location.reload();})
  .catch(error => console.log('error', error));
}

function permanentDeleteFile(docId) {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  var url="https://localhost:44366/api/Document/"+docId;
  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
      location.reload();})
    .catch(error => console.log('error', error));
  }
  
  function popup(folderId){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        permanentDelete(folderId)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  function popupFile(docId){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        permanentDeleteFile(docId)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }