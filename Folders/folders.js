
const constants = {
  apiBasePath: "https://localhost:44366/api/",
};
var id = sessionStorage.getItem("id");
var adminname = sessionStorage.getItem("name");
const form = document.getElementById("folderr");

//creating a new folder

function createfolder() {
  try {
    fetch("https://localhost:44366/api/Folder", {
      body: JSON.stringify({
        folderName: form.value,
        createdBy: id,
        isDeleted: 0,
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

//listing all folders on dashboard

function listFolders() {
  try {
    var create = document.getElementById("create");
    create.innerHTML = "";
    fetch(`${constants.apiBasePath}/Folder/` + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        folders.forEach((folder) => {
          var create = document.getElementById("create");
          var art = document.createElement("article");
          art.setAttribute("id", "clickable");
          var fold = folder.folderName;
          const folderId = folder.folderId;
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
                  </button>
                </li>
      
                <li class="divider">
                </li>
                <li class="menuu" onclick="popup(${folderId})">
                      Delete the folder
                </li>
                <li class="divider">
                </li>
                <li class="menuu" onclick="favorites(${folderId})">
                  <span clas="trigger"  id="favorites">
                      Add to Favourites
                  </span>
                </li>
       
              </ul> 
    </label> 
    <button  id="clickableimg" onclick="openfile(${folderId})" class="folderName">${fold}</button>

    
    `;

          create.appendChild(art);
        });
      });
  } catch (err) {
    console.log(err);
  }
}


//function to open a folder
function openfile(folderId) {
  sessionStorage.setItem("folderId", folderId);
  window.location.href = "/Files/file.html";
}


function onLoad() {
  listFolders();
  document.getElementById("admin").innerHTML = adminname;
  document.getElementById("admin1").innerHTML=adminname;
  document.getElementById("email").innerHTML=sessionStorage.getItem("email");
}
onLoad();


//function to logout 
function logout() {
  window.location.href = "index.html";
  sessionStorage.clear();
}

//searching folders in dashboard
function searchItem() {
  try {
    var val = document.getElementById("search1");
    var url = "https://localhost:44366/api/Folder/" + id + "/" + val.value;
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
          art.setAttribute("class", "clickable");
          const fold = folder.folderName;
          const folderId = folder.folderId;
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
                  </button>
                </li>
      
                <li class="divider">
                </li>
                <li class="menuu" onclick="popup(${folderId})">
                      Delete the folder
                </li>
                <li class="divider">
                </li>
                <li class="menuu" onclick="favorites(${folderId})">
                  <span clas="trigger"  id="favorites">
                      Add to Favourites
                  </span>
                </li>
       
              </ul> 
    </label> 
    <button  id="clickableimg" onclick="openfile(${folderId})" class="folderName">${fold}</button>

    
    `;
          create.appendChild(art);
        });
      });
  } catch (err) {
    console.log(err);
  }
}

// favorites

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

function gridchange() {
  const grid = document.getElementById("create");
  if (grid.className == "grid") {
    grid.setAttribute("class", "flex");
    return;
  } else if (grid.className == "flex") {
    grid.setAttribute("class", "grid");
  } else {
  }
}


//sending folder to trash
 function sendToTrash(folderId) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch(
    "https://localhost:44366/api/Folder/SoftDeleted/" + folderId,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      listFolders();
    })
    .catch((error) => console.log("error", error));
}


// view details
function viewdetails( FolderId) {
  const Owner = document.getElementById("Owner");
  const foldername = document.getElementById("foldername");
  const createdby = document.getElementById("createdby");
  const modified = document.getElementById("Modified");
  const createdAt = document.getElementById("createdAt");
createdby.innerHTML =   "Created By:  " + sessionStorage.getItem("name");
Owner.innerHTML = "Owner:  " + sessionStorage.getItem("name");
modified.innerHTML = "Modified: " + sessionStorage.getItem("name");
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

 let result = fetch("https://localhost:44366/api/Folder/details/" + FolderId, requestOptions)
  .then(response =>  response.json())
  .then(result =>{ foldername.innerHTML="Folder Name: "+result.folderName 
   createdAt.innerHTML="Created At: "+result.createdAt
   })
  .then(response=> console.log(response))
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

//adding to favourites
function addToFavourites(folderId) {
  var requestOptions = {
    method: 'PUT',
    redirect: 'follow'
  };
    fetch("https://localhost:44366/api/Folder/favourite/"+folderId, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
 
}
function visibility() {
  const visible = document.getElementById("span");
  const visible2 = document.getElementById("span1");

  visible.setAttribute("class", "visible");
  visible2.setAttribute("class", "visible");
}


// Add a descrption
function Descption() {
  const pen = document.getElementById("seeinput");
  pen.innerHTML = `<input type="text placeholder="Descption">`;
}


// responsive
const html = document.documentElement;
const body = document.body;
const menuLinks = document.querySelectorAll(".admin-menu a");
const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
const switchInput = document.querySelector(".switch input");
const switchLabel = document.querySelector(".switch label");
const switchLabelText = switchLabel.querySelector("span:last-child");
const collapsedClass = "collapsed";
const lightModeClass = "light-mode";

// TOGGLE HEADER STATE/
collapseBtn.addEventListener("click", function () {
  body.classList.toggle(collapsedClass);
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});

// TOGGLE MOBILE MENU/
toggleMobileMenu.addEventListener("click", function () {
  body.classList.toggle("mob-menu-opened");
  this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "open menu"
    ? this.setAttribute("aria-label", "close menu")
    : this.setAttribute("aria-label", "open menu");
});

// SHOW TOOLTIP ON MENU LINK HOVER/
for (const link of menuLinks) {
  link.addEventListener("mouseenter", function () {
    if (
      body.classList.contains(collapsedClass) &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      const tooltip = this.querySelector("span").textContent;
      this.setAttribute("title", tooltip);
    } else {
      this.removeAttribute("title");
    }
  });
}

// TOGGLE LIGHT/DARK MODE/
if (localStorage.getItem("dark-mode") === "false") {
  html.classList.add(lightModeClass);
  switchInput.checked = false;
  switchLabelText.textContent = "Light";
}

switchInput.addEventListener("input", function () {
  html.classList.toggle(lightModeClass);
  if (html.classList.contains(lightModeClass)) {
    switchLabelText.textContent = "Light";
    localStorage.setItem("dark-mode", "false");
  } else {
    switchLabelText.textContent = "Dark";
    localStorage.setItem("dark-mode", "true");
  }
});

// toogle menu
const clickable = document.getElementById('clickable')
const menu = document.getElementById('menu')
const outClick = document.getElementById('out-click')

clickable.addEventListener('contextmenu', e => {
  e.preventDefault()

  menu.style.top = `${e.clientY}px`
  menu.style.left = `${e.clientX}px`
  menu.classList.add('show')

  outClick.style.display = "block"
})

outClick.addEventListener('click', () => {
  menu.classList.remove('show')
  outClick.style.display = "none"
})
modal

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
 
