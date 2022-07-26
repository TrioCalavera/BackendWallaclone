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
Listar los tags:
   GET:
   /api/v1/adverts/tags
```
``` 
Filtros:
   Por precio:
   api/v1/adverts/?name=wii&price29.99
```
``` 
Paginación:
   api/v1/adverts/?skip=5&limit=10
```
``` 
Campos que quieres escoger:
   api/v1/adverts/?select=price 25
```

``` 
Ordenación:
   api/v1/adverts/?sort=price
```
``` 
Buscar un anuncio por ID:
   api/v1/adverts/:id
```
``` 
Crear un anuncio por :
   POST:
    api/v1/adverts
```
``` 
Eliminar un anuncio por ID:
   api/v1/adverts/:id
```
``` 
Buscar un usuario por ID:
   GET api/v1/users
```
``` 
Crear un usuario:
   POST:
   /api/v1/users
```
``` 
Eliminar un usuario:
   DEL:
   /api/v1/users
```

``` 
Logarte con un usuario:
   POST:
   /api/v1/authentication
```
``` 
Mostrar tu usuario:
   GET:
   /api/v1/users/me
```
