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











//open loginpage
 async function openpage() {
 	window.location.href = 'log.html';
}