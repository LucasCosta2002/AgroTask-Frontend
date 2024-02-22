
Innesesario crear tantas vistas, puedo usar modales para mostrar la informacion de todo

traer los nombres del cliente y del usuario, vienen como id pero no sirve

El modelo del trabajo toma un cliente, ese cliente debe estar previamente creado por cualquier usuario. Cuando creas un trabajo le pasas el id del cliente, este va a venir en una consulta y sera impreso en un select. Entonces el trabajo va a tener usuario/maquinista y un cliente asociado de forma separada sin bidireccionalidad.


agregar algunos toast

11/09: reemplazar skeleton por una plantita que gire. Intentar agregar paginador. Mover formulario trabjo a un componente para reutilizar, ajustar, componetizar codigo repetido, por ejemplo botones
