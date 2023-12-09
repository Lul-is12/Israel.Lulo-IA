# Tema: Introducción a la Inteligencia Artificial: Intro-spección
### Problema de los 8 alfiles
###### Autor: Israel Lulo Pille 19121045

##### Introducción
En la programación y en la ingeniería en general, se le podría considerar a la resolución de problemas la parte más importante de estás, ya que prácticamente todo lo que debemos hacer como ingenieros/programadores es dar solución a los problemas que se presentan, en base a conocimientos anteriores o en ocasiones incluso a *"prueba y error"*, tratamos de conseguir el resultado que satisfaga a las necesidades de un problema o situación. 

Cabe recalcar que todos tenemos maneras diferentes de pensar y de solucionar los problemas, lo que da pie a que un mismo problema tenga muchas soluciones, algunas más practicas o complejas, más corta o extensas, pero al final todas cumplen con lo requerido.

##### Presentación del problema
Entrando a lo que este problema requieres, se nos plantean las siguientes reglas:
- Existe un tablero de 5x4.
- En los extremos de arriba y abajo se encuentran 4 piezas (alfiles) blancas y 4 negras.
- Todos los alfiles al final deben estar posicionados al lado contrario del que empezaron.
- Los alfiles deben moverse de tal forma que no se ataquen en ningún momento.
- Los movimientos se hacen de manera alternada, empezando por las piezas blancas.

Con esta información nos quedaría acomodado de la siguiente manera.
|*|c1|c2|c3|c4|
|--|--|--|--|--|
|**f1**| N | N | N | N|
|**f2**|--|--|--|--|
|**f3**|--|--|--|--|
|**f4**|--|--|--|--|
|**f5**| B | B | B | B |

Esos son los fundamentos básicos que se nos presentan al comenzar con esté programa, para esto es preciso recordar que, en el ajedrez, la manera en que se mueven los alfiles es de forma diagonal.
##### Solución 
Una vez que ya tenemos las bases de lo que requieren el problema, podemos empezar a solucionarlo.
Para comenzar y hacer esto de forma más práctica, a cada celda del tablero se le asignara un valor numérico de 1 a 20, ya que manejarlo por coordenadas (que también es posible) se puede hacer algo más confuso. Dado este cambio el tablero se vería de la siguiente manera.
|*|c1|c2|c3|c4|
|--|--|--|--|--|
|**f1**| 1| 2 | 3 | 4|
|**f2**|5|6|7|8|
|**f3**|9|10|11|12|
|**f4**|13|14|15|16|
|**f5**|17| 18 | 19 | 20 |

Es importante recordar la posición original de las piezas donde las piezas negras ocupan los lugares del 1 al 4, mientras que las blancas están de las celda 17 a la 20.
Hay varios movimientos que se pueden realizar por parte de las piezas blancas que son las que inician, así que podríamos tomar cualquier pieza, pero en este caso haremos un movimiento de la casilla 18 a la 15, mientras que para las piezas negras se moverá la pieza de la casilla 3 a la casilla 6.
Después de que hicimos estos movimientos podemos observar que ningún alfil se ataca o se ve amenazado por otro, además de que liberamos una celda, la cual utilizaremos moviendo la pieza blanca 17 a 8, y la pieza negra 4 a 13.
Para este punto prácticamente hemos logrado intercambiar una pieza de cada lado, sin embargo aun no las pondremos en la zona final, ya que de hacerlo estarían *"atacándose"* con las piezas a su diagonales, en ese caso los movimientos que haremos ahora es el de Blanca (19,15) y Negra (2,7). A partir de aquí utilizare esa forma de expresar los movimientos, siendo que el primer dato será la casilla en la que se encuentra y el segundo es el numero de la casilla al cual se mueve.

Siguiendo la lógica que utilice hasta este punto, y resumiendo para que sea menos tardo el proceso, al final se obtiene la siguiente tabla de movimientos:

|No.|Blanca|Negra|
|--|--|--|
|1|( 18 , 15 )|( 3 , 6 )|
|2|( 17 , 8 )|( 4 , 13 )|
|3|( 19 , 14 )|( 2 , 7 )|
|4|( 15 , 5 )|( 6 , 16 )|
|5|( 8 , 3 )|( 13 , 18 )|
|6|( 14 , 9 )|( 7 , 12 )|
|7|( 5 , 10 )|( 16 , 11 )|
|8|( 9 , 19 )|( 12 , 2 )|
|9|( 10 , 4 )|( 11 , 7 )|
|10|( 20 , 10 )|( 1 , 11 )|
|11|( 3 , 9 )|( 18 , 12 )|
|12|( 10 , 13 )|( 11 , 8 )|
|13|( 19 , 16 )|( 2 , 5 )|
|14|( 16 , 1 )|( 5 , 20 )|
|15|( 9 , 6 )|( 12 , 15 )|
|16|( 13 , 7 )|( 8 , 14 )|
|17|( 6 , 3 )|( 15 , 18 )|
|18|( 7 , 2 )|( 14 , 19 )|

Dándonos como resultado que para conseguir que las piezas negras y blancas que se plantearon en un inicio cambien de posiciones sin que se ataquen mutuamente son necesarios **18 movimientos**. 
#### Conclusión
Esté fue problema en el cual fue necesario tener totalmente presentes las reglas que se manejan en el ajedrez, ya que el hecho de que un alfil pueda moverse diagonalmente por todo el tablero, se convierte automáticamente en 4 caminos que revisar que no esté en ataque con esto, más aun tomando en cuenta que el espacio de juego es bastante reducido.
Normalmente tendemos a pensar que una acción no le afecta a otra y una vez que avanzamos nos damos cuenta que en realidad si, esto fue uno de los retos que se presentó durante la ejecución de este problema, ya que al momento de querer realizar un movimiento determinado, que en el momento parecía no afectar, una vez se iba avanzado salía a relucir que las opciones o movimientos ya no se podían realizar debido a que la pieza que se movió anteriormente causaba conflicto, por lo que fue de vital importancia para poder encontrar la solución tener bastante cuidado con ese tipo de acciones o movimientos que podían llegar a provocar problemas después.

