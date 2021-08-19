//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    function listProducts(url){
        getJSONData(url)
            .then(dato =>{
                let informacion = dato.data;
                let listaProduct = document.getElementById('listProduct');
                informacion.forEach(element =>{
                  
                    listaProduct.innerHTML+= `
                    <div class="row">
                         <div class="list-group" id="cat-list-container">
                            <a href="product-info.html" class="list-group-item list-group-item-action">
                                <div class="row">
                                    <div class="col-3">
                                        <img src="${element.imgSrc}" alt="${element.description}" class="img-thumbnail">
                                    </div>
                                    <div class="col">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h4 class="mb-1">${element.name}</h4>
                                            <medium class="text-muted">${element.cost} ${element.currency}</small>
                                        </div>
                                        <p class="mb-1">${element.description}</p>
                                    </div>
                                </div>
                            </a>
                         </div>
                    </div>
                    `
                  
                  
                    /*/listaProduct.innerHTML+= `
                         <div class="contProduct">
                            <img class="imagen" src="${element.imgSrc}">
                            <h2 class="nombre">${element.name}</h2>
                            <p class="precio">Precio: ${element.cost} ${element.currency}</p>
                            <p class="descripcion">Descripcion: ${element.description}</p>
                        </div>`*/
               })
            })
    }
   listProducts(PRODUCTS_URL)
})