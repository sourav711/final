const constants = {
    apiBasePath: 'https://localhost:44392/api'
  }
  var id=sessionStorage.getItem("id");
  console.log(id);
  var adminname=sessionStorage.getItem("name");
  console.log(adminname);
  
 
var curr=new Date();
// var DateTime=curr.getFullYear()+"-"+curr.getMonth()+"-"+curr.getDay()+" "+ curr.getHours() + ":" 
// + curr.getMinutes() + ":" + curr.getSeconds();
const form = document.getElementById("folderr");
console.log(form);

function createfolder() {
try
{
 fetch('https://localhost:44392/api/Document', {
   body: JSON.stringify({
    // "folderName": form.value,
    // "createdBy": id,
    // "isDeleted": 0,
    "documentName": form.value,
      "createdAt": curr.toISOString(),
      "isDeleted": 0,
      "contentType": "c#",
      "size": 120,
      "createdBy": id,
      "folderId": sessionStorage.getItem("folderId"),
      
  }),
   method: 'POST',
   headers: {
    'Content-Type': 'application/json'
  },
 }).then((folderCreateResponse) => {
    console.log(folderCreateResponse);
     listFolders();
 });
}
catch(err)
{
  console.log(err);
}
} 
  function listFolders() {
    try
    {
      var create = document.getElementById("create");
      create.innerHTML = '';
    fetch('https://localhost:44392/api/Document/'+sessionStorage.getItem("folderId"), {
      method: 'GET'
    })
    .then(response => response.json())
    .then((folders) => {
      console.log(folders);
      folders.forEach(folder => {
    
      var create = document.getElementById("create");
      var art = document.createElement("article");
      console.log(folder);
      const fold = folder.documentName;
      console.log(fold);
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
        <li><button id="viewdetails" type="button" onclick="viewDetail()" >view details</button></li>
       
        <li class="divider"></li>
        
         <button id="viewdetails" type="button" onclick="deletefolder()" >Delete the Folder</button>
        
      </ul>
      </div>
       
    </label>
    <i class="fa-solid fa-download"></i>  
     
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
  // function openfile() {
    
  //   window.location.href="cg.html";
  // }
  
  function onLoad() {
    listFolders();
    document.getElementById("admin").innerHTML=adminname;
  }
  
  onLoad();
  
  
  // let logou = document.getElementById("logoutbtn");
  
  // function logout() {
  //   window.location.href = "index.html";
  //   sessionStorage.clear();
  
  
  // }
  function searchItem() {

   

    var val=document.getElementById("search1");
    console.log(val.value);
  
    var url="https://localhost:44392/api/Values/"+val.value+","+id;
  
    fetch(url)
  
    .then((res) => res.json())
    .then((folders) => {
      // console.log(folders);
      folders.forEach(folder => {
        var create = document.getElementById("create");
        create.innerHTML = '';
    
      var create = document.getElementById("create");
      var art = document.createElement("article");
      const fold = folder.folderName;
      
      // fold.style.backgroundColor = "red";
      // console.log(fold);
      art.innerHTML = `<i class='fa-solid  fa-4x fa-folder'>  <label class="dropdown">
  
          <div class="dd-button">
          <i class=" dots fa-solid fa-ellipsis-vertical"></i>
          </div>
        
          <input type="checkbox" class="dd-input" id="test">
        
          <ul class="dd-menu">
            <li class=" view" >view details</li>
           
            <li class="divider"></li>
             <li class="view">
            Delete the folder
            </li> 
          </ul>
          
        </label>
          
        
      <button onclick=openfile() style="font-size:   40px; color: black; text-decoration: none;position: relative;left: 20px;bottom: 20px;cursor: pointer;">${fold}</button>
      
      </i>`;
      create.appendChild(art);
      });
    })
  }
  
  
  // choose file function

  const choose = document.getElementById('real-file');
  console.log(choose);

  function choosefiles () {
    debugger;
      let value = choose.files[0].name;
        try
        {
         fetch('https://localhost:44392/api/Document', {
           body: JSON.stringify({
            // "folderName": form.value,
            // "createdBy": id,
            // "isDeleted": 0,
            "documentName": value,
              "createdAt": curr.toISOString(),
              "isDeleted": 0,
              "contentType": "c#",
              "size": 120,
              "createdBy": id,
              "folderId": sessionStorage.getItem("folderId"),
              
          }),
           method: 'POST',
           headers: {
            'Content-Type': 'application/json'
          },
         }).then((folderCreateResponse) => {
            console.log(folderCreateResponse);
             listFolders();
         });
        }
        catch(err)
        {
          console.log(err);
        }
        } 
  

        function listFolders() {
          try
          {
            var create = document.getElementById("create");
            create.innerHTML = '';
          fetch('https://localhost:44392/api/Document/'+sessionStorage.getItem("folderId"), {
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
              <li><button id="viewdetails" type="button" onclick="viewDetail(${docId})" >view details</button></li>
             
              <li class="divider"></li>
              
               <button id="viewdetails" type="button" onclick="deletefile(${docId})" >Delete the Folder</button>
              
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

        
function deletefile(fileid) {
  

  var raw = "";

var requestOptions = {
  method: 'DELETE',
  body: raw,
  redirect: 'follow'
};

let deleteurl = "https://localhost:44392/api/Document/" + fileid;


fetch(deleteurl,requestOptions)
.then(response=>response.text())
.then(result => console.log(result))
  .catch(error => console.log('error', error));
  location.reload();  

}
function viewDetail(fold) {

console.log(fold);
fetch('https://localhost:44392/api/Fileview/'+ fold )
.then(response=>response.json())
.then(result=>{
   alert(
   "Document Id:" +result.documentId+
  "\nDocument Name:"+ result.documentName+
  "\nContent Type:"+ result.contentType+
  "\nSize:"+ result.size+
  "\nCreated By:"+ result.createdBy+
  "\nCreated At:"+result.createdAt+
  "\nFolder Id:"+ result.folderId,
)
})
}