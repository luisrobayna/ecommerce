//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let profile = document.getElementById('profile')
    let profile_info = document.getElementById('profile_info')
    let profile_image = document.getElementById('profile_image')
    let update_profile = document.getElementById('update_profile')

    console.log(image_user.src)

    if (!localStorage.getItem('profile')){
        profile_info.innerHTML=`
        <p>Nombres:</p>
        <p>Apellidos:</p>
        <p>E-mail:</p>
        <p>Telefono de contacto:</p>
        ` 

        profile_image.innerHTML = `
        <img src="https://i.ibb.co/f4btYjd/user-default.png" id="image_user">
        <p id="edit_photo"><span>Editar <i class="fas fa-camera"></i></span></p>
        <div id="images_box">
        <i class="far fa-times-circle"></i>
        <div>
          <img class="img" src="https://i.ibb.co/Q8pVV5M/avatar1.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/k9dpk8y/avatar2.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/1KF4Kvp/avatar3.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/DwcT9fC/avatar4.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/PrRQLbY/avatar5.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/dBTyh71/avatar6.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/nrxzjcV/avatar7.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/xsj420w/avatar8.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/rmGHLZ5/avatar9.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/fQ5D208/avatar10.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/D5hVMpk/avatar11.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/6Xd9zpP/avatar12.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/MZdcGjv/avatar13.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/pQNMJWh/avatar14.png">
        </div>
  
        <div>
          <img class="img" src="https://i.ibb.co/f4btYjd/user-default.png">
        </div>
      </div>
        `
        let image_user = document.getElementById('image_user')
        let edit_photo = document.getElementById('edit_photo')
        let images_box = document.getElementById('images_box')

        let close_box = document.getElementsByClassName('far fa-times-circle')
        close_box[0].addEventListener('click',()=>{
            images_box.style.display = "none"
        })

        edit_photo.addEventListener('click',()=>{
            images_box.style.display = "flex"
            let img = document.getElementsByClassName('img')
            for(let i = 0; i< img.length; i++){
                img[i].addEventListener('click',()=>{
                    image_user.src = img[i].src
                    if(!localStorage.getItem('profile')){
                        let profile_object = {
                            name: "",
                            last_name: "",
                            email: "",
                            phone_number: "",
                            image: img[i].src
                        }
                        localStorage.setItem('profile',JSON.stringify(profile_object))
                    }else{
                        let profile_storage = JSON.parse(localStorage.getItem('profile'))
                        profile_storage.image = img[i].src
                        localStorage.setItem('profile',JSON.stringify(profile_storage))
                    }
                })
            }

        })

        update_profile.addEventListener('click',()=>{
            profile_info.innerHTML = `
            <form id="form_update" action="">
                <label for="name">Nombres:</label><br>
                <input type="text" name="name" id="name"><br>
                <label for="lastname">Apellidos:</label><br>
                <input type="text" name="lastname" id="lastname"><br>
                <label for="email">E-mail:</label><br>
                <input type="email" name="email" id="email"><br>
                <label for="phone">Telefono de contacto:</label><br>
                <input type="text" name="phone" id="phone_number"><br>
                <input type="submit" value="Confirmar" id="confirm">
          </form>
            `
            update_profile.style.display = "none"
            let form_update = document.getElementById('form_update')
            form_update.addEventListener('submit',(e)=>{
                
                let data = new FormData(e.target)
                let profile_object = {
                    name: data.get('name'),
                    last_name: data.get('lastname'),
                    email: data.get('email'),
                    phone_number: data.get('phone'),
                    image: ""
                }
                e.preventDefault()
                localStorage.setItem('profile',JSON.stringify(profile_object))
    
                profile_info.innerHTML = `
                    <p>Nombres:<span> ${data.get('name')}</span></p>
                    <p>Apellidos:<span>${data.get('lastname')}</span></p>
                    <p>E-mail: <span>${data.get('email')}</span></p>
                    <p>Telefono de contacto:<span> ${data.get('phone')}</span></p>
                `
                update_profile.style.display = "block"
            })
        })

    }else{
        let info = JSON.parse(localStorage.getItem('profile'))
        if (info.image == ""){
            info.image = "https://i.ibb.co/f4btYjd/user-default.png"
        }
      
        profile_info.innerHTML = `
        <p>Nombres:<span>${info.name}</span></p>
        <p>Apellidos:<span>${info.last_name}</span></p>
        <p>E-mail: <span>${info.email}</span></p>
        <p>Telefono de contacto:<span>${info.phone_number}</span></p>
        `
        profile_image.innerHTML = `
        <img src="${info.image}" id="image_user">
        <p id="edit_photo"><span>Editar <i class="fas fa-camera"></i></span></p>
        <div id="images_box">
        <i class="far fa-times-circle"></i>
        <div>
          <img class="img" src="https://i.ibb.co/Q8pVV5M/avatar1.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/k9dpk8y/avatar2.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/1KF4Kvp/avatar3.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/DwcT9fC/avatar4.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/PrRQLbY/avatar5.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/dBTyh71/avatar6.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/nrxzjcV/avatar7.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/xsj420w/avatar8.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/rmGHLZ5/avatar9.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/fQ5D208/avatar10.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/D5hVMpk/avatar11.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/6Xd9zpP/avatar12.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/MZdcGjv/avatar13.png">
        </div>
        <div>
          <img class="img" src="https://i.ibb.co/pQNMJWh/avatar14.png">
        </div>
  
        <div>
          <img class="img" src="https://i.ibb.co/f4btYjd/user-default.png">
        </div>
      </div>
        `
        let image_user = document.getElementById('image_user')
        let edit_photo = document.getElementById('edit_photo')
        let images_box = document.getElementById('images_box')

        let close_box = document.getElementsByClassName('far fa-times-circle')
        close_box[0].addEventListener('click',()=>{
            images_box.style.display = "none"
        })
        
        edit_photo.addEventListener('click',()=>{
            images_box.style.display = "flex"
            let img = document.getElementsByClassName('img')
            for(let i = 0; i< img.length; i++){
                img[i].addEventListener('click',()=>{
                    image_user.src = img[i].src
                    let profile_storage = JSON.parse(localStorage.getItem('profile'))
                    profile_storage.image = img[i].src
                    localStorage.setItem('profile', JSON.stringify(profile_storage))
                })
            }
        
        })

        update_profile.addEventListener('click',()=>{
            console.log(info)
            profile_info.innerHTML = `
            <form id="form_update" action="">
                <label for="name">Nombres:</label><br>
                <input type="text" name="name" id="name" value="${info.name}"><br>
                <label for="lastname">Apellidos:</label><br>
                <input type="text" name="lastname" id="lastname" value="${info.last_name}"><br>
                <label for="email">E-mail:</label><br>
                <input type="email" name="email" id="email" value="${info.email}"><br>
                <label for="phone">Telefono de contacto:</label><br>
                <input type="text" name="phone" id="phone_number"  value="${info.phone_number}"><br>
                <input type="submit" value="Confirmar" id="confirm">
          </form>
            `
            update_profile.style.display = "none"
            let form_update = document.getElementById('form_update')
            form_update.addEventListener('submit',(e)=>{
                let profile_storage = JSON.parse(localStorage.getItem('profile'))
                let data = new FormData(e.target)
                let profile_object = {
                    name: data.get('name'),
                    last_name: data.get('lastname'),
                    email: data.get('email'),
                    phone_number: data.get('phone'),
                    image: profile_storage.image
                }
                e.preventDefault()
                localStorage.setItem('profile',JSON.stringify(profile_object))
                window.location.href = "my-profile.html"
    
            })
        })

    }
});