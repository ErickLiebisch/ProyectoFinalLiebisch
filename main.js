let Articulos =  JSON.parse(localStorage.getItem("Articulos")) || [];

class articulo {
  constructor(Articulo, Categoria, Cantidad) {
    this.Articulo = Articulo;
    this.Categoria = Categoria;
    this.Cantidad = Cantidad;
  }
}
if(Articulos !=null){
Articulos.forEach(element => {
  let container = document.createElement("div");
      container.innerHTML = `<h3>Articulo: ${element.Articulo}</h3>
      <p> Categoria: ${element.Categoria}</p>
      <p>Cantidad ${element.Cantidad}</p>`;
      
      container.className = "card card-body my-3"
      container.style.width = "20rem"
      document.body.append(container);
      const containerCreado = container;     
});
}

let miFormulario = document.getElementById("formulario");
miFormulario.onsubmit = async (e) => {
  e.preventDefault();

  const Articulo = e.target.children[1].value;
  const Categoria = e.target.children[3].value;
  const Cantidad = e.target.children[7].value;
  const nuevoArticulo = new articulo(Articulo, Categoria, Cantidad);

  Articulos.push(nuevoArticulo);

  localStorage.setItem("Articulos", JSON.stringify(Articulos));
  console.log(JSON.parse(localStorage.getItem("Articulos")));

  try {
    let spinner = document.getElementById("spinner")
    spinner.style.display = "block"
    
    const confirmed = await mostrarConfirmacion();
    
    if (confirmed) {
      
      await creacionproducto(nuevoArticulo);

      let container = document.createElement("div");
      container.innerHTML = `<h3>Articulo: ${e.target.children[1].value}</h3>
      <p> Categoria: ${e.target.children[3].value}</p>
      <p>Cantidad ${e.target.children[5].value}</p>`;
      
      container.className = "card card-body my-3"
      container.style.width = "20rem"
      document.body.append(container);
      const containerCreado = container;
      localStorage.setItem("containerCreado", JSON.stringify(containerCreado));
      swal({
        title: "Producto añadido con exito",
      });
    }
    spinner.style.display = "none"
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
};


function mostrarConfirmacion() {

return new Promise((resolve) => {
  swal({
    title: "¿Desea confirmar la acción?",
    icon: "warning",
    buttons: ["Cancelar", "Confirmar"],
  }).then((confirmed) => {
    resolve(confirmed);
  });
});
}


function creacionproducto(articulo) {
return new Promise((resolve, reject) => {
  
  setTimeout(() => {
    console.log("Producto creado:", articulo);
    resolve(); 
  }, 2000); 
});

}