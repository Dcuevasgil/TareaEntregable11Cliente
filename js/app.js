let productos = [];
let productName = "";
let productPrice = "";
let id = 1;

async function listarProductos() {
  try {
    const response = await fetch('http://localhost:8080/api/v1/product/lista');
    if (response.ok) {
      productos = await response.json();
      const contenedor = document.querySelector("#productos");
      contenedor.innerHTML = ''; 
                    
      productos.forEach(producto => {
        const div = document.querySelector("#productos");
        div.innerHTML = `
          <p>ID: ${producto.id}</p>
          <h2>Nombre: ${producto.productName}</h2>
          <p>Precio: ${producto.productPrice}</p>
          <button onclick="actualizarProducto(${producto.id})">Actualizar</button>
          <button onclick="crearProducto(${producto.id})">Crear</button>
        `;
        contenedor.appendChild(div);
      });
    } else {
      console.error("Error al listar los productos", response.statusText);
    }
  } catch (error) {
    console.error("Error al enviar la petición al servidor", error);
  }
}


async function insertarProducto(productName, productPrice) {
  const response = await fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: productName, price: productPrice })
  })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

  if (response.ok) {
      await insertarProductosAutomaticamente();
      await listarProductos();
  } else {
      console.error("Error al insertar el producto", response.statusText);
  }
}

async function insertarProductosAutomaticamente() {
  const response = await fetch("api/v1/product/create_product");
  if(response.ok) {
    const productosEjemplo = [
      { id: 1, productName: "Teléfono inteligente de alta gama", productPrice: 999.0 },
      { id: 2, productName: "Samsung Galaxy S21", productPrice: 799.0 },
      { id: 3, productName: "Xiaomi Mi 11", productPrice: 699.0 },
      { id: 4, productName: "Nike Air Max 270", productPrice: 129.0 },
      { id: 5, productName: "Sony PlayStation 5", productPrice: 499.0 },
      { id: 6, productName: "Apple Watch Series 7", productPrice: 399.0 },
      { id: 7, productName: "Dell Inspiron 5", productPrice: 699.0 },
      { id: 8, productName: "Canon EOS Rebel T8i", productPrice: 899.0 },
      { id: 9, productName: "Microsoft Surface Pro 7", productPrice: 899.0 },
      { id: 10, productName: "Nintendo Switch", productPrice: 299.0 }
    ];

    for (const producto of productosEjemplo) {
      await insertarProducto(producto.productName, producto.productPrice);
    }
  }
}


const form = document.createElement('form');
form.action = 'http://localhost:8080';
form.method = 'post';


const inputsDiv = document.createElement('div');
inputsDiv.className = 'inputs';


const idLabel = document.createElement('label');
idLabel.setAttribute('for', 'id');
idLabel.textContent = 'ID:';
const idInput = document.createElement('input');
idInput.type = 'text';
idInput.name = 'id';
idInput.id = 'id';


const nombreLabel = document.createElement('label');
nombreLabel.setAttribute('for', 'nombre');
nombreLabel.textContent = 'Nombre:';
const nombreInput = document.createElement('input');
nombreInput.type = 'text';
nombreInput.name = 'nombre';
nombreInput.id = 'nombre';


const precioLabel = document.createElement('label');
precioLabel.setAttribute('for', 'precio');
precioLabel.textContent = 'Precio:';
const precioInput = document.createElement('input');
precioInput.type = 'number';
precioInput.name = 'precio';
precioInput.id = 'precio';


inputsDiv.appendChild(idLabel);
inputsDiv.appendChild(idInput);
inputsDiv.appendChild(nombreLabel);
inputsDiv.appendChild(nombreInput);
inputsDiv.appendChild(precioLabel);
inputsDiv.appendChild(precioInput);


form.appendChild(inputsDiv);


const buttonsDiv = document.createElement('div');
buttonsDiv.className = 'buttons';


const borrarButton = document.createElement('button');
borrarButton.id = 'borrar';
borrarButton.textContent = 'Crear producto';
borrarButton.type = 'button'; 
borrarButton.onclick = function() {
  borrarProducto(); 
};

const actualizarButton = document.createElement('button');
actualizarButton.id = 'actualizar';
actualizarButton.textContent = 'Actualizar';
actualizarButton.type = 'button'; 
actualizarButton.onclick = function() {
  actualizarProducto(); 
};


buttonsDiv.appendChild(borrarButton);
buttonsDiv.appendChild(actualizarButton);


form.appendChild(buttonsDiv);


document.body.appendChild(form);

async function actualizarProducto() {
  try {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;

    
    if (id === '' || nombre === '' && nombre !== null || precio === '' && precio > 0) {
      console.error('Por favor, complete todos los campos');
      return;
    }

    const producto = {
      id: parseInt(id),
      nombre,
      precio: parseFloat(precio)
    };

    const response = await fetch('http://localhost:8080/edit/{id}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Producto actualizado con éxito:', data);
    } else {
      console.error('Error al actualizar el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
}

async function crearProducto() {
  try {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;

    if (id === '' || nombre === '' || precio === '') {
      console.error('Por favor, complete todos los campos');
      return;
    }

    const producto = {
      id: parseInt(id),
      nombre,
      precio: parseFloat(precio)
    };

    const response = await fetch('http://localhost:8080/api/v1/product/create_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Producto creado con éxito:', data);
      agregarProductoAlDOM(data);
    } else {
      console.error('Error al crear el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
}

function agregarProductoAlDOM(producto) {
  const productosDiv = document.querySelector('#productos');
  const nuevoProductoDiv = document.createElement('div');
  nuevoProductoDiv.className = 'producto';
  nuevoProductoDiv.innerHTML = `
    <p>ID: ${producto.id}</p>
    <h2>Nombre: ${producto.nombre}</h2>
    <p>Precio: $${producto.precio.toFixed(2)}</p>
  `;
  productosDiv.appendChild(nuevoProductoDiv);
}


document.addEventListener("DOMContentLoaded", async () => {
  await insertarProductosAutomaticamente(); 
  await listarProductos();
  await crearProducto();
});


