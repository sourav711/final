function checkUser()
{ 
	let user=document.getElementById("user").value;
	let password=document.getElementById("password").value;

	var request={
		method:'POST',
		body: JSON.stringify({
			"username": user,
			"password": password,
		}),
		 
		// Adding headers to the request
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
		
	}; try{
		
	fetch("https://localhost:44392/api/Login", request)
	.then( res=>res.json())
	    .then(data=> showstorage(data))
	}
catch(error){
	alert('you are not valid');
}


};

function showstorage(data)
{
if(data.token!=null && data.token!=undefined && data.token!="")
{   
	console.log(data);
	sessionStorage.setItem("token",data.token);
	sessionStorage.setItem("id",data.id);
	sessionStorage.setItem("name",data.name);
}
loc();

}
function loc()
{
	
if(sessionStorage.getItem("token")!=null)
{
window.location.href="cg.html";

}
else

{

alert("Login Credentials are wrong");

}

}







// var token;
//  function sesstorage (result) {
 
//   sessionStorage.setItem('token', result);
// console.log(result);
// token=result;
// console.log(token);
// addclass(token);
// }
// function addclass(token) {
// 	console.log("inside addclass fun")
// 	if ( !token=== null) {
//         console.log("this is a form");
// 	  window.location.href="admin.html";
// 	  } else
//  {
	  
// 	  console.log("inside id token is null");
// 	  alert("hello");
//  	// const form = document.getElementById('form').action = '/admin.html';
//  }
//  }
 


// //  sessionStorage.getItem(token)

//open loginpage
 async function openpage() {
 	window.location.href = 'log.html';
}