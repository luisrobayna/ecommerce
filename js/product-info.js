//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    

    function showImagesGallery(array){

        let htmlContentToAppend = "";
    
        for(let i = 0; i < array.length; i++){
            let imageSrc = array[i];
    
            htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
                </div>
            </div>
            `
    
            document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
        }
    }


    function productInfo(url) {
        getJSONData(url)
            .then(dato => {
                let informacion = dato.data;
                productTitle.innerHTML = informacion.name;
                productDescription.innerHTML = informacion.description;
                costProduct.innerHTML = informacion.cost+ " "+informacion.currency;
                productCount.innerHTML = informacion.soldCount;
                productCriteria.innerHTML = informacion.category;
                //Imprimimos array de imagenes
                showImagesGallery(informacion.images);

            })
    };

    function productComments(url){
        getJSONData(url)
        .then(dato => {
            let informacion = dato.data;
            let stars;
            informacion.forEach(element =>{
                for(let i=0; i<element.score; i++){
                    stars += `<span class="fa fa-star checked"></span>`
                }
                comentarios.innerHTML += `
                <div class="comentContainer">
                   
                    <p class="userAndScore">${element.user}${stars}</p>
                    
                    <p class="timeComment">${element.dateTime}</p>
                    <p class="descriptionComment">${element.description}</p>
                </div>
                `
                stars = 0;
            })
            /*Aca ira el codigo del comentario agregado*/
            comentarios.innerHTML += `
            <div id="addComment">
                <p class="userAndScore">${localStorage.getItem('nombre')}<span>Score: <input type="number" id="cantStarts"></span></p>
                <p class="timeComment"></p>
                    <textarea  placeholder="Descripciòn del comentario...." id="contentComment" class="descriptionComment"></textarea>
                    <input type="button" value="Publicar" id="submit">
            </div>
            `
            let buttonSubmit =  document.getElementById('submit');
            
            buttonSubmit.addEventListener('click',(e)=>{
                let hoy = new Date
                let day = hoy.getFullYear()+ '-'+( hoy.getMonth() + 1 )+'-'+ hoy.getDate()
                let hour = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
                let time = day+" "+ hour;
                let user = localStorage.getItem('nombre')
                let cantStarts = document.getElementById('cantStarts').value
                let textarea = document.getElementById('contentComment').value;
                let infoComments = [];

                infoComments.push({name: user,score: cantStarts, description: textarea});
                localStorage.setItem('infoComments',JSON.stringify(infoComments));
                let stars;
                for(let i=0; i <cantStarts; i++){
                    stars += `<span class="fa fa-star checked"></span>`
                }
                comentarios.innerHTML += `
                <div class="comentContainer">
                    <p class="userAndScore">${user} ${stars}</p>
                    <p class="timeComment">${time}</p>
                    <p class="descriptionComment">${textarea}</p>
                </div>
                `

                console.log(textarea)
                console.log(time)
            })
        })
    }


    //Imprimimos la informacion del producto
    let productContainer = document.getElementById('productContainer');
    let productTitle = document.getElementById('productTitle');
    let productDescription = document.getElementById('productDescription');
    let costProduct = document.getElementById('costProduct');
    let productCount = document.getElementById('productCount');
    let productCriteria = document.getElementById('productCriteria');
    let productImagesGallery = document.getElementById('productImagesGallery');
    productInfo(PRODUCT_INFO_URL);

    //Imprimimos los comentarios del productos
    let comentarios = document.getElementById('comentarios');
    productComments(PRODUCT_INFO_COMMENTS_URL);

});