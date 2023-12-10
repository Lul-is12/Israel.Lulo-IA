# Planteamiento: Problema de Josephus
###### Autor: Israel Lulo Pille 19121045

### Datos/Reglas de inicio
- Se no dice que hay un total de 40 soldados más Josephus (dando como total 41 individuos).
- El individuo número 1 debe matar a quien se encuentra a su izquierda y pasar el cuchillo al siguiente. 
- - El 1 mata a 2, el 3 al 4, 5 al 6, etc.
- Una vez que se da toda la vuelta se comienza de nuevo, el portador del cuchillo debe asesinar al de su izquierda: 41 a 1, 3 a 5, etc.
- Sobrevive el último que reciba el cuchillo.


### Solución
Tomando en cuenta los datos anteriores, se debe determinar cuál es la posición en la cual Josephus pueda quedar con vida.

Primero, para que el código funcione debemos de tomar 2 datos de las reglas que son el número de individuos (en este caso 41) y el la cada cuantos debe ser eliminado uno (cada 2).

    int n = 41; // Número total de participantes
    int m = 2; // Decimos cada cuantos debe "morir" uno de ellos

Ya con estos 2 datos y ayudándonos de la recursividad se programa la siguiente función:
    
    static int josephus(int n, int m) {
        int resultado = 0;

        for (int i = 2; i <= n; i++) {
            resultado = (resultado + m) % i;
        }

        return resultado + 1;
    }
    
Dicha función recibe los datos de entrada (41,2) y realiza la simulación de eliminación que le hemos dicho.
- Se declara i = 2, que representa número actual de participantes (empiezan 2), para después ir aumentando el valor de i hasta conseguir nuestro total de participantes (41).

Con esos en mente, esta función recursiva nos hace una simulación de lo que sería eliminar a la "m-ésima" persona, o dicho de otra manera, a la 2da persona de donde se encuentra actualmente, hasta completar el total de 41 individuos.

Al final solamente nos queda ajustar el valor del resultado para saber cuál es el número correspondiente al sobreviviente, que para este caso es **el individuo 19** y es en esta posición en la que Josephus debe sentarse para lograr sobrevivir.

### Consideraciones

El código planteado se puede ajustar tanto como para el número de participantes, como para el número de cada cuantos debe morir alguien. Pero para este caso en particular bien se puede quitar la variable *"m"* y colocar el número 2 directamente en el ciclo *for*.
