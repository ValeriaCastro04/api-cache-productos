<h1 align="center">EJERCICIO 1:</h1>
<p align="center">La línea en product.service.ts:
//await this.cacheManager.set(cacheKey, products, 30); //Esta era la razon por la que la cache no funcionaba correctamente
<br>
El problema era que cached siempre era undefined, ya que pedia un number como parametro y en redis no es valido porque espera un objeto con opciones, por lo que la forma correcta era {ttl:30}
<br>
Por lo tanto, se cambió esa línea por una nueva: 
<br> 
await this.cacheManager.set(cacheKey, products, { ttl: 30 });
<br> Y cambiamos el tipo de cacheManager a any para evitar errores de tipado por la incompatibilidad entre Redis y el tipo de Cache. 
</p>
<br>
<br>

<h1 align="center">EJERCICIO 2:</h1>

<p align="center">
El problema era que el cache nunca guardaba ni reutilizaba los datos, pero se resolvio configurando Redis y corregiendo la forma de set(). 
Se hizo la prueba de ping pong y sí funcionaba, pero al final el error del Ejercicio 1 era lo que ocasionaba que la cache no se guardaba correctamente, por eso con cada GET que se ejecutaba se iba siempre a consultar a la base de datos, pero al corregir el formato del parametro de ya no a number sino a {ttl: 30}, la caché ya se guardaba correctamente dando como respuesta en la terminal:
<br>
Nest application successfully started +5ms
ver cache undefined
💾 Consultando BD y guardando en caché
ver cache [
  Product { id: 1, name: 'prueba1', price: '10' },
  Product { id: 2, name: 'prueba2', price: '25' }
]
📦 Usando datos del caché

y para el tercer punto:

ver cache undefined
💾 Consultando BD y guardando en caché
ver cache [
  Product { id: 1, name: 'prueba1', price: '10' },
  Product { id: 2, name: 'prueba2', price: '25' },
  Product { id: 3, name: 'prueba3', price: '40' }
]
📦 Usando datos del caché

</p>

<br>
<br>
<h1 align="center">EJERCICIO 3:</h1>

<p align="center">
El problema era que el cache no se actualizaba despues del POST, entonces se arreglaron los problemas pasados y se verifico que la linea estaba en el metodo create: await this.cacheManager.del('products_all');
asi se aseguro que se consultara la BD y se cachearan los nuevos datos. 
</p>
