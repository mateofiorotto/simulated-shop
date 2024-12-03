'use strict';
// MATEO FIOROTTO | MATIAS NETO

//------------------------ CREAR ELEMENTOS/ETIQUETA CON TRUQUITO
function crearElemento(nombre = '', atributos = {}, contenido = '') {
  const elemento = document.createElement(nombre);
  for (const atributo in atributos) {
    elemento.setAttribute(atributo, atributos[atributo]);
  }
  if (contenido) {
    elemento.textContent = contenido;
  }
  return elemento;
}

//crear productos (objeto)
let productos = [
  { id: 1, nombre: 'RTX 3050', img: "rtx-3050.png", descripcion: 'Es una tarjeta gráfica de gama media, ideal para gamers y creadores de contenido, que ofrece un rendimiento sólido a buen precio. Tiene 8GB de VRAM, adecuada para juegos modernos y edición de video. Incluye trazado de rayos en tiempo real y capacidades avanzadas de inteligencia artificial para mejorar la calidad de imagen y el rendimiento.', precio: 375000, categoria: 'Tarjeta Gráfica' },
  { id: 2, nombre: 'RTX 3090', img: "rtx-3090.png", descripcion: 'Es una tarjeta gráfica de gama alta diseñada para entusiastas de la tecnología y profesionales que buscan el máximo rendimiento. Con 16GB de VRAM, maneja tareas exigentes como juegos en 4K, realidad virtual avanzada y procesamiento de datos en IA. Ofrece trazado de rayos en tiempo real y eficiencia energética mejorada.', precio: 1300000, categoria: 'Tarjeta Gráfica' },
  { id: 3, nombre: 'iPhone 13', img: "iphone-13.png", descripcion: 'El iPhone 13 de Apple es un smartphone de alta gama con 128GB de almacenamiento interno, ideal para usuarios que buscan potencia y elegancia. Tiene una pantalla Super Retina XDR, un sistema de cámaras duales mejorado para fotografía nocturna y video, y el chip A15 Bionic para un rendimiento excepcional.', precio: 1000000, categoria: 'Smartphone' },
  { id: 4, nombre: 'Samsung Galaxy S23', img: "s23.png", descripcion: 'El Samsung Galaxy S23 es un smartphone premium con 128GB de almacenamiento y características avanzadas. Su pantalla Dynamic AMOLED 2X ofrece una experiencia visual vibrante. Tiene un sistema de cámaras avanzado para fotos y videos de alta calidad en poca luz, un procesador de última generación para un rendimiento fluido y soporte para 5G.', precio: 1100000, categoria: 'Smartphone' },
  { id: 5, nombre: 'Audio-Technica ATH-M20x', img: "m-20x.png", descripcion: 'Auriculares de Estudio semi-profesionales, diseñados para proporcionar una calidad de sonido superior a un precio asequible. Estos auriculares cuentan con drivers de 40 mm y ofrecen una excelente claridad y respuesta de graves. Su diseño de orejera asegura un buen aislamiento del sonido en entornos ruidosos, ideal para monitoreo y mezcla.', precio: 120000, categoria: 'Auriculares de Estudio' },
  { id: 6, nombre: 'Sennheiser HD 280 PRO', img: "280-pro.png", descripcion: 'Auriculares de estudio profesionales conocidos por su rendimiento excepcional y durabilidad. Con drivers de alta calidad, ofrecen un sonido preciso y natural, ideal para monitoreo crítico y grabaciones profesionales. Su diseño ergonómico y acolchado garantiza comodidad en largas sesiones, y su construcción robusta asegura una larga vida útil.', precio: 225000, categoria: 'Auriculares de Estudio' },
  { id: 7, nombre: 'GTX 1650', img: "gtx-1650.png", descripcion: 'Tarjeta gráfica de la generación anterior, excelente rendimiento para juegos de gama media-alta.', precio: 250000, categoria: 'Tarjeta Gráfica' },
  { id:8, nombre: 'iPhone 12', img: "iphone-12.png", descripcion: 'Smartphone de la generación anterior con potente rendimiento y calidad de cámara.', precio: 800000, categoria: 'Smartphone' },
  { id: 9, nombre: 'Beyerdynamic DT 770 PRO', img: "dt-770.png", descripcion: 'Auriculares de estudio de la generación anterior, conocidos por su comodidad y calidad de sonido.', precio: 180000, categoria: 'Auriculares de Estudio' }
];

