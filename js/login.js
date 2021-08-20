//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){  

    let login = document.getElementById("login");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let avisoError = document.getElementById("error");
    login.addEventListener("submit", (event)=>{
        if (email.value === "" || password.value === ""){
            localStorage.setItem('logeado','false');
            avisoError.style.display = "block";
            avisoError.innerHTML = `<p>Por favor ingrese los datos correctamente</p>`;
            email.value = "";
            password.value = "";
            event.preventDefault()
        }else{
            localStorage.setItem('logeado','true');
        }
    })
    
    function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
  
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        return id_token;
    }
    let id = onSignIn()
    console.log(id);
});