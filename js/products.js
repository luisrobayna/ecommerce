//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var listaProduct = document.getElementById('listProduct');
    let avisoError = document.getElementById("error");

    //////////////Funcion que me Imprime una lista de Productos//////////////
    function imprimirLista(arreglo) {
        arreglo.forEach(element => {



            /*<div class="row">
            <div class="col-md-4">
              <a href="categories.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src="img/cat1.jpg">
                <h3 class="m-3">Autos (122) </h3>
                <div class="card-body">
                  <p class="card-text">Los mejores precios en autos 0 kilómetro, de alta y media gama.</p>
                </div>
              </a>
            </div>*/
            listaProduct.innerHTML+=`
            
                <div class="col">
                    <a href="categories.html" class="card mb-4 shadow-sm custom-card">
                        <img class="bd-placeholder-img card-img-top" src="${element.imgSrc}" alt="${element.description}">
                        <h3 class="m-3">${element.name}</h3>
                        <medium class="text-muted">${element.cost} ${element.currency}</small>

                        <div class="card-body">
                        <p class="card-text">${element.description}</p>
                        </div>
                    </a>
                </div>
            
            
            `

/*
            listaProduct.innerHTML += `
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
                                <div class="d-flex w-100 justify-content-between">
                                    <medium class="text-muted">${element.soldCount} artículos vendidos</small>
                                </div>
                                <p class="mb-1">${element.description}</p>
                               
                                
                            </div>
                        </div>
                    </a>
                 </div>
            </div>
            `*/
        })
    }

    //////////////Funcion que me Imprime una lista de Productos de una URL//////////////
    function listProducts(url) {
        getJSONData(url)
            .then(dato => {
                let informacion = dato.data;
                imprimirLista(informacion)
            })
    };

    //////////////Funcion que me Imprime una lista de Productos Ordenados Descendente//////////////
    function precioDESC(url) {
        getJSONData(url)
            .then(dato => {
                let informacion = dato.data;
                listaProduct.innerHTML = "";
                informacion.sort(function (a, b) {
                    return (b.cost - a.cost)
                })
                imprimirLista(informacion);
            })
    }

    //////////////Funcion que me Imprime una lista de Productos Ordenados Ascendente//////////////
    function precioASC(url) {
        getJSONData(url)
            .then(dato => {
                let informacion = dato.data;
                listaProduct.innerHTML = "";
                informacion.sort(function (a, b) {
                    return (a.cost - b.cost)
                })
                imprimirLista(informacion);
            })
    }

    //////////////Funcion que me Imprime una lista de Productos Ordenados Descendente por Relevancia //////////////
    function relevanciaDESC(url) {
        getJSONData(url)
            .then(dato => {
                let informacion = dato.data;
                listaProduct.innerHTML = "";
                informacion.sort(function (a, b) {
                    return (b.soldCount - a.soldCount)
                })
                imprimirLista(informacion);
            })
    }

    //////////////Funcion para ordenar por filtro con un rango de precio //////////////
    function rangoFiltro(url) {
        getJSONData(url)
            .then(dato => {
                let informacion = dato.data;
                listaProduct.innerHTML = "";
                let arregloFiltro = [];
                if (cantMin.value == "" && cantMax.value != "") {
                    informacion.forEach(element => {
                        if (element.cost <= parseInt(cantMax.value)) {
                            arregloFiltro.push(element)
                        }
                    })
                    if (arregloFiltro.length == 0) {
                        imprimirLista(informacion);
                        avisoError.style.display = "block";
                        avisoError.innerHTML = `<p>Lo sentimos no tenemos productos en ese rango de precio!!!</p>`;
                        quitarError(avisoError);
                    } else {
                        arregloFiltro.sort(function (a, b) {
                            return (b.cost - a.cost)
                        })
                        imprimirLista(arregloFiltro);
                    }
                } else if (cantMin.value != "" && cantMax.value == "") {
                    informacion.forEach(element => {
                        if (element.cost >= parseInt(cantMin.value)) {
                            arregloFiltro.push(element)
                        }
                    })
                    if (arregloFiltro.length == 0) {
                        imprimirLista(informacion);
                        avisoError.style.display = "block";
                        avisoError.innerHTML = `<p>Lo sentimos no tenemos productos en ese rango de precio!!!</p>`;
                        quitarError(avisoError);
                    } else {
                        arregloFiltro.sort(function (a, b) {
                            return (a.cost - b.cost)
                        })
                        imprimirLista(arregloFiltro);
                    }
                } else if (cantMin.value != "" && cantMax.value != "") {
                    if (parseInt(cantMin.value) > parseInt(cantMax.value)) {
                        avisoError.style.display = "block";
                        avisoError.innerHTML = `<p>El minimo no puede ser mayor que el maximo</p>`;
                        quitarError(avisoError);
                        imprimirLista(informacion)
                    } else if (parseInt(cantMin.value) == parseInt(cantMax.value)) {
                        avisoError.style.display = "block";
                        avisoError.innerHTML = `<p>El minimo y el maximo no pueden ser iguales</p>`;
                        quitarError(avisoError);
                        imprimirLista(informacion);
                    } else {
                        informacion.forEach(element => {
                            if (element.cost >= parseInt(cantMin.value) && element.cost <= parseInt(cantMax.value)) {
                                arregloFiltro.push(element)
                            }
                        })
                        if (arregloFiltro.length == 0) {
                            avisoError.style.display = "block";
                            avisoError.innerHTML = `<p>Lo sentimos no tenemos productos en ese rango de precio!!!</p>`;
                            quitarError(avisoError);
                        } else {
                            arregloFiltro.sort(function (a, b) {
                                return (a.cost - b.cost)
                            })
                            imprimirLista(arregloFiltro);
                        }
                    }
                } else {
                    avisoError.style.display = "block";
                    avisoError.innerHTML = `<p>Por favor ingese un rango de precio para poder usar el filtro!!!</p>`;
                    quitarError(avisoError);
                    imprimirLista(informacion)
                }
            })
    }

    //////////////Funcion para limpiar el filtro //////////////
    function limpiarFiltro(url) {
        getJSONData(url)
            .then(dato => {
                let informacion = dato.data;
                listaProduct.innerHTML = "";
                cantMin.value = "";
                cantMax.value = "";
                imprimirLista(informacion);
            })
    }

    //////////////Funcion para buscar producto //////////////
    function buscarProduct(url) {
        getJSONData(url)
            .then(dato => {
                let informacion = dato.data;
                busqueda.addEventListener('keydown', (evento) => {
                    if (evento.key == "Backspace" || evento.key == "Shift" || evento.key == "CapsLock" || evento.key == "Control" || evento.key == "Alt") {
                        if (evento.key == "Backspace") {
                            arrPalabra.pop();
                            buscar = arrPalabra.join('');
                            if (segundArreglo.length == 0) {
                                listaProduct.innerHTML = "";
                                imprimirLista(informacion)
                            } else {
                                segundArreglo = [];
                                informacion.forEach(element => {
                                    if (element.name.search(buscar) != -1 || element.description.search(buscar) != -1) {
                                        segundArreglo.push(element)
                                    }
                                })
                                listaProduct.innerHTML = "";
                                imprimirLista(segundArreglo)
                            }
                        }

                    } else {
                        arrPalabra.push(evento.key)
                        buscar = arrPalabra.join('')
                        informacion.forEach(element => {
                            if (element.name.search(buscar) != -1 || element.description.search(buscar) != -1) {
                                arrArtBusquda.push(element)
                            }
                        })
                        listaProduct.innerHTML = "";
                        imprimirLista(arrArtBusquda);
                        segundArreglo = arrArtBusquda;
                        arrArtBusquda = [];
                    }

                })



            })
    }

    /************************INVOCACIONES DE LAS FUNCIONES ************************/

    //Imprimimos la lista de productos de una URL
    listProducts(PRODUCTS_URL);

    //Ordenmos de mayor a menor por precio
    let descendente = document.getElementById('sortDesc');
    descendente.addEventListener('click', () => {
        precioDESC(PRODUCTS_URL)
    });

    //Ordenmos de menor a mayor por precio
    let ascendente = document.getElementById('sortAsc');
    ascendente.addEventListener('click', () => {
        precioASC(PRODUCTS_URL)
    });

    //Ordenamos por relevancia
    let relevancia = document.getElementById('sortByCount');
    relevancia.addEventListener('click', () => {
        relevanciaDESC(PRODUCTS_URL)
    });

    //Ordenamos usando filtro por rango de precio
    let cantMin = document.getElementById('rangeFilterCountMin');
    let cantMax = document.getElementById('rangeFilterCountMax');
    let filtro = document.getElementById('rangeFilterCount');

    filtro.addEventListener('click', () => {
        rangoFiltro(PRODUCTS_URL)
    })

    //Limpiamos el filtro de busqueda
    let limpiar = document.getElementById('clearRangeFilter');

    limpiar.addEventListener('click', () => {
        limpiarFiltro(PRODUCTS_URL);
    })

    //Buscamos producto
    let busqueda = document.getElementById('busqueda');
    let arrPalabra = [];
    let buscar = "";
    let arrArtBusquda = [];
    let segundArreglo = [];
    buscarProduct(PRODUCTS_URL);
})