//otras variables
let carrito = [];
let cantidadProductos = 0;
let cantidadPago = 0;
let contadorIntervalo;

//------------------------ CREAR PRODUCTOS

function crearProductos(producto) {
  const nombre = crearElemento('h3', {}, producto.nombre);
  const imgProd = crearElemento('img', { alt: `Imagen de producto: ${producto.nombre}`, src: `imgs/${producto.img}` });
  const categoria = crearElemento('p', { class: "tag" }, producto.categoria);
  const precio = crearElemento('p', { class: "precio" }, `ARS $${producto.precio}`);

  const botonAgregarCarrito = crearElemento('button', { class: 'boton-agregar' }, 'Agregar al carrito');
  botonAgregarCarrito.addEventListener('click', () => agregarAlCarrito(producto.id));

  const botonVerDetalles = crearElemento('button', { class: 'boton-detalles' }, 'Ver Detalles');
  botonVerDetalles.addEventListener('click', () => mostrarDetalles(producto));

  return [nombre, imgProd, categoria, precio, botonAgregarCarrito, botonVerDetalles];
}

//------------------------ MOSTRAR PRODUCTOS

function mostrarProductos() {
  const listaProductos = document.getElementById('productos');
  listaProductos.textContent = "";

  // con esto filtramos los productos que no queremos mostrar en el catalogo, pero si en la oferta (aleatorio)
  // es uno por categoria
  const productosMostrables = productos.filter(producto => {
    return ![7, 8, 9].includes(producto.id); //mostrar productos que su id no sea 7, 8 o 9 (los que aparecen en la oferta)
  });

  productosMostrables.forEach(producto => {
    const divDeProductos = crearElemento('div');
    const caracteristicas = crearProductos(producto);

    divDeProductos.append(...caracteristicas);

    listaProductos.appendChild(divDeProductos);
  });
}

mostrarProductos(); //--> generar los productos al cargar la pagina

//------------------------ AGREGAR AL CARRITO
function agregarAlCarrito(prodId) {
  const producto = productos.find(p => p.id === prodId); //buscar el producto en el array de productos mediante la ID

  //si el producto se encuentra en el array de productos, buscamos si esta en el carrito y se incrementa la cantidad
  //sino, lo pusheamos para que la cantidad sea 1 (esto es por si el usuario agrega 1 o mas y que no se repita en el carrito)
  if (producto) {
    const itemCarrito = carrito.find(item => item.producto.id === prodId);
    if (itemCarrito) {
      itemCarrito.cantidad += 1;
    } else {
      carrito.push({ producto, cantidad: 1 });
    }

    //--> sumar cantidad de prods totales y precio
    cantidadProductos += 1; 
    cantidadPago += producto.precio;
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }
}

//------------------------ CREAR MODAL
function crearModal(id, clase) {
  //Si hay una modal existente eliminarla. Usado nada mas para que no haya superposicion y no tener que cerrar 2 o mas modales
  const modalExistente = document.querySelector('.modal');
  if (modalExistente) {
    modalExistente.remove();
  }

  const divModal = crearElemento('div', { id, class: clase });
  const botonCerrar = crearElemento('a', { href: '#', class: 'cerrar' }, 'X');
  const divContenido = crearElemento('div');

//tocar boton cerrar
  botonCerrar.addEventListener('click', (event) => {
    event.preventDefault(); // para que no se scrollee, porque como el boton de cerrar es un a href=# te manda al inicio
    divModal.remove();
    document.body.classList.remove('no-scroll'); //sacar clase para bloquear scroll
  });

  divModal.appendChild(botonCerrar);
  divModal.appendChild(divContenido);

  document.body.classList.add('no-scroll'); //añadir la clase para desactivar el scroll
  return divModal;
}

