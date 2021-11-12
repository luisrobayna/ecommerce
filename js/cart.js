//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var total = 0
    var arreglo = [200, 500000]

    async function getCart(url) {
        tableBody.innerHTML = ""
        let informacion = await getJSONData(url);
        informacion = informacion.data.articles;
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
        `
        sumarCantidad(informacion)
        restarCantidad(informacion)
        cantidadInput(informacion)
        removeProduct(informacion)
        methodSend()

    }



    function sumarCantidad(info) {
        let totalAux = 0
        for (let i = 0; i < mas.length; i++) {
            mas[i].addEventListener('click', () => {
                cantidad[i].value++;
                if (arreglo.length > 1) {
                    if (info[i].currency == 'USD') {
                        total = (info[i].unitCost * 40) * cantidad[i].value
                        subtotalColumna[i].innerHTML = total + "$";
                        arreglo[i] = total
                    } else {
                        total = info[i].unitCost * cantidad[i].value
                        subtotalColumna[i].innerHTML = total + "$"
                        arreglo[i] = total
                    }
                } else {
                    if (info[i].currency == 'USD') {
                        total = (info[i].unitCost * 40) * cantidad[i].value
                        subtotalColumna[i].innerHTML = total + "$";
                        arreglo[0] = total
                    } else {
                        total = info[i].unitCost * cantidad[i].value
                        subtotalColumna[i].innerHTML = total + "$"
                        arreglo[0] = total
                    }

                }
                if (arreglo.length == 1) {
                    for (let h = 0; h < arreglo.length; h++) {
                        totalAux = arreglo[h]
                    }

                } else if (arreglo.length > 1) {
                    for (let j = 0; j < arreglo.length; j++) {
                        totalAux += arreglo[j]
                    }
                }
                total = totalAux;
                totalAux = 0
                let subtotalCarrito = document.getElementById('subtotal')
                subtotalCarrito.innerHTML = "Subtotal: " + total + "$"
            })
        }

    }

    function restarCantidad(info) {
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
                subtotalCarrito.innerHTML = "Subtotal: " + total + "$"
            })
        }
    }

    function cantidadInput(info) {
        let arrTotal = [0, 0]

        for (let i = 0; i < cantidad.length; i++) {
            cantidad[i].addEventListener('keydown', (event) => {
                
                let arreglo = [cantidad[i].value]
                
                if (event.key == "Backspace") {
                    arreglo.pop()
                } else {
                    arreglo.push(event.key)
                }
                console.log(arreglo,"EN EL ARREGLO")
                let inputValue = parseInt(arreglo.join(""))
                console.log(inputValue,"PASADO A STRING")
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
                subtotalCarrito.innerHTML = "Subtotal: " + total + "$";
            })
        }
    }

    function removeProduct(info) {
        let productRow = document.getElementsByClassName('productRow')
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
                    if (!indices.includes(j)) {
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
                arregloProduct.splice(index, 1);
                arreglo = arregloProduct
                cantidad[i].value = 0;
                if (arregloProduct.length == 0) {
                    valor = 0;
                } else {
                    for (let product of arregloProduct) {
                        valor += product;
                    }
                }

                let subtotalCarrito = document.getElementById('subtotal')
                subtotalCarrito.innerHTML = "Subtotal: " + valor + "$";
                arregloProduct = [];

                total = valor
            })
        }
    }

    function methodSend() {

        let porcentaje = 0
        for (let i = 0; i < typeSend.length; i++) {
            typeSend[i].addEventListener('click', () => {
                if(address.value == "" || country.value == ""){
                    alertSendPurchase.style.display = "block"
                }else{
                    alertSendPurchase.style.display = "none"
                    if (typeSend[i].value == "15") {
                        porcentaje = (total * 15 / 100)
                    } else if (typeSend[i].value == "7") {
                        porcentaje = (total * 7 / 100)
                    } else {
                        porcentaje = (total * 5 / 100)
                    }
    
                    let anterior = total
                    total = parseFloat(total + porcentaje)
                    totalEnvio.innerHTML = `
                    <p>Subtotal: ${anterior}$</p>
                    <p>+</p>
                    <p>Envio: ${porcentaje}$</p>
                    <p><span>Total: ${total}$</span></p>
    
                    `
                    total = anterior
                    confirmPurchase[0] = true
                }                
            })
        }
    }


    function creditCard(){
        cancelCard.addEventListener('click',()=>{
            name.value = ""
            credit_number.value = ""
            expireM.value = ""
            expireY.value = ""
            cvc.value = ""
            modal_alert.innerHTML = ""
            modal_alert.style.display = "none"
        })

        confirmCard.addEventListener('click',()=>{
            if(name.value == "" || credit_number.value == "" || expireM.value == ""
                || expireY.value == "" || cvc.value == ""){
                    modal_alert.innerHTML= `
                    <p class="alertMessagge">Por favor complete todos los datos</p>
                    `
                    modal_alert.style.display = "block"
            }else{
                confirmPurchase[1] = true
                console.log(confirmPurchase)
                confirmCard.setAttribute('data-dismiss','modal')
            }
        })
    }

    function bankTransfer(){
        cancelBank.addEventListener('click',()=>{
            number_account.value = ""
            owner_name.value = ""
            alert_bank.style.display = "none"
        })

        confirmBank.addEventListener('click',()=>{
            if( number_account.value == "" || owner_name.value == ""){
                alert_bank.innerHTML = `
                <p class="alertMessagge">Por favor complete todos los datos</p>
                `
                alert_bank.style.display = "block"
            }else{
                confirmPurchase[1] = true;
                confirmBank.setAttribute('data-dismiss','modal')
            }
        })
    }

    function completeTransaction(){
        if(confirmPurchase[0] && confirmPurchase[1]){
            modal_body.innerHTML= `
            <p class="correct">Compra realizada exitosamente!! <i class="fas fa-check-circle"></i></p>
            `
        }else{
            modal_body.innerHTML= `
            <p class="error">Faltan completar datos para realizar la compra <i class="fas fa-times-circle"></i></p>
            `
        }
    }


    var confirmPurchase = [false,false]
    let CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json"
    let CART2_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
    let tableBody = document.getElementById('tableBody');
    getCart(CART2_INFO_URL)
    let cantidad = document.getElementsByClassName('cantidad')
    let mas = document.getElementsByClassName('fa-plus');
    let menos = document.getElementsByClassName('fa-minus');
    let subtotalColumna = document.getElementsByClassName('subtotalColumna');
    let cross = document.getElementsByClassName('cross');
    let typeSend = document.getElementsByClassName('methodSend')
    let totalEnvio = document.getElementById('totalEnvio');
    let address = document.getElementById('address')
    let country = document.getElementById('country')
    let alertSendPurchase = document.getElementById('alertSendPurchase')

    let modal_alert = document.getElementById('modal_alert')
    let cancelCard = document.getElementById('cancelCard')
    let cancelBank = document.getElementById('cancelBank')
    let confirmCard = document.getElementById('confirmCard')
    let name = document.getElementById('name')
    let credit_number = document.getElementById('credit_number')
    let expireM = document.getElementById('expireM')
    let expireY = document.getElementById('expireY')
    let cvc = document.getElementById('cvc')
    let confirmBank = document.getElementById('confirmBank')
    let number_account = document.getElementById('number_account')
    let owner_name = document.getElementById('owner_name')
    let alert_bank = document.getElementById('modal_alert_bank')
    let completePurchase =  document.getElementById('completePurchase')
    let modal_body = document.getElementById('modal-body')
    creditCard()
    bankTransfer()
    completePurchase.addEventListener('click',completeTransaction)
    
});