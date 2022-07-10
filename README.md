# BackendWallaclone

To start the applicaion use:

```sh
   install dependencies:
   npm install
```
```sh
   run the app PROD:
   npm start
```
```sh
   run the app DEV:
   DEBUG=wallaclone:* npm start
```
``` 
Filtros:
   http://localhost:3000/adverts/?name=wii&price29.99
```
``` 
Paginación:
   http://localhost:3000/adverts/?skip=5&limit=10
```
``` 
Campos que quieres escoger:
   http://localhost:3000/adverts/?select=price 25
```

``` 
Ordenación:
   http://localhost:3000/adverts/?sort=price
```
``` 
Buscar un anuncio por ID:
   /adverts/:id
```
``` 
Crear un anuncio por ID:
   POST /adverts
```
``` 
Eliminar un anuncio por ID:
   /adverts/:id
```