//------------------------ MODAL PRODUCTOS (DETALLES)
function mostrarDetalles(producto) {
  const divModal = crearModal('modalProducto', 'modal');
  const divContenido = divModal.querySelector('div');
  
  //Creamos el carrousel para 3 o mas imagenes
  //esto solo carga en la modal del producto
  crearCarrousel(producto, divContenido);
  const nombreProducto = crearElemento('h2', {}, producto.nombre);
  const categoriaProducto = crearElemento('p', { class: "tag tag-mg" }, producto.categoria);
  const descripcionProducto = crearElemento('p', { class: "desc" }, producto.descripcion);
  const precioProducto = crearElemento('p', { class: "precio" }, `ARS $${producto.precio}`);
  const botonAgregarCarrito = crearElemento('button', { class: 'boton-agregar' }, 'Agregar al carrito');
  botonAgregarCarrito.addEventListener('click', () => agregarAlCarrito(producto.id));

  const botonIrAlCarrito = crearElemento('button', { class: 'boton-ir-carrito' }, 'Ir al carrito');
  botonIrAlCarrito.addEventListener('click', () => {
    mostrarDetalleCarrito();
    divModal.remove();
  });

  divContenido.append(nombreProducto, categoriaProducto, descripcionProducto, precioProducto, botonAgregarCarrito, botonIrAlCarrito);
  document.querySelector("main").appendChild(divModal);
}

//------------------------ MODAL CARRITO
function mostrarDetalleCarrito() {

  const modalCarrito = crearModal('modalCarrito', 'modal');
  const modalContent = modalCarrito.querySelector('div');

  const titulo = crearElemento('h2', {}, 'Resumen de compra');
  const listaProductos = crearElemento('ul');

  //calcular el total del carrito
  let totalCarrito = 0;

  //aca mostramos cada producto agregado al carrito
  carrito.forEach(item => {
    const producto = item.producto;
    const precioUnitario = producto.precio;
    const itemProducto = crearElemento('li');
    const imagenProducto = crearElemento('img', { alt: `Imagen de producto: ${producto.nombre}`, src: `imgs/${producto.img}` });
    const nombreProducto = crearElemento('span', { class: "negrita celeste" }, producto.nombre);
    const cantidadProducto = crearElemento('span', { class: "marg-carrito blanco-bold" }, `( x ${item.cantidad} )`);
    const subtotalProducto = crearElemento('span', { class: "precio marg-carrito" }, ` ARS $${precioUnitario * item.cantidad}`);
    const botonEliminar = crearElemento('button', { class: "boton-eliminar" }, 'Eliminar');
    botonEliminar.addEventListener('click', () => eliminarDelCarrito(producto.id));

    itemProducto.append(imagenProducto, nombreProducto, subtotalProducto, cantidadProducto, botonEliminar);
    listaProductos.appendChild(itemProducto);

    totalCarrito += precioUnitario * item.cantidad; //multiplicar el precio del producto por la cantidad
  });

  const total = crearElemento('p', { class: "precio" }, `Total: ARS $${totalCarrito}`);

  modalContent.append(titulo, listaProductos, total);

  //si el carrito no tiene items, no deberían aparecer los botones de vaciar y checkout
  if (carrito.length > 0) {
    const botonVaciarCarrito = crearElemento('button', {class: 'vaciar-carrito'}, 'Vaciar Carrito');
    const botonCheckout = crearElemento('button', {}, 'Ir al Checkout');

    botonVaciarCarrito.addEventListener('click', vaciarCarrito);
    botonCheckout.addEventListener('click', mostrarFormularioPago);

    modalContent.append(botonVaciarCarrito, botonCheckout);
  }

  document.querySelector("main").appendChild(modalCarrito);
}

//------------------------ ELIMINAR PRODUCTO DESDE EL CARRITO
//Esto es para el boton eliminar en el carrito
function eliminarDelCarrito(prodId) {
  //encontramos el indice del producto y verificamos si esta en el carrito
  const index = carrito.findIndex(item => item.producto.id === prodId);
  //despues se obtiene el item del carrito en algun indice encontrado, si la cantidad > 1 entonces reduce en 1 
  if (index !== -1) {
    const itemCarrito = carrito[index];
    if (itemCarrito.cantidad > 1) {
      itemCarrito.cantidad -= 1;
    } else {
      carrito.splice(index, 1); //si la cantidad es 1 lo elimina.
    }

    cantidadProductos -= 1;
    cantidadPago -= itemCarrito.producto.precio;

    actualizarCarrito();
    mostrarDetalleCarrito();
    guardarCarritoEnLocalStorage(); //--> se va actualizando a medida que borras del carrito
  }
}

//------------------------ VACIAR CARRITO
function vaciarCarrito() {
  carrito = [];
  cantidadProductos = 0;
  cantidadPago = 0;
  actualizarCarrito()
  mostrarDetalleCarrito();
  eliminarCarritoDeLocalStorage();
}

