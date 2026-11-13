# MYV Servicio Técnico

Landing estática en español argentino. Abrí index.html para revisar el diseño. El sitio funciona sin instalación, sin Hark y sin servicios de terceros para cargar imágenes o estilos. WhatsApp abre un borrador: el visitante decide si lo envía.

## Cargar trabajos reales

1. En GitHub, subí las dos imágenes a la carpeta assets/trabajos. Usá nombres simples sin espacios. Elegí fotos del mismo artefacto, encuadradas desde un ángulo similar: se superponen en un recuadro 4:3.
2. Editá contenido.js y agregá un objeto dentro de trabajos. Reemplazá todos los campos del ejemplo con información del caso real:

```js
{ equipo: "Tipo de equipo y modelo", antes: "assets/trabajos/caso-01-antes.jpg",
  despues: "assets/trabajos/caso-01-despues.jpg", problema: "Falla informada",
  trabajo: "Intervención realizada", resultado: "Resultado comprobado" }
```

3. Separá las fichas con comas. Al publicar la primera ficha completa, el comparador reemplaza automáticamente al aviso de próximos trabajos.

## Cargar opiniones

En la lista opiniones del mismo archivo, agregá un objeto por referencia autorizada:

```js
{ nombre: "Nombre autorizado", comentario: "Texto real aprobado",
  servicio: "Servicio realizado", origen: "WhatsApp" }
```

Nombre y comentario son necesarios. Servicio y origen son opcionales. La primera referencia reemplaza el aviso inicial. No hace falta editar la página para las cargas siguientes.

## GitHub Pages

Publicá los archivos de esta carpeta en la raíz de la rama main. En Settings → Pages, elegí Deploy from a branch → main → / (root). Al guardar, GitHub muestra la dirección del sitio. Las rutas relativas permiten servirlo bajo el nombre del repositorio.
