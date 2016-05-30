# sensors-exercise
Ejercicio de lectura de sensores meteorológicos

###### Instalación:

Se necesita `node v4.4.5` para poder cargar los módulos de servidor escritos en ECMASCRIPT 6, `npm` para cargar los módulos de servidor externos y `bower` para los módulos de cliente externos. Como base de datos he usado `mongo`, y así completo eso que llaman _"MEAN stack"_
```
$ node -v
v4.4.5

$ npm -v
2.15.5

$ bower -v
1.3.1

$ mongo --version
MongoDB shell version: 3.0.6
```

Para instalar node: https://nodejs.org/en/ _(en caso de que no queráis sobreescribir vuestra versión de node actual, yo suelo usar `nvm` para poder alternar entre versiones https://github.com/creationix/nvm )_

Para instalar npm: https://docs.npmjs.com/getting-started/installing-node

Para instalar bower: http://bower.io/#install-bower

Para instalar mongo: https://www.mongodb.com/download-center#community

###### Dependencias

Ir a la carpeta raíz del proyecto y ejecutar
`$ npm install`

###### Construcción
Hay que levantar la base de datos(mongo), el servidor y el cliente.

1. Ejecutar `$ mongod` desde cualquier terminal
1. Ejecutar `$ mongo` desde cualquier terminal para entrar en el driver de mongo y, una vez dentro, ejecutar `use sensors` para incializar la base de deatos que queremos usar
2. Ejecutar `$ npm run dev` desde la raíz del proyecto
3. Ejecutar `$ npm run build:front` desde la raíz del proyecto
5. Ya debería poderse entrar a http://localhost:3000 para empezar a subir ficheros

###### API
Los puntos de API son:
* http://localhost:3000/api/upload para subir ficheros por POST
* http://localhost:3000/api/dashboard/names para recoger la lista de nombres de los ficheros
* http://localhost:3000/api/dashboard/:name/:from/:to para recoger los datosa mostrar por la gráfica

> NOTA: tanto el front como el back se sirven desde el mismo puerto para prevenir problemas de Cross Origin con Angular en el desarrollo local http://stackoverflow.com/questions/21102690/angularjs-not-detecting-access-control-allow-origin-header
