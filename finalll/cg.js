// const html = document.documentElement;
// const body = document.body;
// import { constants } from './constants.js'
const constants = {
  apiBasePath: 'https://localhost:44392/api'
}
var id=sessionStorage.getItem("id");
console.log(id);
var adminname=sessionStorage.getItem("name");
console.log(adminname);

// const menuLinks = document.querySelectorAll(".admin-menu a");
// const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
// const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
// const switchInput = document.querySelector(".switch input");
// const switchLabel = document.querySelector(".switch label");
// const switchLabelText = switchLabel.querySelector("span:last-child");
// const collapsedClass = "collapsed";
// const lightModeClass = "light-mode";

// /*TOGGLE HEADER STATE*/
// collapseBtn.addEventListener("click", function () {
//   body.classList.toggle(collapsedClass);
//   this.getAttribute("aria-expanded") == "true"
//     ? this.setAttribute("aria-expanded", "false")
//     : this.setAttribute("aria-expanded", "true");
//   this.getAttribute("aria-label") == "collapse menu"
//     ? this.setAttribute("aria-label", "expand menu")
//     : this.setAttribute("aria-label", "collapse menu");
// });

// /*TOGGLE MOBILE MENU*/
// toggleMobileMenu.addEventListener("click", function () {
//   body.classList.toggle("mob-menu-opened");
//   this.getAttribute("aria-expanded") == "true"
//     ? this.setAttribute("aria-expanded", "false")
//     : this.setAttribute("aria-expanded", "true");
//   this.getAttribute("aria-label") == "open menu"
//     ? this.setAttribute("aria-label", "close menu")
//     : this.setAttribute("aria-label", "open menu");
// });

// /*SHOW TOOLTIP ON MENU LINK HOVER*/
// for (const link of menuLinks) {
//   link.addEventListener("mouseenter", function () {
//     if (
//       body.classList.contains(collapsedClass) &&
//       window.matchMedia("(min-width: 768px)").matches
//     ) {
//       const tooltip = this.querySelector("span").textContent;
//       this.setAttribute("title", tooltip);
//     } else {
//       this.removeAttribute("title");
//     }
//   });
// }

// /*TOGGLE LIGHT/DARK MODE*/
// if (localStorage.getItem("dark-mode") === "false") {
//   html.classList.add(lightModeClass);
//   switchInput.checked = false;
//   switchLabelText.textContent = "Light";
// }

// switchInput.addEventListener("input", function () {
//   html.classList.toggle(lightModeClass);
//   if (html.classList.contains(lightModeClass)) {
//     switchLabelText.textContent = "Light";
//     localStorage.setItem("dark-mode", "false");
//   } else {
//     switchLabelText.textContent = "Dark";
//     localStorage.setItem("dark-mode", "true");
//   }
// });

var curr=new Date();
	// var DateTime=curr.getFullYear()+"-"+curr.getMonth()+"-"+curr.getDay()+" "+ curr.getHours() + ":" 
	// + curr.getMinutes() + ":" + curr.getSeconds();
const form = document.getElementById("folderr");
console.log(form);

function createfolder() {
  try
  {
   fetch('https://localhost:44392/api/values', {
     body: JSON.stringify({
      // "folderName": form.value,
      // "createdBy": id,
      // "isDeleted": 0,
      "folderName": form.value,
        "createdBy": id,
        "createdAt": curr.toISOString(),
        "isDeleted": 0
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
  fetch(`${constants.apiBasePath}/values/`+sessionStorage.getItem("id"), {
    method: 'GET'
  })
  .then(response => response.json())
  .then((folders) => {
    // console.log(folders);
    folders.forEach(folder => {
  
    var create = document.getElementById("create");
    var art = document.createElement("article");
    const fold = folder.folderName;
    const folderId=folder.foldersId;
    console.log(folderId);
    // fold.style.backgroundColor = "red";
    // console.log(fold);
    art.innerHTML = `
    
    <i class='fa-solid  fa-4x fa-folder'> <label class="dropdown">
  

        <div class="dd-button">
        <i class=" dots fa-solid fa-ellipsis-vertical"></i>
        </div>
      
        <input type="checkbox" class="dd-input" id="test">
      
        <ul class="dd-menu">
          <li><button id="viewdetails" type="button" onclick="viewDetail(${folderId})" >view details</button></li>
         
          <li class="divider"></li>
          
           <button id="viewdetails" type="button" onclick="deletefolder(${folderId})" >Delete the Folder</button>
          
        </ul>
         
      </label>
    <button onclick=openfile(${folderId}) style="font-size:   40px; color: black; text-decoration: none;position: relative;left: 20px;bottom: 20px;cursor: pointer;">${fold}</button>
    
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
function openfile(folderId) {
  sessionStorage.setItem("folderId",folderId);
  window.location.href="file.html";
}

function onLoad() {
  listFolders();
  document.getElementById("admin").innerHTML=adminname;
 console.log( curr.toISOString());
}

onLoad();


let logou = document.getElementById("logoutbtn");

function logout() {
  window.location.href = "index.html";
  sessionStorage.clear();


}

function searchItem() {

   

  var val=document.getElementById("search1");
  console.log(val.value);

  var url="https://localhost:44392/api/Values/"+val.value+","+id;

  fetch(url)

  .then((res) => res.json())
  .then((folders) => {
    folders.forEach(folder => {
      var create = document.getElementById("create");
      create.innerHTML = '';
  
    var create = document.getElementById("create");
    var art = document.createElement("article");
    const fold = folder.folderName;
    const folderId=folder.foldersId;
    art.innerHTML = `
    
    <i class='fa-solid  fa-4x fa-folder'> <label class="dropdown">
  

        <div class="dd-button">
        <i class=" dots fa-solid fa-ellipsis-vertical"></i>
        </div>
      
        <input type="checkbox" class="dd-input" id="test">
      
        <ul class="dd-menu">
          <li><button id="viewdetails" type="button" onclick="viewDetail(${folderId})" >view details</button></li>
         
          <li class="divider"></li>
          
           <button id="viewdetails" type="button" onclick="deletefolder(${folderId})" >Delete the Folder</button>
          
        </ul>
         
      </label>
    <button onclick=openfile(${folderId}) style="font-size:   40px; color: black; text-decoration: none;position: relative;left: 20px;bottom: 20px;cursor: pointer;">${fold}</button>
    
    </i>`;
    create.appendChild(art);
    });
  })
}


const folde = document.getElementById("idfolder");
console.log(folde);


// VIEWDETAILS\
 function viewDetail(fold) {
   debugger;
console.log(fold);
fetch('https://localhost:44392/api/New/'+ fold )
.then(response=>response.json())
.then(result=>{
    alert("Folder id:"+result.foldersId + 
    "\nFolder Name:"+ result.folderName+
    "\nCreated By:"+ result.createdBy+
    "\nCreated At:"+result.createdAt
)
 })
}


//deleting a folder
function deletefolder(folder) {
  debugger;
  var raw = "";
var requestOptions = {

  method: 'DELETE',

  body: raw,

  redirect: 'follow'

};



let deleteurl = "https://localhost:44392/api/Values/" + folder;




fetch(deleteurl,requestOptions)

.then(response=>response.text())

.then(result => console.log(result))

  .catch(error => console.log('error', error));

  location.reload();  



}

