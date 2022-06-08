var style=document.createElement('style');
style.innerHTML=`
#container{
    background-color:lavender;
    border-radius: 10px;
    width: 500px;
    height:700px;
    margin-left:30%;
    margin-top:5%;
    border: 2px solid black;
    display:flex;
    flex-direction:column;
  align-items:center; 
}
#head{
    margin:2px;
    padding: 0 0 10px;
    text-align: center;
    font-size: 40px;
    font-family: 'Times New Roman', Times, serif;
    color: #702323;
    font-style:oblique;

}
#inner{
    display:flex;
    flex-direction:column;
}

input{
    width:100%;
    margin-bottom: 15px;
}
 input[type="text"],input[type="email"], input[type="password"]
{
    border:none;
    border-bottom: 1px solid rgb(231, 106, 106);
    background: transparent;
    outline:none;
    height:40px;
    color:rgb(119, 76, 76);
    font-size:16px;
}
#submit
{
    border:none;
    outline: none;
    height: 38px;
    width:33vw ;
    background: rgb(230, 144, 144);
    color:rgb(32, 11, 11);
    font-size: 18px;
    border-radius: 20px;
    text-align:center;
}


`;
document.head.appendChild(style);

let firstname = document.getElementById('firstName');
firstname.setAttribute('onfocusout' , 'checkName()');
let namereg = /^[a-z ,.'-]+$/i;
let showName = document.getElementById('mainname');
function checkName() {
    if(namereg.test(firstname.value))
    {
        showName.innerHTML ="Accepted";
        document.querySelector("#mainname").style.backgroundColor="green";
    }
    else
    {
        showName.innerHTML="Invalid or empty First Name";
        document.querySelector("#mainname").style.backgroundColor="red";
    }   
};
let lname = document.getElementById('lastName');
lname.setAttribute('onfocusout' , 'checkLast()');
let lnamereg = /^[a-z ,.'-]+$/i;
let  showLast = document.getElementById('last');


function checkLast() {
    if(lnamereg.test(lname.value))
    {
        showLast.innerHTML = 'Accepted';
        document.querySelector("#last").style.backgroundColor="green";
    }
    else
     {
         showLast.innerHTML = 'Invalid or Empty Last Name';
         document.querySelector("#last").style.backgroundColor="red";
     }
}

let mail = document.getElementById('email');
mail.setAttribute('onfocusout' , 'checkMail()');
let alerts = document.getElementById('showmail');
let mailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function checkMail() {
  if(mailreg.test(mail.value))
    {
      alerts.innerHTML ='Accepted';
      document.querySelector("#showmail").style.backgroundColor="green";
    }else {
  alerts.innerHTML ="Please Enter Valid Email";
  document.querySelector("#showmail").style.backgroundColor="red";
    }
}

let passkey = document.getElementById('newp');
passkey.setAttribute('type' , 'password');
passkey.setAttribute('onfocusout' ,'checkPass()');
let passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let checkpassword =document.getElementById('newPass');


function checkPass() {
    if (passreg.test(passkey.value)) {

       checkpassword.innerHTML = 'Accepted';
       document.querySelector("#newPass").style.backgroundColor="green";
   }
   else
   {
       checkpassword.innerHTML ='Not Valid';
       document.querySelector("#newPass").style.backgroundColor="red";
   }
}

let lastpass = document.getElementById('password');
lastpass.setAttribute('type' , 'password');
lastpass.setAttribute('onfocusout' , 'checknew()');

let checkConfirm = document.getElementById('repass');
function checknew() {
    if(passkey.value == lastpass.value&& (passreg.test(lastpass.value)) )
    {
        checkConfirm.innerHTML ="accepted";
        document.querySelector("#repass").style.backgroundColor="green";
    }
    else
    {
        checkConfirm.innerHTML='Password Mismatch';
        document.querySelector("#repass").style.backgroundColor="red";
    }
}


let mobileNo = document.getElementById('number');
mobileNo.setAttribute('onfocusout' , 'checkNo()');
let mobreg = /^\d{10}$/;
let showMob = document.getElementById('mobile');
function checkNo() {
    if (mobreg.test(mobileNo.value)) {
    
       showMob.innerHTML = 'Accepted';
       document.querySelector("#mobile").style.backgroundColor="green";
   }
   else
   {
       showMob.innerHTML ='Please enter a valid number';
       document.querySelector("#mobile").style.backgroundColor="red";
   }
}
