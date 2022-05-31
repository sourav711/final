function checkUser(){
	let user=document.getElementById("users").value;
	let password=document.getElementById("pass").value;

	var request={
		method:'POST',
		redirect:'follow',
		body: JSON.stringify({
			"username": user,
			"password": password,
		}),
		 
		// Adding headers to the request
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
		
	};
	fetch("https://localhost:44392/api/Login", request)
	.then(response => response.text())
	.then(result => sesstorage(result))
	.catch(error => console.log('error', error))
    
}

function sesstorage (result) {
 
     sessionStorage.setItem('token', result);
console.log(result);
}