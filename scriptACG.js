window.onload = function cargar() {
    anyadirProductos();
}


function anyadirProductos() {
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = ``;

    products.forEach(producto => {
        const formProducto = document.createElement("div");

        const img = document.createElement("img");
        img.src = producto.imagen;
        img.style.width = "100px";
        formProducto.appendChild(img);

        const nombre = document.createElement("p");
        nombre.textContent = producto.nombre;
        formProducto.appendChild(nombre);

        const precio = document.createElement("p");
        precio.textContent = `Precio: ${producto.precio}`;
        formProducto.appendChild(precio);

        const stock = document.createElement("p");
        
        const cantComprar = document.createElement("input");
        cantComprar.type = "number";
        cantComprar.value = 1;
        cantComprar.max = producto.stock;
        cantComprar.min = 0;
        
        const botComprar = document.createElement("button");
        if (producto.stock > 0) {
            stock.textContent = `Stock: ${producto.stock}`;
            if (producto.stock <= 4) {
                const pocoStock = document.createElement("p");
                pocoStock.textContent = "pocoStock";
                formProducto.appendChild(pocoStock);
            }
        } else {
            stock.textContent = `sin Stock`;
            botComprar.disabled = true;
        }
        botComprar.textContent = "comprar";
        formProducto.appendChild(stock);
        formProducto.appendChild(cantComprar);
        formProducto.appendChild(botComprar);
        //evento de anyiadir al carrito

        botComprar.addEventListener("click", (event) => {
            if (cantComprar.value > producto.stock) {
                alert("se a introducido una cantidad mayor de la permitida")
            } else {
                let comPod = {nombre: producto.nombre, precio: producto.precio, cantidad: cantComprar.value, fecha: new Date};
                carritoCompra.push(comPod);
                producto.stock = producto.stock-cantComprar.value;
                anyadirProductos();
                cargarCarrito();
            }
            
        });

        divProductos.appendChild(formProducto);
    });
}

let carritoCompra = [];
console.log(carritoCompra);


function cargarCarrito(){
    const carritoDiv = document.getElementById("carritoDiv");
    let totalPedido = 0;

    const carritoTabla = document.getElementById("carrito");
    carritoTabla.innerHTML = ``;

    carritoCompra.forEach(productoCompra => {
        const productoTr = document.createElement("tr");
        productoTr.id = `tr${productoCompra.nombre}`;
        const cant = document.createElement("td");
        const buttonMas = document.createElement("button");
        buttonMas.textContent = "+";
        buttonMas.addEventListener("click", (event) => {
            productoCompra.cantidad = parseInt(productoCompra.cantidad) + 1;
            cargarCarrito();
        });
        const cantComprar = document.createElement("p");
        cantComprar.textContent = productoCompra.cantidad;
        const buttonMenos = document.createElement("button");
        buttonMenos.textContent = "-";
        buttonMenos.addEventListener("click", (event) => {
            if (productoCompra.cantidad > 0) {
                productoCompra.cantidad = parseInt(productoCompra.cantidad) - 1;
                cargarCarrito();
            }
            
        });
        cant.appendChild(buttonMas);
        cant.appendChild(cantComprar);
        cant.appendChild(buttonMenos);
        productoTr.appendChild(cant);
    
        const nombre = document.createElement("td");
        nombre.textContent = productoCompra.nombre;
        productoTr.appendChild(nombre);
    
        const precio = document.createElement("td");
        precio.textContent = `${productoCompra.precio}€`;
        productoTr.appendChild(precio);
    
        const total = document.createElement("td");
        const totalProd = productoCompra.precio*productoCompra.cantidad;
        total.textContent = `${totalProd.toFixed(2)}€`;
        totalPedido += totalProd;
        productoTr.appendChild(total);
    
        const eliminarTd = document.createElement("td");
        const elimnar = document.createElement("button");
        elimnar.textContent = "elimnar";
        elimnar.addEventListener("click", (event) => {

        });

        eliminarTd.appendChild(elimnar);
        productoTr.appendChild(eliminarTd);
        carritoTabla.appendChild(productoTr);
    });

    const totalDelPedido = document.createElement("p");
    totalDelPedido.textContent = `Total: ${totalPedido.toFixed(2)}€`;

    carritoDiv.appendChild(totalDelPedido);
}