//------------------------ ACTUALIZAR CARRITO
function actualizarCarrito() {
  const itemsAgregados = document.getElementById('items-agregados');

  itemsAgregados.textContent = cantidadProductos;
}

//------------------------ FILTROS + FUNCION VER CARRITO EN EL HTML
const btnVerDetalleCarrito = document.getElementById('btn-ver-detalle-carrito');
btnVerDetalleCarrito.addEventListener('click', mostrarDetalleCarrito);

const btnReiniciarFiltros = document.getElementById('btn-reiniciar-filtros');
btnReiniciarFiltros.addEventListener('click', () => {
  mostrarProductos(); //reiniciar filtros
});

//------------------------ FILTRAR PROD (es para que no aparezcan los productos de la oferta en el catalogo directamente)
function filtrarProductos(categoria) {
  const listaProductos = document.getElementById('productos');
  listaProductos.textContent = ""; //no duplicar al filtrar

  //filtra la lista de productos según la categoria y excluye los productos de id 7,8,9
  const productosMostrables = productos.filter(producto => {
    return producto.categoria === categoria && ![7, 8, 9].includes(producto.id); //excluye los IDs de los productos en oferta especial
  });

  productosMostrables.forEach(producto => {
    const divDeProductos = crearElemento('div');
    const caracteristicas = crearProductos(producto);

    divDeProductos.append(...caracteristicas);
    listaProductos.appendChild(divDeProductos);
  });

  mostrarOfertaEspecial(categoria);
}

const filtros = document.querySelectorAll('#filtros li a');

filtros.forEach(filtro => {
  filtro.addEventListener('click', (event) => {
    event.preventDefault();
    const categoria = filtro.getAttribute('data-categoria');
    filtrarProductos(categoria);
  });
});

//------------------------ MOSTRAR OFERTA
// Función para mostrar la oferta especial y gestionar el contador
function mostrarOfertaEspecial(categoriaSeleccionada) {
  //ids de productos --> para que no salgan otros productos del catalogo
  const productosPorCategoria = {
    'Tarjeta Gráfica': 7,
    'Smartphone': 8,
    'Auriculares de Estudio': 9
  };

  const productoId = productosPorCategoria[categoriaSeleccionada];
  const productoSeleccionado = productos.find(producto => producto.id === productoId);

  //Creacion de la modal de la oferta
  const ofertaModal = crearModal('ofertaModal', 'modal');
  const contenidoOferta = ofertaModal.querySelector('div');

  const tituloOferta = crearElemento('h2', {}, `¡Aprovecha este ${productoSeleccionado.nombre}!`);
  const descripcionOferta = crearElemento('p', {}, productoSeleccionado.descripcion);

  contenidoOferta.appendChild(tituloOferta);
  contenidoOferta.appendChild(descripcionOferta);

  const divProducto = crearElemento('div');

  const nombreProducto = crearElemento('h3', { class: "oferta-titulo" }, productoSeleccionado.nombre);

  //imagen aleatoria (banner)
  const imagenes = [
    `imgs/${productoSeleccionado.img}`,
    `imgs/${productoSeleccionado.img.replace('.png', '_1.png')}`,
    `imgs/${productoSeleccionado.img.replace('.png', '_2.png')}`
  ];
  const imgProducto = crearElemento('img', { 
    alt: `Imagen de producto: ${productoSeleccionado.nombre}`, 
    src: imagenes[Math.floor(Math.random() * imagenes.length)] 
  });

  //al hacer clic en la imagen, añadir al carrito, cerrar la modal y abrir la modal del carrito
  //esto para indicar que se agrego al carrito
  imgProducto.addEventListener('click', () => {
    agregarAlCarrito(productoSeleccionado.id);
    ofertaModal.remove();
    mostrarDetalleCarrito();
  });

  const categoriaProducto = crearElemento('p', { class: "tag tag-mg" }, productoSeleccionado.categoria);
  const precioProducto = crearElemento('p', { class: "precio" }, `ARS $${productoSeleccionado.precio}`);

  //creación del contador + event listener y botones
  const contador = crearElemento('p', { class: 'contador' }, '10 segundos restantes para la oferta');
  divProducto.append(nombreProducto, imgProducto, categoriaProducto, precioProducto, contador);

  const botonVerDetalles = crearElemento('button', { class: 'boton-ver-detalles' }, 'Ver Detalles');
  botonVerDetalles.addEventListener('click', () => {
    mostrarDetalles(productoSeleccionado);
    if (ofertaModal) ofertaModal.remove();
  
  });

  //btn declinar
  const botonDeclinarOferta = crearElemento('button', { class: "boton-rojo" }, 'Declinar oferta');
  botonDeclinarOferta.addEventListener('click', () => {
    if (ofertaModal) ofertaModal.remove();
    document.body.classList.remove('no-scroll');
  });

  divProducto.append(botonVerDetalles, botonDeclinarOferta);
  contenidoOferta.appendChild(divProducto);

  document.querySelector("main").appendChild(ofertaModal);

  //contador
  let segundosRestantes = 10;
  const intervalo = setInterval(() => {
    segundosRestantes--;
    contador.textContent = `${segundosRestantes} segundos restantes para la oferta`;
    if (segundosRestantes <= 0) {
      clearInterval(intervalo);
    }
  }, 1000);

  document.body.classList.add('no-scroll');
}


