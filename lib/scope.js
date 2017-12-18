/* Fonction qui créer d'une IP 192.168.512.265 une IP "valide", 192.170.1.10 */
function Scope( ipfalse ) {
    var index, number_add;
    // Ici on se place au dernier index de notre tableau IP
    index = 3;
    number_add = 0;
    console.log(ipfalse);
    // Tant qu'on a pas parcourut tout le tableau
    while (index >= 0) {
        // Si le tableau au rang index est trop grand
        if (ipfalse[index] > 255) {
            // Tant que le rang du tableau n'est pas valide
            console.log("On commence le traitement a l'index "+index);
            while (ipfalse[index] > 255) {
                // On lui enleve 256 et on stock ce qu'on va ajouter dans number_add
                ipfalse[index] -= 256;
                number_add++;
                console.log("On a enlever 255, on ajoute "+number_add+" A "+ipfalse[index - 1]);
            }
            // On ajoute au rang N-1 number add
            ipfalse[index - 1] += number_add;
        }
        // On change d'index
        index--;
        // On réinitialise notre compteur
        number_add = 0;
        console.log("On passe au prochain index "+index);
    }
    console.log(ipfalse);
    return ipfalse;
}