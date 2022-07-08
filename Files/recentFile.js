id=sessionStorage.getItem("id");
folderId=sessionStorage.getItem("folderId")
function listFolders() {
    debugger;
      try
      {
        var create = document.getElementById("create");
        create.innerHTML = ''; 
        url='https://localhost:44366/api/Document/Recent/'+id+"/"+folderId+"/2";
      fetch(url, {
        method: 'GET'
      })
      .then(response => response.json())
      .then((folders) => {
        folders.forEach(folder => {
      
        var create = document.getElementById("create");
        var art = document.createElement("article");
        art.setAttribute("id" , "clickable");
        const docName= folder.documentName;
        const docId=folder.documentId;
        art.innerHTML = ` 
        
        
        <div class= "file">
        <i class="fa-regular fa-star star " id="icon" "></i>
        <img  class="documentimg" src ="https://img.freepik.com/free-vector/open-folder-folder-with-documents-document-protection-concept_183665-104.jpg?w=826" height=90px>
        <label class="dropdown"> 
  <div class=" dropdowndiv dd-button">
  <i class=" dots fa-solid fa-ellipsis-vertical "></i> 
   </div>
   <input type="checkbox" class="dd-input" id="test">
   <ul class=" menulist dd-menu">
      <li class="menuu" onclick="viewDetail(${docId})" >
      <span class ="trigger"> 
     <button id="viewdetails" type="button" class="btn-" data-toggle="modal" data-target="#exampleModalLong">
        View details
      </button> </span></li>
     <li class="divider"></li>
     <li class="menuu" onclick="popup(${docId})"> Delete the file</a></li>
     <li class="divider"></li>    
     <li class="menuu" onclick="addToFavourite(${docId})"><span clas="trigger"  id="favorites">Add to Favourites</span> </li>
     <li class="divider"></li>
     <li class="menuu" onclick="downloadFile(${docId})"><span clas="trigger" id="favorites">Download the file</span>

   </ul>
   </label>  
   <button class="documentName" onclick="viewFile(${docId})">${docName}</button> 
   </div>
    
        
        
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
    let logou = document.getElementById("logoutbtn");
    function logout() {
      window.location.href = "index.html";
      sessionStorage.clear();
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
      function viewFile(docId) {
        debugger;
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
            .then(result =>{documentname.innerHTML="DocumentName: " + result[0].documentName , createdAt.innerHTML="CreatedAt: " + result[0].createdAt , size.innerHTML="Size: " + result[0].size})
            .catch(error => console.log('error', error))
      
      }

      function addToFavourite(docId)
{
  debugger;
    var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };
      
      fetch("https://localhost:44366/api/Document/favourite/" + docId, requestOptions)
        .then(response => response.text())
        .then(result =>{})
        .catch(error => console.log('error', error));
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