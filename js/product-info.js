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

    function carousel(array){
        let htmlContentToAppend = ""
        let htmlContentToAppend2 = ""
        let htmlContentToAppend3 = ""
        /*for (let i= 0;i<array.length;i++){
            if (i==0){
                htmlContentToAppend+=`
                <li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>
                `
            }else{
                console.log("ponemos los otros indicadores"+i)
                htmlContentToAppend+=`
                <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>
                `
            }
        }
        carouselIndicador.innerHTML+=  htmlContentToAppend*/
      
        for (let i= 0;i<array.length;i++){
            let imageSrc = array[i]
            if (i== 0){
                htmlContentToAppend2+=`
                <div class="carousel-item active">
                    <img src="${imageSrc}" class="d-block w-100" alt="...">
                </div>
                `
            }else{
                htmlContentToAppend2 +=`
                <div class="carousel-item">
                    <img src="${imageSrc}" class="d-block w-100" alt="...">
                </div>
                `
            }
        }
        carouselInner.innerHTML+=  htmlContentToAppend2
        htmlContentToAppend3 =`
            <a class="carousel-control-prev botonAtras" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next botonSiguiente" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
        `
        carouselContainer.innerHTML+= htmlContentToAppend3
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
                arrayRelated = informacion.relatedProducts;
                productosRelacionados = [];
                //Imprimimos array de imagenes
                //showImagesGallery(informacion.images);
                carousel(informacion.images)
                getJSONData(PRODUCTS_URL)
                    .then(info =>{
                        let datos = info.data
                        arrayRelated.forEach((element,index) =>{
                            for(let i = 0; i< datos.length; i++){
                                if (element == i){
                                    productosRelacionados.push(datos[i])
                                }
                            }
                        })
                        productosRelacionados.forEach(element =>{
                            relatedProducts.innerHTML +=`
                            <div class="card">
                                <a href="product-info.html">
                                    <div><img class="imageCard" src="${element.imgSrc}"></div>
                                    <div class="descriptionCard">
                                        <h3>${element.name}</h3>
                                        <p>${element.description}</p>
                                    </div>
                                    <div class="footerCard">
                                            <div class="cost"><p>Precio<span>${element.cost} ${element.currency}</span></p></div>
                                            <div class="sold"><p>Vendidos <span>${element.soldCount} </span></p></div>
                                    </div>
                                </a>
                            </div>
                            `
                        })
                        
                    })

            })
    };

    function productComments(url){
        getJSONData(url)
        .then(dato => {
            let informacion = dato.data;
            let stars = "";
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
        })
    }

    function sendComment(infoComments){

        let hoy = new Date
        let day = hoy.getFullYear()+ '-'+( hoy.getMonth() + 1 )+'-'+ hoy.getDate()
        let hour = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
        let time = day+" "+ hour;
        let user = localStorage.getItem('nombre')
        let cantStarts = document.getElementById('cantStarts').value;
        let textarea = document.getElementById('contentComment').value;
        
        infoComments.push({name: user,score: cantStarts, description: textarea});
        localStorage.setItem('infoComments',JSON.stringify(infoComments));
        let stars ="";
        if(cantStarts <= 0){
            cantStarts = 1;
        }
        if(cantStarts >=5){
            cantStarts = 5;
        }

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
    }

    //Imprimimos la informacion del producto

    let productTitle = document.getElementById('productTitle');
    let productDescription = document.getElementById('productDescription');
    let costProduct = document.getElementById('costProduct');
    let productCount = document.getElementById('productCount');
    let productCriteria = document.getElementById('productCriteria');
    let relatedProducts = document.getElementById('relatedProducts');
    let carouselContainer = document.getElementById('carouselExampleIndicators');
    //let carouselIndicador = document.getElementById('carouselIndicador');
    let carouselInner = document.getElementById('carouselInner');
    productInfo(PRODUCT_INFO_URL);

    //Imprimimos los comentarios del productos por medio de una URL
    let comentarios = document.getElementById('comentarios');
    productComments(PRODUCT_INFO_COMMENTS_URL);

    //Imprimimos los comentarios creados por nosotros mismos
    let sendForm =  document.getElementById('addComment');
    let arrComments = [];

    sendForm.addEventListener('submit',(e)=>{
        sendComment(arrComments);
        let points = document.getElementById('cantStarts');
        let text = document.getElementById('contentComment');
        points.value = "";
        text.value = "";
        e.preventDefault()
        let avisoComment = document.getElementById('alertComment');
        avisoComment.innerHTML = `<p class="animated bounceOutDown slower" id="avisoComment">Comentario publicado!!!</p>`
        
    })


});