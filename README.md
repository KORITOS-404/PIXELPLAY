# Tienda de videojuegos PixelPlay
## Introduccion 
PixelPlay es una tienda ubicada en una galería en Wilson que buscó mejorar su gestión de bases de datos y expandirse a nivel de todo Lima por ello via este repositorio se explicará el apartado del **frontend** que hemos empleado en el proyecto
Cosas que faltan :
* [x] Pasarela de pagos (front)
* [x] Pasarela de pagos(back)(que funcione al pagar y envie un email al realizar la compra)
* [X] Carrito(front)
* [X] Carrito(backend)
* [x] Mejorar categorías , aplicar una barra de filtros para que el usuario pueda ver los juegos mejor , un plus seria ponerle su logo a cada banner 
* [X] Productos (front)
* [X] Productos (back)
* [x] Plan de pruebas(Documentación)
* [X] Plan de seguridad (Documentacion)
* [x] Mantenimiento(Documentacion)
* [X] Manual de usuario(Documentacion)
* [X] Manual Técnico(Documentacion)
* [X] Monitoreo(Documentacion) : Como se han establecido las tareas a lo largo de la semana
* [X] Manual de Mantenimiento
* [X] Acta de Cierre 
Para el desarrollo de la página vamos a hacer el desarrollo de 7 vistas :

* [V] Inicio
* [V]Login
* [V] Nosotros
* [V]Register
* [X]Dirección de envio
* [X]Secciones
* [X]Carrito

## Desarrollo 
En este apartado se explicará el desarrollo del  frontend de la tienda de videojuegos  **Pixel Play** donde se ha trabajado con Angular y el puerto de uso  4200.

### Inicio :heavy_check_mark:
En esta vista se muestra un carrusel con eventos y notificaciones de nuevos  **lanzamientos** ,promociones de tiempo limitado y  los juegos mas vendidos.

### Register :page_with_curl:
En esta vista se le permitirá al cliente ingresar sus datos para poder ser ingresado en el sistema , esto es indispensable ya que con ello se podrán tomar sus datos para el pedido.
### Login :walking_man:
En esta vista el usuario si ya esta registrado podrá ingresar con el usuario que se registro.
### Nosotros :green_heart:
Aqui la empresa habla sobre si misma , los valores que tiene y lo que quiere llegar a ser de aqui a unos años.
### Dirección de Envío :motor_scooter:
Esta vista solo estará habilitada si el usuario ha sido registrado , como su nombre indica con estos datos se va a poder hacer entrega del pedido.
### Secciones :open_file_folder:
Aqui el usuario podrá seleccionar los productos que posteriormente quiera comprar
### Carrito  :shopping_cart:
Esta vista se conecta con los productos selecionados en **Secciones** , se podra ver el monto total , descuento si hubiera y el costo de envio .
