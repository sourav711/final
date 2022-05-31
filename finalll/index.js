// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });


function sendData(){
	let user=document.getElementById("users").value;
	let password=document.getElementById("pass").value;
	var curr=new Date();
	var DateTime=curr.getFullYear()+"-"+curr.getMonth()+"-"+curr.getDay()+" "+ curr.getHours() + ":" 
	+ curr.getMinutes() + ":" + curr.getSeconds();
	console.log(DateTime);
	var request={
		method:'POST',
		redirect:'follow',
		body: JSON.stringify({
			"username": user,
			"password": password,
			"createdAt": DateTime
		}),
		 
		// Adding headers to the request
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
		
	};
	fetch("https://localhost:44392/api/User", request)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));}