//------------------------ CARROUSEL
function crearCarrousel(producto, divContenido) {
  const imagenes = [
    `imgs/${producto.img}`,
    `imgs/${producto.img.replace('.png', '_1.png')}`,
    `imgs/${producto.img.replace('.png', '_2.png')}`
  ];

  const imgPrincipal = crearElemento('img', { src: imagenes[0], alt: `Imagen de ${producto.nombre}`, class: 'carrousel-img' });
  const btnAnterior = crearElemento('button', { class: 'btn-anterior' }, '<');
  const btnSiguiente = crearElemento('button', { class: 'btn-siguiente' }, '>');

  let indiceActual = 0;

  //restamos y sumamos al indice
  btnAnterior.addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    imgPrincipal.src = imagenes[indiceActual];
  });

  btnSiguiente.addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % imagenes.length;
    imgPrincipal.src = imagenes[indiceActual];
  });

//------------------------ KEY EVENT (FLECHITAS)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { //tecla izq
      indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
      imgPrincipal.src = imagenes[indiceActual];
    } else if (event.key === 'ArrowRight') { //tecla derecha
      indiceActual = (indiceActual + 1) % imagenes.length;
      imgPrincipal.src = imagenes[indiceActual];
    }
  });

  const carrouselContainer = crearElemento('div', { class: 'carrousel-container' });
  carrouselContainer.append(btnAnterior, imgPrincipal, btnSiguiente);

  divContenido.appendChild(carrouselContainer);
}

//------------------------ KEY EVENT (ESCAPE)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const modalAbierto = document.querySelector('.modal');
    if (modalAbierto) {
      modalAbierto.remove();
      document.body.classList.remove('no-scroll');
    }
  } 
});

