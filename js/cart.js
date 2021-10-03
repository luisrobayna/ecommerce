//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    async function getCart(url) {
        tableBody.innerHTML = ""
        let informacion = await getJSONData(url);
        informacion = informacion.data.articles;
        let total = 0;
        informacion.forEach((element, index) => {
            let subtotal = element.unitCost * element.count;
            let pesos = element.unitCost
            if (element.currency == "USD") {
                pesos = element.unitCost * 40
                subtotal = pesos * element.count
            }
            total += subtotal;
            tableBody.innerHTML += `
            <div class="productRow">
                <div>
                    <img src="${element.src}" alt="${element.name}">
                    <p>${element.name}</p>
                </div>
                <div>
                    <p>
                        <input type="number" value="${element.count}" class="cantidad">
                        <i class="fas fa-plus"></i>
                        <i class="fas fa-minus"></i>
                    </p>
                    <p>${pesos}$</p>
                    <p class="subtotalColumna">${subtotal}$</p>
                    <i class="fas fa-times cross"></i>
                </div>
            </div>
            `
        })

        tableBody.innerHTML += `
            <p id="subtotal" class="subtotal">Subtotal: ${total}$</p>
            <p id="total" class="total">Total: ${total}$</p><br>
            <a href="sell.html"> <button>Realizar compra</button></a>
        `
        sumarCantidad(informacion)
        restarCantidad(informacion)
        cantidadInput(informacion)
        removeProduct(informacion)
    }



    function sumarCantidad(info) {
        let total = 0;
        let arreglo = [200, 500000]
        for (let i = 0; i < mas.length; i++) {
            mas[i].addEventListener('click', () => {
                cantidad[i].value++;
                if (info[i].currency == 'USD') {
                    total = (info[i].unitCost * 40) * cantidad[i].value
                    subtotalColumna[i].innerHTML = total + "$";
                    arreglo[i] = total
                } else {
                    total = info[i].unitCost * cantidad[i].value
                    subtotalColumna[i].innerHTML = total + "$"
                    arreglo[i] = total
                }
                total = arreglo[0] + arreglo[1]
                let subtotalCarrito = document.getElementById('subtotal')
                let totalCarrito = document.getElementById('total')
                subtotalCarrito.innerHTML = "Subtotal: " + total + "$"
                totalCarrito.innerHTML = "Total: " + total + "$"

            })
        }

    }

    function restarCantidad(info) {
        let total = 0;
        let arreglo = [200, 500000]
        let mover = 0
        for (let i = 0; i < menos.length; i++) {
            menos[i].addEventListener('click', () => {
                if (cantidad[i].value == 1) {
                    cantidad[i].value = 1
                } else {
                    cantidad[i].value--
                }

                if (info[i].currency == 'USD') {
                    total = (info[i].unitCost * 40) * cantidad[i].value
                    subtotalColumna[i].innerHTML = total + "$";
                    arreglo[i] = total;
                    if (i == 1) {
                        arreglo[0] = parseInt(cantidad[0].value * info[0].unitCost)
                    }
                } else {
                    total = info[i].unitCost * cantidad[i].value
                    subtotalColumna[i].innerHTML = total + "$"
                    arreglo[i] = total;
                    if (i == 0) {
                        arreglo[1] = parseInt(cantidad[1].value * info[1].unitCost * 40)
                    }
                }
                total = arreglo[0] + arreglo[1]
                let subtotalCarrito = document.getElementById('subtotal')
                let totalCarrito = document.getElementById('total')
                subtotalCarrito.innerHTML = "Subtotal: " + total + "$"
                totalCarrito.innerHTML = "Total: " + total + "$"
            })
        }
    }

    function cantidadInput(info) {
        let total = 0;
        let arrTotal = [0, 0]

        for (let i = 0; i < cantidad.length; i++) {
            cantidad[i].addEventListener('keydown', (event) => {
                let arreglo = [cantidad[i].value]
                if (event.key == "Backspace") {
                    arreglo.pop()
                } else {
                    arreglo.push(event.key)
                }
                let inputValue = parseInt(arreglo.join(""))
                if (arreglo.length == 0) {
                    cantidad[i].value = ""
                    inputValue = 0
                }
                if (info[i].currency == "USD") {
                    total = inputValue * 40 * info[i].unitCost
                } else {
                    total = inputValue * info[i].unitCost
                }
                subtotalColumna[i].innerHTML = total + "$"

                if (i == 0) {
                    arrTotal[0] = total;
                    arrTotal[1] = cantidad[1].value * 40 * info[1].unitCost
                } else {
                    arrTotal[1] = total;
                    arrTotal[0] = cantidad[0].value * info[0].unitCost
                }
                total = arrTotal[0] + arrTotal[1]
                let subtotalCarrito = document.getElementById('subtotal')
                let totalCarrito = document.getElementById('total')
                subtotalCarrito.innerHTML = "Subtotal: " + total + "$";
                totalCarrito.innerHTML = "Total: " + total + "$";
            })
        }
    }

    function removeProduct(info) {
        let productRow = document.getElementsByClassName('productRow')
        let total = 0;
        let arregloProduct = []
        let valor = 0;
        let indices = [];
        for (let i = 0; i < cross.length; i++) {
            cross[i].addEventListener('click', () => {
                let cuenta = 0
                productRow[i].style.display = "none";
                if (info[i].currency == "USD") {
                    total = info[i].unitCost * cantidad[i].value * 40
                } else {
                    total = info[i].unitCost * cantidad[i].value
                }
                
                for (let j = 0; j < info.length; j++) {
                    if (!indices.includes(j)){
                        if (info[j].currency == "USD") {
                            cuenta = info[j].unitCost * cantidad[j].value * 40;
                            arregloProduct.push(cuenta)
                        } else {
                            cuenta = info[j].unitCost * cantidad[j].value;
                            arregloProduct.push(cuenta)
                        }
                    }  
                }
                let index = arregloProduct.indexOf(total)
                indices.push(index);
                arregloProduct.splice(index,1);
                cantidad[i].value = 0;
                if(arregloProduct.length == 0){
                    valor = 0;
                }else{
                    for(let product of arregloProduct){
                        valor+= product;
                    }
                }
                
                let subtotalCarrito = document.getElementById('subtotal')
                let totalCarrito = document.getElementById('total')
                subtotalCarrito.innerHTML = "Subtotal: " + valor + "$";
                totalCarrito.innerHTML = "Total: " + valor + "$";
                arregloProduct = []
            })
        }
    }



    let CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json"
    let CART2_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"//desafiate
    let tableBody = document.getElementById('tableBody');
    getCart(CART2_INFO_URL)
    let cantidad = document.getElementsByClassName('cantidad')
    let mas = document.getElementsByClassName('fa-plus');
    let menos = document.getElementsByClassName('fa-minus');
    let subtotalColumna = document.getElementsByClassName('subtotalColumna');
    let cross = document.getElementsByClassName('cross');




});