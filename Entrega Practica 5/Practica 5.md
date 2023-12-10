# Tema: Introducción a la Inteligencia Artificial: Intro-spección
### Problema: Búsqueda de los elementos rojos.
###### Autor: Israel Lulo Pille 19121045

##### Introducción
En el campo de la ingeniería y para ser más exactos en el de la inteligencia artificial, es de vital importancia saber cómo identificar cosas dentro de nuestro entorno, ya sea de alguna imagen o captura de video, para con esa información lograr determinar ciertas cosas. Esto puede tener un sin fin de utilidades, ya sea para identificar si una fruta ya se encuentra madura o no, poder determinar algún animal o persona, etc.

##### Presentación del problema
En este problema se nos presenta la problemática de que para una imagen que contiene diversos objectos de múltiples, debemos de encontrar y contabilizar únicamente aquellos que son de color rojo.

Esto a simple vista es un trabajo bastante complejo, ya que dentro de la imagen existen un sin número de elementos de los cuales, solo algunos realmente son rojos y algunos otros únicamente tiene de alguna parte. Para lo cual será importante tomar esto a consideración al momento de realizar el planteamiento de la solución y reducir lo más posible que la respuesta se vea afectada por falsos verdaderos.
##### Solución 
Sabemos que, de manera digital las imágenes se manejan a través de pixeles, a mayor o menor cantidad de pixeles, mejor o peor será la resolución que tendrá una imagen al momento de ser visualizada en una pantalla.
Aprovechándonos de esta propiedad, se usará para determinar la cantidad de pixeles rojos que se encuentran dentro de la imagen de muestra, entonces para esto es preciso ayudarnos de las librería de Python OpenCv para la manipulación de la imagen.

    import cv2
    import numpy as np
    
Una vez que ya contamos con la librería cargamos la imagen y empezamos con el trabajo.

    imagen = cv2.imread('f1.jpg')
    
Es importante recordar que para que OpenCV pueda ayudarnos con la manipulación de la imagen debe ser convertida a RGB, ya que por defecto las carga en BGR.

    imagen_rgb = cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB)

Después de que se obtiene la imagen rgb es necesario hacer una conversión más, pero ahora a HSV, esto debido a que HSV es un espacio de color que separa la información de color y brillo de una imagen.

    imagen_hsv = = cv.cvtColor(img2, cv.COLOR_RGB2HSV)

Lo siguiente a realizar es definir cuáles serán los umbrales, que son rangos valores en el espacio de color HSV que corresponden al color **rojo**. 
Para lograr localizar los elementos que sean rojos, sin importar si son de un rojo claro o uno más oscuro, se trata de tener un margen dentro del cual varias tonalidades diferentes de rojo puedan entrar.
    
    umbralBajoR1 = (0, 80, 80)
    umbralAltoR1 = (10, 255, 255)
    umbralBajoR2 = (170, 80, 80)
    umbralAltoR2 = (180, 255, 255)

Una vez definidos nuestros umbrales en alto y bajo, se realizan 2 mascaras con la ayuda de la propiedad *cv.inRange* para crear dos máscaras binarias que nos ayuden a identificar los píxeles que están dentro de los umbrales definidos anteriormente.

    mascaraRojo1 = cv.inRange(imagen_hsv, umbralBajoR1, umbralAltoR1)
    mascaraRojo2 = cv.inRange(imagen_hsv, umbralBajoR2, umbralAltoR2)

Y estás 2 mascaras deben de fusionarse en una sola máscara final, que es la que se encargara de identifica los píxeles que son rojos en ambos rangos.

    mascaraRojo = mascaraRojo1 + mascaraRojo2

Después de los pasos anteriores, con la máscara final, que es nuestro filtro para buscar el color rojo, se la aplicamos a la imagen original para empezar con la búsqueda:

    resultadoRojo = cv.bitwise_and(imagen, imagen, mask=mascaraRojo)
    
Por último, solo debemos mostrar el resultado, podremos notar como es que dentro de la imagen solamente nos quedaron los elementos de color rojo.

    cv.imshow('resultadoRojo', resultadoRojo)

Y a este resultado que obtuvimos ya se le podría realizar el mismo trato que a la matriz de la practica anterior, ya que como se comentó en un inicio, las imágenes son pixeles, más precisamente una matriz de pixeles. En este caso esa matriz puede ser introducida al contador de islas y realizar exactamente el mismo proceso, solamente que se deben tomar en cuenta ciertas consideraciones, ya que el código del contador puede llegar a interpretar que un solo píxel ya es un objeto, cosa que nos provocaría una cuenta errónea al finalizar con el recorrido. Para solucionar esto, se debería de colocar una condición de una cantidad mínima de píxeles para que las agrupaciones de píxeles (las islas) tengan cierta cantidad de pixeles para que se le pueda considerar realmente como un objeto.
#### Conclusión
Este ejercicio sirve para comprender como es que las inteligencias artificiales logran hacer una distinción de imágenes, además de ser un código que se puede modificar fácilmente para lograr encontrar más variedad de colores, no únicamente el color rojo.
Y esto solo es algo básico, ya que las aplicaciones reales de este tipo de tecnologías una mil o incluso millones, de veces más allá de simplemente buscar colores. De aquí su importancia dentro del mundo de la computación, pero sobre todo en el campo de la Inteligencia Artificial, que cada vez gana más peso, y se vuelve más y más habitual en nuestras vidas.