//------------------------ CHECKOUT - FORM + VALIDACIONES
function mostrarFormularioPago() {

  //creacion elementos form
  const modalFormularioPago = crearModal('modalFormularioPago', 'modal'); // Función crearModal() debe definirse
  const modalContent = modalFormularioPago.querySelector('div');

  const titulo = crearElemento('h2', {}, 'Formulario de Pago'); // Función crearElemento() debe definirse
  
  const formulario = crearElemento('form', { id: 'formularioPago' });

  const contenedorColumnas = crearElemento('div', { class: 'formulario-columnas' });

  const campos = [
    { label: 'Nombre Completo', type: 'text', id: 'nombre', placeholder: 'Juanito Pepito' },
    { label: 'Teléfono', type: 'number', id: 'telefono', placeholder: '498123' },
    { label: 'Correo Electrónico', type: 'email', id: 'email', placeholder: 'ejemplo@hotmail.com'},
    { label: 'Ciudad', type: 'text', id: 'ciudad', placeholder: 'Lujan, Buenos Aires'},
    { label: 'Fecha de Entrega', type: 'date', id: 'fechaEntrega'},
    { label: 'Metodo de pago', type: 'select', id: 'metodoPago', options: ['Tarjeta de Crédito', 'Tarjeta de Debito', 'Tarjeta de Crédito Prepaga']},
    { label: 'Cuotas', type: 'select', id: 'cuotas', options: ['Pago Unico', '3', '6', '12']},
    { label: 'Tarjeta', type: 'number', id: 'tarjeta', placeholder: '1234 1234 1234'},
    { label: 'CV', type: 'number', id: 'cv', placeholder: '123'},
    { label: 'Vencimiento', type: 'date', id: 'vencimiento' },
  ];

   //CREAR los elementos de entrada del formulario
   campos.forEach(campo => {
    const divCampo = crearElemento('div', { class: 'formulario-campo' });

    const label = crearElemento('label', { for: campo.id }, campo.label);

    let input;
    if (campo.type === 'select') {
      input = crearElemento('select', { id: campo.id });

      //agregar opciones al select
      campo.options.forEach(optionText => {
        const option = crearElemento('option', { value: optionText }, optionText);
        input.appendChild(option);
      });
    } else {
      input = crearElemento('input', { type: campo.type, id: campo.id, placeholder: campo.placeholder });
    }

    divCampo.append(label, input);
    contenedorColumnas.appendChild(divCampo);
  });

  const mensajeExito = crearElemento('p', { id: 'mensajeExito'});

  const divBotones = crearElemento('div', { class: 'formulario-botones' });

  const botonEnviar = crearElemento('button', { type: 'submit' }, 'Pagar');
  const botonCancelar = crearElemento('button', { type: 'button' , class: 'boton-cancelar'}, 'Cancelar');

  botonCancelar.addEventListener('click', () => {
    modalFormularioPago.remove();
    document.body.classList.remove('no-scroll');
  });
  divBotones.append(botonCancelar, botonEnviar);

  formulario.append(contenedorColumnas, mensajeExito, divBotones);
  modalContent.append(titulo, formulario);
  document.querySelector("main").appendChild(modalFormularioPago);

  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    validarFormulario(); //llama a la función validarFormulario para validar los campos
  });
}

function validarFormulario() {
  const formulario = document.getElementById('formularioPago');
  const inputs = formulario.querySelectorAll('input');
  let valido = true;

  //si el usuario completo algo que estaba erroneo, desmarcarlo
  inputs.forEach(input => {
    input.classList.remove('input-error');
  });

  //validar campos --> comprueba si esta vacio, y si lo esta agregarle la clase de error y marcarlo con rojo
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      input.classList.add('input-error');
      valido = false;
    }
  });

  if (valido) { 
    //si es correcto, que vacie el carrito, se elimine la modal del carrito para que no aparezca y se le de el mensaje de compra completada
    //dejando de mostrar los input
    vaciarCarrito();

    const modalContent = document.querySelector('.modal div');
    while (modalContent.firstChild) {
      modalContent.removeChild(modalContent.firstChild);
    }

    const mensajeExito = crearElemento('h2', {class: 'm-compra'}, '¡Compra realizada con éxito!');
    const mensajeCompraCuerpo = crearElemento('p', {class: 'm-compra'}, 'Te estaremos enviando el producto a la dirección especificada y un código de seguimiento a tu correo electrónico.');
    const mensajeGracias = crearElemento('p', {class: 'negrita m-compra'}, '¡Gracias!');
    modalContent.append(mensajeExito, mensajeCompraCuerpo, mensajeGracias);

  } else {
    //Si es incorrecto se muestra en rojo un mensaje
    document.getElementById('mensajeExito').textContent = 'Introduce correctamente los datos solicitados (vacios).';
    document.getElementById('mensajeExito').classList.add("rojo");
  }
  
}

//------------------------ LOCALSTORAGE
//Lo pasamos a string 
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('cantidadProductos', cantidadProductos);
  localStorage.setItem('cantidadPago', cantidadPago);
}

//guardar carrito
function recuperarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  const cantidadProductosGuardada = localStorage.getItem('cantidadProductos');
  const cantidadPagoGuardada = localStorage.getItem('cantidadPago');

  //parsear carrito
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    cantidadProductos = parseInt(cantidadProductosGuardada) || 0;
    cantidadPago = parseFloat(cantidadPagoGuardada) || 0;
    actualizarCarrito();
  }
}

//al cargar llama a la funcion:
recuperarCarritoDesdeLocalStorage();

//para la funcion de vaciar carrito
function eliminarCarritoDeLocalStorage() {
  localStorage.removeItem('carrito');
  localStorage.removeItem('cantidadProductos');
  localStorage.removeItem('cantidadPago');
}