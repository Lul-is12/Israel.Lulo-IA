
package problemajosephu;

/**
 *
 * @author Isra Lulo
 */
public class ProblemaJosephu {

    public static void main(String[] args) {
        int n = 41; // Número total de participantes
        int m = 2; // Decimos cada cuantos debe "morir" uno de ellos

        int sobreviviente = josephus(n, m);

        System.out.println("El sobreviviente será el número: " + sobreviviente);
    }
    
    static int josephus(int n, int m) {
        int resultado = 0;

        for (int i = 2; i <= n; i++) {
            resultado = (resultado + m) % i;
        }

        return resultado + 1;
    }
    
}
