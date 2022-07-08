const constants = {
  apiBasePath: "https://localhost:44366/api/",
};
var id = sessionStorage.getItem("id");
var adminname = sessionStorage.getItem("name");
var folderid = sessionStorage.getItem("folderId");
var curr = new Date();
var date = curr.toISOString();
const form = document.getElementById("folderr");

function createFile() {
  try {
    fetch("https://localhost:44366/api/Document", {
      body: JSON.stringify({
        documentName: form.value,
        createdAt: curr.toISOString(),
        isDeleted: 0,
        contentType: "c#",
        size: 120,
        createdBy: id,
        folderId: sessionStorage.getItem("folderId"),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((folderCreateResponse) => {
      listFolders();
    });
  } catch (err) {
    console.log(err);
  }
}
function onLoad() {
  listFolders();
  document.getElementById("admin").innerHTML = adminname; 
  document.getElementById("admin1").innerHTML=sessionStorage.getItem("name");
  document.getElementById("email").innerHTML=sessionStorage.getItem("email");
}
onLoad();
function logout() {
  window.location.href = "index.html";
  sessionStorage.clear();

}
// choose file function

const choose = document.getElementById("real-file");
function choosefiles() {
  try {
    fetch("https://localhost:44392/api/Document", {
      body: JSON.stringify({
        documentName: value,
        createdAt: curr.toISOString(),
        isDeleted: 0,
        contentType: "c#",
        size: 120,
        createdBy: id,
        folderId: sessionStorage.getItem("folderId"),
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((folderCreateResponse) => {
      listFolders();
    });
  } catch (err) {
    console.log(err);
  }
}

function listFolders() {
  try {
    var create = document.getElementById("create");
    create.innerHTML = "";
    fetch(
      "https://localhost:44366/api/Document/" +
        sessionStorage.getItem("folderId"),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((folders) => {
        folders.forEach((folder) => {
          var create = document.getElementById("create");
          var art = document.createElement("article");
          const fold = folder.documentName;
          const docId = folder.documentId;
          art.innerHTML = `
          <div class= "file">
          <i class="fa-regular fa-star star " id="icon"  onclick="addToFavourites(${docId})"></i>
          <img  class="documentimg" src ="https://img.freepik.com/free-vector/open-folder-folder-with-documents-document-protection-concept_183665-104.jpg?w=826" height=90px>
          <label class="dropdown"> 
    <div class=" dropdowndiv dd-button">
    <i class=" dots fa-solid fa-ellipsis-vertical "></i> 
     </div>
     <input type="checkbox" class="dd-input" id="test">
     <ul class=" menulist dd-menu">
       <li class="menuu" onclick="viewDetail(${docId})"  ><button id="viewdetails"  type="button" ><span class ="trigger"> <button id="viewdetails" " type="button" class="btn-" data-toggle="modal" data-target="#exampleModalLong">
       View Details
        </button> </span></button></li>
       <li class="divider"></li>
       <li class="menuu" > <button id="viewdetails" type="button" onclick="popup(${docId})">Delete File</button></li>
       <li class="divider"></li>
      
       <li class="menuu" onclick="filesfavorites(${docId})"><span clas="trigger"  id="favorites"> Add to Favourites</span> </li>
       <li class="divider"></li>
       <li class="menuu" ><span clas="trigger" onclick=" downloadFile(${docId})"  id="favorites">Download File</span>
  
     </ul>
     </label>  
     <button  onclick="viewFile(${docId})" class="documentName">${fold}</button> 
     </div>
         `;  

          create.appendChild(art);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
function popup(docId){
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
      sendToTrash(docId);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

function viewDetail(docid) {
    const Owner = document.getElementById("Owner");
    const documentname = document.getElementById("documentname");
    const size = document.getElementById("size");
    const createdBy = document.getElementById("createdby");
    const createdAt = document.getElementById("createdAt");
      Owner.innerHTML = "Owner: " + sessionStorage.getItem("name");
      createdBy.innerHTML = "createdby: " +  sessionStorage.getItem("name");
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://localhost:44366/api/Document/Details/" + docid, requestOptions)
      .then(response => response.json())
      .then(result =>(documentname.innerHTML="DocumentName: " + result[0].documentName , createdAt.innerHTML="CreatedAt: " + result[0].createdAt , size.innerHTML="Size: " + result[0].size))
      .catch(error => console.log('error', error))

}

// upload a file from local storage

function uploadFiles() {
  let value = choose.files[0];
  var formdata = new FormData();
  formdata.append("files", value);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "https://localhost:44366/api/Document/upload/"+date+"/"+id+"/"+folderid,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      listFolders();
    })
    .catch((error) => console.log("error", error));
}

function viewFile(docId) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  let url = "https://localhost:44366/api/Document/download/" + docId;

  fetch(url, requestOptions)
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.click();
    });
}

function downloadFile(docId) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  let url = "https://localhost:44366/api/Document/download/" + docId;

  fetch(url, requestOptions)
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = docId;
      a.click();
    });
}

function sendToTrash(docId) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch("https://localhost:44366/api/Document/" + docId, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      listFolders();
    })
    .catch((error) => console.log("error", error));
}

function filesfavorites(folderid)
{
    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };
      
      fetch("https://localhost:44366/api/Document/favourite/" + folderid, requestOptions)
        .then(response => response.text())
        .then(result =>{})
        .catch(error => console.log('error', error));
}

function searchItem() {
  try {
    var val = document.getElementById("search1");

    var url = "https://localhost:44366/api/Document/"+val.value +","+ folderid + "," +id ;

    var create = document.getElementById("create");
    create.innerHTML = "";
    fetch(url, {
      method: "GET",
    })
    .then((response) => response.json())
      .then((folders) => {
        folders.forEach((folder) => {
          var create = document.getElementById("create");
          var art = document.createElement("article");
          const fold = folder.documentName;
          const docId = folder.documentId;
          art.innerHTML = `
          <div class= "file">
          <i class="fa-regular fa-star star " id="icon"  onclick="addToFavourites(${docId})"></i>
          <img  class="documentimg" src ="https://img.freepik.com/free-vector/open-folder-folder-with-documents-document-protection-concept_183665-104.jpg?w=826" height=90px>
          <label class="dropdown"> 
    <div class=" dropdowndiv dd-button">
    <i class=" dots fa-solid fa-ellipsis-vertical "></i> 
     </div>
     <input type="checkbox" class="dd-input" id="test">
     <ul class=" menulist dd-menu">
       <li class="menuu" onclick="viewDetail(${docId})"  ><button id="viewdetails"  type="button" ><span class ="trigger"> <button id="viewdetails" " type="button" class="btn-" data-toggle="modal" data-target="#exampleModalLong">
       View details
        </button> </span></button></li>
       <li class="divider"></li>
       <li class="menuu" > <button id="viewdetails" type="button" onclick="popup(${docId})">Delete File</button></li>
       <li class="divider"></li>
      
       <li class="menuu" onclick="filesfavorites(${docId})"><span clas="trigger"  id="favorites"> Add to Favourites</span> </li>
       <li class="divider"></li>
       <li class="menuu" ><span clas="trigger" onclick=" downloadFile(${docId})"  id="favorites">Download File</span>
  
     </ul>
     </label>  
     <button  onclick="viewFile(${docId})" class="documentName">${fold}</button> 
     </div>
         `;  

          create.appendChild(art);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
