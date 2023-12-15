# Introducción a la Inteligencia Artificial: El papel de la heurística

###### Autor: Israel Lulo Pille 19121045


#### ¿Que es la heurística?
El término heurística está relacionado con la tarea de resolver problemas inteligentemente utilizando la información disponible, el término proviene de la palabra griega *heuriskein* que significa encontrar o descubrir, de la cual se deriva eureka, la famosa exclamación de Arquímedes al descubrir su principio.
En el ámbito de la Inteligencia artificial se usa el término heurístico para describir una clase de algoritmos que aplicando el conocimiento propio del problema y técnicas realizables se acercan a la solución de problemas en un tiempo razonable.
#### ¿Cual es su papel en la resolución del problema?

La heurística desempeña un papel vital al resolver problemas, ya que facilita la exploración eficiente de soluciones en situaciones donde los espacios son extensos o no se comprenden completamente. Al utilizar heurísticas, podemos tomar decisiones informadas sobre las rutas o soluciones a seguir, lo que ayuda a minimizar el tiempo y los recursos necesarios para alcanzar una solución satisfactoria. En esencia, las heurísticas actúan como guías inteligentes que nos permiten navegar de manera más eficaz a través de la complejidad de los problemas, facilitando así el proceso de toma de decisiones y la obtención de resultados positivos.

#### Código solución

    def solucion_laberinto(mapa, inicio, fin):
        def buscar_camino(x, y):
            if x < 0 or x >= len(mapa) or y < 0 or y >= len(mapa[0]) or mapa[x][y] == 1 or     visitado[x][y]:
                return False
    
            visitado[x][y] = True
            camino.append((x, y))  # Agregar la coordenada actual al camino
    
            if (x, y) == fin:
                return True
    
            for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                if buscar_camino(x + dx, y + dy):
                    return True

            camino.pop()
            return False
    
        visitado = [[False] * len(mapa[0]) for _ in range(len(mapa))]
        camino = []  # Lista para almacenar el camino
    
        if buscar_camino(*inicio):
            print("Camino encontrado:")
            for fila in mapa:
                print(fila)
    
            print("\nCoordenadas del camino:")
            print(camino)
        else:
            print("No se encontró un camino.")


Este código en Python resuelve un laberinto representado por una matriz llamada mapa. 
Utiliza la técnica de búsqueda recursiva para encontrar un camino desde la posición de inicio hasta la posición de destino en el laberinto. 


    mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
    
Se crea la matriz que fungirá como mapa para este ejercicio, tomando los '1' como barrera.

    inicio = (1, 0)
    fin = (7, 0)
    
Se declaran cuales son las coordenadas de inicion y fin que tenemos.
    
    resolver_laberinto(mapa, inicio, fin)
    
Se manda llamar la función principal **solución_laberinto** y se le agregar los parametros del  *mapa*, las coordenadas de *inicio* y *fin* que se declararon anteriormente. 

Después de que se llama la función principal y se le mandan los parametros, la función interna **buscar_camino** realiza la búsqueda recursiva, evitando obstáculos y marcando las celdas visitadas. Si encuentra un camino, imprime el laberinto con el camino marcado y las coordenadas del camino; de lo contrario, indica que no se encontró un camino válido. 
Dandonos como resultado:

    Coordenadas del camino:
    [(1, 0), (1, 1), (1, 2), (1, 3), (2, 3), (3, 3), (3, 2), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (7, 0)]

    