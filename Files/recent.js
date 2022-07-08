var sess=sessionStorage.getItem("id");
function listFolders() {
    try
    {
      var create = document.getElementById("create");
      create.innerHTML = '';
      var url='https://localhost:44366/api/Folder/Recent/'+sess+'/2';
    fetch(url, {
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
         
        
      <div id ="click" class="divfolder" >
      
      
  <i class="fa-regular fa-star star " id="${folderId}"  onclick="addToFavourites(${folderId})"></i>
<img   class="folderimage" src="https://img.freepik.com/free-vector/portfolio-management-previous-projects-samples-works-catalog-skills-presentation-successful-graphic-designer-web-developer-cartoon-character_335657-1586.jpg?size=338&ext=jpg&ga=GA1.2.1396277465.1652109765" height=120px; width=150px; >

<label class="dropdown"> 
  <div class=" dropdowndiv dd-button">
    <i class=" dots fa-solid fa-ellipsis-vertical "></i> 
   
   </div>
  
   <input type="checkbox" class="dd-input" id="test">
  
   <ul class=" menulist dd-menu">
     <li class="menuu" onclick="viewdetails(${folderId})" >
      <button id="viewdetails" type="button" class="btn-" data-toggle="modal" data-target="#exampleModalLong">
          View details
      </button></li>
    
     <li class="divider"></li>
     
     <li class="menuu" onclick="popup(${folderId})">
          Delete the folder
     </li>
     <li class="divider"></li>
     <li class="menuu" onclick="favorites(${folderId})"><span clas="trigger"  id="favorites"> Add to Favourites</span>
     </li>
     
   </ul>
   
   
    
  </label> 
  <button  id="clickableimg" onclick="openfile(${folderId})" class="folderName">${fold}</button>

  
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
    listFolders();
    
  document.getElementById("admin1").innerHTML=sessionStorage.getItem("name");
  document.getElementById("email").innerHTML=sessionStorage.getItem("email");
    document.getElementById("admin").innerHTML=sessionStorage.getItem("name");
  }
  onLoad();
  function openfile(folderId) {
    sessionStorage.setItem("folderId",folderId);
    window.location.href="/Files/file.html";
  }

function sendToTrash(folderId){
var requestOptions = {
method: 'PUT',
redirect: 'follow'
};

fetch("https://localhost:44366/api/Folder/SoftDeleted/"+folderId, requestOptions)
.then(response => response.text())
.then(result =>{
  listFolders()})
.catch(error => console.log('error', error));
}
function addToFavourites(folderId){

var requestOptions = {
method: 'PUT',
redirect: 'follow'
};

fetch("https://localhost:44366/api/Folder/favourite/"+folderId, requestOptions)
.then(response => response.text())
.then(result =>{

listFolders()})
.catch(error => console.log('error', error));
}
function favorites(folderIds) {
  const grid = document.getElementById(folderIds);
  const fav = document.getElementById("favorites");
  if (grid.className == "fa-regular fa-star star ") {
    grid.setAttribute("class", "fa-solid fa-star star ");
    addToFavourites(folderIds);
  } else if (grid.className == "fa-solid fa-star star ") {
    grid.setAttribute("class", "fa-regular fa-star star");
    
  }
}

// view details of folder

function viewdetails( FolderId) {
  
  const Owner = document.getElementById("Owner");
  const foldername = document.getElementById("foldername");
  const createdby = document.getElementById("createdby");
  const createdAt = document.getElementById("createdAt");
createdby.innerHTML =   "Createby:  " + sessionStorage.getItem("name");
Owner.innerHTML = "Owner:  " + sessionStorage.getItem("name");
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

 let result = fetch("https://localhost:44366/api/Folder/details/" + FolderId, requestOptions)
  .then(response =>  response.json())
  .then(result =>{ foldername.innerHTML="FolderName: "+result.folderName 
   createdAt.innerHTML="CreatedAt: "+result.createdAt
   })
  .then(response=> {})
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
      sendToTrash(folderId)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}