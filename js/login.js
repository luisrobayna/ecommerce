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
            quitarError(avisoError);
            email.value = "";
            password.value = "";
            event.preventDefault()
        }else{
            localStorage.setItem('logeado','true');
            localStorage.setItem('nombre',email.value);
        }
    })
});